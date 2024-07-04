import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

type result = { id: string; title?: string; content: string };
type props = { params: { id: string | number } };

export default async function Detail(props: props) {
    const client: any = await connectDB;
    const db = client.db('forum');
    const result: result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    console.log(props);

    return (
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
        </div>
    );
}
