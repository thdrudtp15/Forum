import { connectDB } from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

type result = { _id: string; title?: string; content: string; author: string }[];

export default async function List() {
    const client: any = await connectDB;
    const db = client.db('forum');
    const resultValue: result = await db.collection('post').find().toArray();
    const result: result = resultValue.map((item) => ({ ...item, _id: item._id.toString() }));

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    );
}
