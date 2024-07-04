import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const modifyPost = async (body: { _id: string; title: string; content: string }) => {
    let { title, content } = body;
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').updateOne({ _id: new ObjectId(body._id) }, { $set: { title, content } });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { title, content } = req.body;
    if (title === '' || content === '') {
        return res.status(500).json('글 작성 하세요...');
    }
    try {
        await modifyPost(req.body);
        res.redirect(302, '/list');
    } catch (e) {
        console.log(e);
        return res.status(500).json('서버에러 발생');
    }
}
