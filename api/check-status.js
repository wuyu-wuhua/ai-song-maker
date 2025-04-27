import { kv } from '@vercel/kv';

const TASK_KV_PREFIX = 'songtask:';

export default async (req, res) => {
    // 允许所有来源 (生产环境应限制为你前端的域名)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { taskId } = req.query; // 从 URL 查询参数获取 taskId

    if (!taskId || typeof taskId !== 'string') {
        return res.status(400).json({ message: 'Task ID is required.' });
    }

    const taskKey = `${TASK_KV_PREFIX}${taskId}`;

    try {
        const taskDataString = await kv.get(taskKey);

        if (!taskDataString) {
            console.log(`Task ${taskId} not found in KV.`);
            return res.status(404).json({ message: 'Task not found.' });
        }

        console.log(`Retrieved status for task ${taskId}`);
        const taskData = JSON.parse(taskDataString); // 解析存储的 JSON 字符串

        // 只返回必要的状态信息给前端
        res.status(200).json({
            status: taskData.status,
            audioUrl: taskData.audioUrl,
            error: taskData.error,
        });

    } catch (error) {
        console.error(`Error retrieving status for task ${taskId}:`, error);
        res.status(500).json({ message: 'Failed to retrieve task status.' });
    }
}; 