import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

type user = { user: { name: string; email: string; role: string } } | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            let user: user = await getServerSession(req, res, authOptions);
            let id = JSON.parse(req.body);
            const db = (await connectDB).db('forum');
            const result = await db.collection('comment').findOne({ _id: new ObjectId(id) });

            if (result?.author === user?.user.email) {
                let deleteComment = await db.collection('comment').deleteOne({ _id: new ObjectId(id) });
                if (deleteComment.deletedCount === 1) {
                    return res.status(200).json('삭제성공');
                }
            } else {
                return res.status(403).json('본인의 댓글이 아닙니다.');
            }
        } catch (e) {
            return res.status(500).json('서버에러');
        }
    }
}
