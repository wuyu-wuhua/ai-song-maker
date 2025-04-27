// api/generate-song.js
import { kv } from '@vercel/kv';
import crypto from 'crypto'; // 用于生成唯一 ID
import axios from 'axios'; // 用于通知 Worker

// --- 配置 ---
// 后台 Worker 的 URL，你需要替换成你部署在 Render 上的 Worker 地址
// 现在先用一个占位符，记得部署 Worker 后回来修改这里，并设置为 Vercel 环境变量！
const WORKER_URL = process.env.WORKER_NOTIFY_URL || 'YOUR_WORKER_NOTIFY_URL_PLACEHOLDER';
// 任务在 KV 中的前缀，方便管理
const TASK_KV_PREFIX = 'songtask:';

export default async (req, res) => {
    // 允许所有来源 (生产环境应限制为你前端的域名和 Worker 域名)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { lyrics, title } = req.body;
        const inputText = lyrics || title || "Default music prompt"; // 获取输入文本

        if (!inputText || typeof inputText !== 'string' || inputText.trim() === "") {
            return res.status(400).json({ message: "Input text (lyrics or title) cannot be empty." });
        }

        // 1. 生成唯一的任务 ID
        const taskId = crypto.randomUUID();
        const taskKey = `${TASK_KV_PREFIX}${taskId}`;

        // 2. 准备任务数据
        const taskData = {
            id: taskId,
            input: inputText,
            status: 'pending', // 初始状态：等待处理
            createdAt: new Date().toISOString(),
            audioUrl: null,
            error: null,
        };

        // 3. 将任务存入 Vercel KV
        // 设置一个过期时间，例如 1 小时 (3600 秒)，防止任务无限期留在 KV 中
        await kv.set(taskKey, JSON.stringify(taskData), { ex: 3600 });
        console.log(`Task ${taskId} created and stored in KV.`);

        // 4. 通知后台 Worker 有新任务 (异步，不需要等待 Worker 响应)
        if (WORKER_URL === 'YOUR_WORKER_NOTIFY_URL_PLACEHOLDER') {
             console.warn("WORKER_NOTIFY_URL is not configured. Worker will not be notified.");
             // 在这种情况下，你可能需要手动触发 Worker 或设置一个轮询 Worker
        } else {
            axios.post(WORKER_URL, { taskId: taskId })
                .then(response => console.log(`Worker notified for task ${taskId}. Status: ${response.status}`))
                .catch(err => console.error(`Error notifying worker for task ${taskId}:`, err.message || err));
        }

        // 5. 返回任务 ID 给前端
        res.status(202).json({ taskId: taskId }); // 202 Accepted 表示请求已被接受处理，但尚未完成

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: "Failed to create song generation task." });
    }
};