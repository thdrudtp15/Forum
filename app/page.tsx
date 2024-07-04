import { connectDB } from '../../forum/util/database';

type result = { id: string; title?: string; content: string }[];

export default async function Home() {
    const client: any = await connectDB;
    const db = client.db('forum');
    const result: result = await db.collection('post').find().toArray();

    return (
        <div>
            {result.map((item, index) => (
                <p key={index}>
                    {item.title} {item.content}
                </p>
            ))}
        </div>
    );
}
