import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const deletePost = async (id: string) => {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query.query);
    if (req.method === 'GET') {
        try {
            let id = req.query.query as string;
            let deletedCount = await deletePost(id);
            if (deletedCount === 0) res.status(500).json('서버에러');
            else res.status(200).json('삭제성공');
        } catch (e) {
            console.error('삭제 오류', e);
            res.status(500);
            throw new Error('에러가 발생함.');
        }
    }
}

//query