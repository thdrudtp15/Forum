import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';

type session = {
    user: { name: string; email: string; role: string };
    expires: string;
} | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let session: session = await getServerSession(req, res, authOptions);

    if (req.method === 'POST' && session) {
        let data = JSON.parse(req.body);
        data.author = session?.user?.email;
        data.parent = new ObjectId(data.parent);
        try {
            const db = (await connectDB).db('forum');
            const result = await db.collection('comment').insertOne(data);
            if (result) {
                return res.status(200).json('댓글 작성 성공');
            }
        } catch (e) {
            return res.status(500).json('댓글 작성 실패');
        }
    }
}
