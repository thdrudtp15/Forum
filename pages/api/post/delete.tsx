import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database';

const deleteRequest = async (_id: string) => {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(_id) });
    return result.deletedCount; // 삭제 개수가 담긴다.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let result = await deleteRequest(req.body._id);
        if (result === 0) {
            // 삭제 개수가 0인 경우 뭔가 이상하므로 에러 처리.
            return res.status(500).json('삭제 중 오류 발생');
        }
        return res.status(200).json('삭제 성공');
    }
}
