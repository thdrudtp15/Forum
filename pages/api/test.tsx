import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const deleteRequest = async (_id: string) => {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(_id) });
    return result.deletedCount; // 삭제 개수가 담긴다.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { id } = req.query;
    if (req.method === 'GET') {
        let deletedCount = await deleteRequest(id as string);
        if (deletedCount === 0) return res.status(500).json('서버에러');
        else return res.status(200).json('삭제완료');
    }
}
