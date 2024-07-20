import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

type session = {
    user: { name: string; email: string; role: string };
    expires: string;
} | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let session: session = await getServerSession(req, res, authOptions);
    let id = req.query.id;
    let myLike = req.query.my_like;

    if (!session) {
        return res.status(500).json('로그인 해주세요');
    }
    if (req.method === 'GET' && session) {
        try {
            let data = {
                author: session?.user?.email,
                parent: new ObjectId(id as string),
            };
            const db = (await connectDB).db('forum');
            const result = db.collection('like').insertOne(data);
            return res.status(200).json('좋아요');
        } catch (e) {
            return res.status(500).json('서버에러');
        }
    }
    if (req.method === 'POST' && session) {
        try {
            const db = (await connectDB).db('forum');
            const deleteLike = db
                .collection('like')
                .deleteOne({ parent: new ObjectId(id as string), author: session?.user.email });
            return res.status(200).json('좋아요 해지');
        } catch (e) {
            return res.status(500).json('서버에러');
        }
    }
}
