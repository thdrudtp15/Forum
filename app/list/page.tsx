import { connectDB } from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';
import ListItem from './ListItem';

type result = { _id: string; title?: string; content: string }[];

export default async function List() {
    const client: any = await connectDB;
    const db = client.db('forum');
    const result: result = await db.collection('post').find().toArray();

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    );
}
