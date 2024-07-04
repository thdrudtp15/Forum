import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../util/database';

type result = { id: string; title?: string; content: string }[];

async function getList() {
    const client: any = await connectDB;
    const db = client.db('forum');
    const result: result = await db.collection('post').find().toArray();
    return result;
}

export default async function List(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json(await getList());
    }
}

//12