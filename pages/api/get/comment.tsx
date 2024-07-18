import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let parent = req.query.id;
    console.log(parent);
    if (req.method === 'GET') {
        try {
            const db = (await connectDB).db('forum');
            const result = await db
                .collection('comment')
                .find({ parent: new ObjectId(parent?.toString()) })
                .toArray();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json('조회 실패');
        }
    }
}
