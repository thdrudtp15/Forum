import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

async function signUp(data: { userId: string; userPw: string }) {
    const db = (await connectDB).db('forum');
    const validation = await db.collection('user').findOne({ userId: data.userId });
    if (validation) {
        return 'invalid';
    }
    const signUp = await db.collection('user').insertOne(data);
    return 'Sign up complete';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let { userId, userPw } = req.body;
        if (userId === '' || userPw === '') {
            return res.status(500).json('아이디 또는 비밀번호를 작성해주세요');
        }
        try {
            let result: string = await signUp(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json('서버에서 에러가 발생했어요');
        }
    }
}
