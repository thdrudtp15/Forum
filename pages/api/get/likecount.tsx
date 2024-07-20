import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

type session = {
    user: { name: string; email: string; role: string };
    expires: string;
} | null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let id = req.query.id;
    let session: session = await getServerSession(req, res, authOptions);

    if (req.method === 'GET') {
        try {
            let likes = null;
            const db = (await connectDB).db('forum');
            const count = await db.collection('like').countDocuments({ parent: new ObjectId(id as string) });
            if (session) {
                let likeData = await db
                    .collection('like')
                    .findOne({ parent: new ObjectId(id as string), author: session?.user.email });
                if (likeData) {
                    likes = true;
                } else {
                    likes = false;
                }
            }
            return res.status(200).json({ count, likes });
        } catch (e) {
            return res.status(500);
        }
    }
}
