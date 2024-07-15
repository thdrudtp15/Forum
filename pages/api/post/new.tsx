import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function writePost(data: { title: string; content: string }) {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').insertOne(data);
    return result;
}

export default async function Write(req: NextApiRequest, res: NextApiResponse) {
    // 1. 로그인 정보 가져오기
    let session = await getServerSession(req, res, authOptions);
    console.log(session?.user?.email);
    // 2. 로그인을 했다면 body에 데이터 추가
    if (session) {
        req.body.author = session?.user?.email;
    } else {
        return res.status(500).json('로그인 해주세요');
    }
    // 3. 글 작성
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
