import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

async function writePost(data: { title: string; content: string }) {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').insertOne(data);
    return result;
}

export default async function Write(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let { title, content } = req.body;
        if (title === '' || content === '') {
            return res.status(500).json('아무것도 작성을 안함.');
        }
        try {
            await writePost(req.body);
            res.redirect(302, '/list');
        } catch (e) {
            return res.status(500).json('디비 연결 오류 발생');
        }
    }
}
