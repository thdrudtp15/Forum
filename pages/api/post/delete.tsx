import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const deleteRequest = async (_id: string, email: string) => {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').deleteOne({ _id: new ObjectId(_id), author: email });
    return result.deletedCount; // 삭제 개수가 담긴다.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
        req.body.email = session?.user?.email;
    } else {
        return res.status(500).json('Please Login');
    }
    if (req.method === 'POST') {
        let result = await deleteRequest(req.body._id, req.body?.email);
        if (result === 0) {
            // 삭제 개수가 0인 경우 뭔가 이상하므로 에러 처리.
            return res.status(500).json('not your post');
        }
        return res.status(200).json('삭제 성공');
    }
}

// 디비에서 게시글 조회하고 게시글의 작성자를 비교하여 삭제하는
// 로직으로 짤 수 있으나 이러면 DB가 두 번 일해야 하니
// 한번으로 끝낼 수 있는 방법으로 처리함
