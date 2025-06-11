import express from 'express';
import { kv } from '@vercel/kv';
import { put as putBlob } from '@vercel/blob'; // Rename put to avoid conflict if needed elsewhere
import axios from 'axios';
import crypto from 'crypto'; // If needed for Blob filename

// --- 配置 ---
const PORT = process.env.PORT || 3001; // Render 会自动设置 PORT 环境变量
const HUGGINGFACE_API_KEY = process.env.AI_MUSIC_API_KEY; // 从环境变量获取 HF Token
const HUGGINGFACE_MODEL_ID = 'facebook/musicgen-melody'; // 使用的模型
const HUGGINGFACE_API_URL = `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL_ID}`;
const TASK_KV_PREFIX = 'songtask:';
// 尝试从 Vercel 自动注入的 Blob 环境变量推断 Store ID (通常是 blob_store_xxxx 的形式)
// Vercel 文档推荐使用 process.env.BLOB_READ_WRITE_TOKEN
// const storeId = process.env.BLOB_READ_WRITE_TOKEN?.split('_')[1]?.toLowerCase();
// console.log("Attempting to infer Blob Store ID:", storeId);

const app = express();
app.use(express.json()); // 解析 JSON 请求体

// --- 辅助函数：更新 KV 任务状态 ---
async function updateTaskStatus(taskId, status, data = {}) {
    const taskKey = `${TASK_KV_PREFIX}${taskId}`;
    try {
        const taskDataString = await kv.get(taskKey);
        if (!taskDataString) {
            console.error(`[Task ${taskId}] Task data not found in KV for update.`);
            return;
        }
        const taskData = JSON.parse(taskDataString);
        const updatedData = {
            ...taskData,
            status: status,
            ...data, // 合并传入的新数据 (如 audioUrl 或 error)
            updatedAt: new Date().toISOString(),
        };
        // 使用之前的过期时间或默认 1 小时
        const ttl = await kv.ttl(taskKey);
        await kv.set(taskKey, JSON.stringify(updatedData), { ex: ttl > 0 ? ttl : 3600 });
        console.log(`[Task ${taskId}] Status updated to: ${status}`);
    } catch (error) {
        console.error(`[Task ${taskId}] Error updating KV status to ${status}:`, error);
    }
}

// --- 核心处理函数：处理单个任务 ---
async function processSongTask(taskId) {
    const taskKey = `${TASK_KV_PREFIX}${taskId}`;
    console.log(`[Task ${taskId}] Processing started.`);

    try {
        // 1. 从 KV 获取任务详情
        const taskDataString = await kv.get(taskKey);
        if (!taskDataString) {
            throw new Error('Task data not found in KV.');
        }
        const taskData = JSON.parse(taskDataString);

        if (taskData.status !== 'pending') {
            console.log(`[Task ${taskId}] Task status is not pending (${taskData.status}). Skipping.`);
            return;
        }

        // 2. 更新状态为 processing
        await updateTaskStatus(taskId, 'processing');

        // 3. 调用 Hugging Face API
        console.log(`[Task ${taskId}] Calling Hugging Face API (${HUGGINGFACE_MODEL_ID}) with input: "${taskData.input.substring(0, 100)}..."`); // Log truncated input
        if (!HUGGINGFACE_API_KEY) {
            throw new Error("Hugging Face API Key (AI_MUSIC_API_KEY) is not configured in worker environment.");
        }

        const hfResponse = await axios.post(HUGGINGFACE_API_URL,
            { inputs: taskData.input },
            {
                headers: {
                    'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer', // 接收二进制数据
                timeout: 300000 // 设置较长超时，例如 5 分钟 (300000 ms)
            }
        );

        const contentType = hfResponse.headers['content-type'];
        console.log(`[Task ${taskId}] Received response from Hugging Face. Content-Type:`, contentType);

        // 4. 检查响应并上传到 Blob
        if (contentType && contentType.startsWith('audio/')) {
            const audioBuffer = Buffer.from(hfResponse.data, 'binary');
            const fileExtension = contentType.split('/')[1] || 'wav'; // 从 content-type 获取扩展名
            // 使用随机 UUID 避免潜在的文件名冲突，同时包含 taskId 方便追踪
            const blobFilename = `generated-songs/${taskId}-${crypto.randomUUID()}.${fileExtension}`;

            console.log(`[Task ${taskId}] Uploading audio to Vercel Blob: ${blobFilename}`);

            // --- 上传到 Vercel Blob ---
            // Vercel 会自动使用 BLOB_READ_WRITE_TOKEN 环境变量进行认证
            const blobResult = await putBlob(blobFilename, audioBuffer, {
                access: 'public', // 设置为公开访问，以便前端播放
                contentType: contentType,
            });

            console.log(`[Task ${taskId}] Audio uploaded successfully. Blob URL: ${blobResult.url}`);

            // 5. 更新 KV 状态为 completed
            await updateTaskStatus(taskId, 'completed', { audioUrl: blobResult.url });

        } else {
             // Hugging Face 返回了非音频数据（可能是错误）
             let errorMessage = "Received unexpected response type from Hugging Face.";
             let statusCode = hfResponse.status;
             try {
                 const errorText = Buffer.from(hfResponse.data).toString('utf-8');
                 console.error(`[Task ${taskId}] Non-audio response body from HF:`, errorText.substring(0, 500)); // Log more of the error
                 // 尝试解析 JSON
                 try {
                     const errorJson = JSON.parse(errorText);
                     errorMessage = errorJson.error || `HF Error: ${errorText.substring(0, 200)}...`;
                     // 检查是否是模型加载错误
                     if (typeof errorMessage === 'string' && errorMessage.includes("is currently loading")) {
                        console.warn(`[Task ${taskId}] Hugging Face model is loading.`);
                        errorMessage = `Model ${HUGGINGFACE_MODEL_ID} is loading. Please try submitting the task again in a few moments.`;
                        statusCode = 503; // Reflect loading status
                     }
                 } catch (jsonParseError) {
                     // 如果不是 JSON，直接使用文本
                     errorMessage = `HF API returned status ${hfResponse.status} with non-JSON body: ${errorText.substring(0, 200)}...`;
                 }
             } catch (bufferError) {
                 // 如果连 Buffer 转换都失败
                  errorMessage = `HF API returned status ${hfResponse.status}. Could not read error body.`;
             }
             // 为原始错误创建一个 Error 对象，包含状态码
             const error = new Error(errorMessage);
             error.statusCode = statusCode; // 添加状态码信息
             throw error; // 抛出错误，由外层 catch 处理
        }

    } catch (error) {
        console.error(`[Task ${taskId}] Processing failed:`, error);
        let detailedMessage = "Worker failed to process the song.";
        let statusToReport = 'failed';

        if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
             detailedMessage = `Worker timed out waiting for Hugging Face API. Timeout: ${error.config?.timeout || 'N/A'}ms`;
             statusToReport = 'timed_out'; // 可以用更具体的状态
        } else if (error.response) { // Axios error (already parsed somewhat above)
             detailedMessage = `Hugging Face API Error (${error.response.status || 'N/A'}): ${error.message || 'Unknown HF error'}`;
        } else if (error.statusCode) { // Custom error thrown above for non-audio HF response
             detailedMessage = `Hugging Face API Error (${error.statusCode}): ${error.message}`;
             if (error.statusCode === 503) { // Model loading error
                  statusToReport = 'failed_loading'; // 更具体的状态
             }
        } else { // Other generic errors
             detailedMessage = error.message || String(error);
        }
        // 更新 KV 状态为 failed (或更具体的状态)
        await updateTaskStatus(taskId, statusToReport, { error: detailedMessage });
    }
}

// --- API Endpoint: /notify ---
// Vercel 函数会调用这个端点来通知有新任务
app.post('/notify', (req, res) => {
    const { taskId } = req.body;

    if (!taskId) {
        console.warn("Received notification without taskId.");
        return res.status(400).json({ message: 'Task ID is required.' });
    }

    console.log(`[Worker] Received notification for task: ${taskId}`);

    // 立即响应 Vercel 函数，表示已收到通知
    res.status(202).json({ message: 'Task notification received.' });

    // **异步**处理任务，不阻塞响应
    // 使用 setImmediate 确保响应发送后再开始处理，避免潜在的竞争条件
    setImmediate(() => {
        processSongTask(taskId).catch(err => {
            // 这里的 catch 只是为了防止未处理的 promise rejection 导致 Worker 崩溃
            console.error(`[Task ${taskId}] Unhandled error during async processing:`, err);
            // 可以在这里尝试最后一次更新状态为 failed，但不保证成功
            updateTaskStatus(taskId, 'failed', { error: 'Unhandled worker error during processing.' });
        });
    });
});

// --- 健康检查端点 (可选，但推荐) ---
app.get('/', (req, res) => {
    res.status(200).send('Song Worker is running.');
});

// --- 启动服务器 ---
app.listen(PORT, () => {
    console.log(`Song Worker listening on port ${PORT}`);
    // 检查必要的环境变量
    const requiredEnv = ['KV_URL', 'KV_REST_API_URL', 'KV_REST_API_TOKEN', 'KV_REST_API_READ_ONLY_TOKEN', 'BLOB_READ_WRITE_TOKEN', 'AI_MUSIC_API_KEY'];
    let missingEnv = false;
    for (const envVar of requiredEnv) {
        if (!process.env[envVar]) {
            console.warn(`Environment variable ${envVar} is missing!`);
            missingEnv = true;
        }
    }
    if (missingEnv) {
        console.error("Worker may not function correctly due to missing environment variables.");
    }
}); 