import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import bcrypt from 'bcrypt';

async function signUp(data: { name: string; email: string; password: string; role: string }) {
    const db = (await connectDB).db('forum');
    const validation = await db.collection('user').findOne({ email: data.email });
    if (validation) {
        return 'invalid';
    }
    const signUp = await db.collection('user').insertOne(data);
    return 'Sign up complete';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let { name, email, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10); // bcrypt로 암호화

        if (name === '관리자' && email === 'admin') {
            req.body.role = 'admin';
        } else {
            req.body.role = 'user';
        }

        if (name === '' || email === '' || password === '') {
            return res.status(500).json('아이디 또는 비밀번호를 작성해주세요');
        }
        try {
            let result: string = await signUp(req.body);
            if (result === 'invalid') {
                return res.status(500).json(result);
            } else {
                return res.redirect(302, '/list').json(result);
            }
        } catch (e) {
            return res.status(500).json('서버에서 에러가 발생했어요');
        }
    }
}
