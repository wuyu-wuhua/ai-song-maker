// api/generate-song.js
const axios = require('axios');

// --- 更新为 'facebook/musicgen-small' ---
const MODEL_ID = 'facebook/musicgen-small';
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

module.exports = async (req, res) => {
    // 跨域预检请求处理 (Vercel 通常会自动处理 OPTIONS，但加上更保险)
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源 (生产环境应更严格)
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }

    // 允许来自所有来源的实际请求 (生产环境应限制为你前端的域名)
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const songData = req.body;

        const hfToken = process.env.AI_MUSIC_API_KEY; // 从 Vercel 环境变量获取
        if (!hfToken) {
            console.error("Hugging Face API Token not found in environment variables.");
            return res.status(500).json({ message: "Server configuration error: API Token missing." });
        }

        const headers = {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json',
        };

        // --- 使用歌词或标题作为输入 prompt ---
        // MusicGen 通常只需要文本输入
        const inputs = songData.lyrics || songData.title || "Generate a short piece of music"; // 提供默认值
        if (!inputs || inputs.trim() === "") {
             return res.status(400).json({ message: "Input text (lyrics or title) cannot be empty." });
        }

        console.log(`Sending request to Hugging Face API (${MODEL_ID}) with inputs: "${inputs}"`);

        const response = await axios.post(API_URL, { inputs: inputs }, {
            headers: headers,
            responseType: 'arraybuffer', // 接收二进制音频数据
             // 设置超时 (例如 30 秒，Vercel 免费套餐限制可能更短)
             timeout: 30000
        });

        const contentType = response.headers['content-type'];
        console.log("Received response from Hugging Face API. Content-Type:", contentType);

        if (contentType && contentType.startsWith('audio/')) {
            // 将二进制音频数据转为 Base64 Data URL
            const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');
            const audioDataUrl = `data:${contentType};base64,${audioBase64}`;

            // 返回 Data URL 给前端
            res.status(200).json({
                audioData: audioDataUrl, // --- 返回 Base64 Data URL ---
                contentType: contentType
            });

        } else {
             let errorMessage = "Received unexpected response type from AI service.";
             try {
                 const errorJson = JSON.parse(Buffer.from(response.data).toString('utf-8'));
                 errorMessage = errorJson.error || errorMessage;
             } catch (parseError) {}
            console.error("Unexpected response type from Hugging Face API:", contentType, Buffer.from(response.data).toString('utf-8'));
            throw new Error(errorMessage);
        }

    } catch (error) {
        console.error('Error in Hugging Face function:', error); // 打印完整错误对象

        let detailedMessage = "Failed to generate song via Hugging Face.";
        let statusCode = 500;

        if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
            detailedMessage = `The request to the AI model timed out. The model might be busy or the request is too complex. Please try again later or with a shorter input. Timeout: ${error.config?.timeout}ms`;
            statusCode = 504; // Gateway Timeout
        } else if (error.response) {
             // 尝试从错误响应中解析
             try {
                 const errorDataString = Buffer.from(error.response.data).toString('utf-8');
                 console.error('Raw error response data:', errorDataString); // 打印原始错误数据
                 const errorJson = JSON.parse(errorDataString);
                 detailedMessage = errorJson.error || detailedMessage;
                 // 处理模型加载错误
                 if (errorJson.error && errorJson.error.includes("is currently loading")) {
                    detailedMessage = `Model ${MODEL_ID} is loading, please try again in a few moments. Estimated time: ${errorJson.estimated_time || 'N/A'} seconds.`;
                    statusCode = 503; // Service Unavailable
                 } else {
                     statusCode = error.response.status || 500; // 使用 API 返回的状态码
                 }
             } catch (parseError) {
                 console.error("Could not parse error response as JSON.");
                 detailedMessage = `API Error (${error.response.status}): ${Buffer.from(error.response.data).toString('utf-8') || error.message}`;
                 statusCode = error.response.status || 500;
             }
        } else {
             detailedMessage = error.message || detailedMessage;
        }
        console.error('Final error message:', detailedMessage);
        res.status(statusCode).json({ message: detailedMessage });
    }
};