import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type result = { _id: string; title?: string; content: string; author?: string };
type user = { user: { name: string; email: string; role: string } } | null;
type props = { params: { id: string | number } };

export default async function Detail(props: props) {
    const client: any = await connectDB;
    const db = client.db('forum');
    const result: result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    const 로그인정보: user = await getServerSession(authOptions);

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }} className="mb-2">
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <strong>글쓴이 : {result.author}</strong>
                <p>❤️</p>
            </div>
            <hr />
            <Comment id={result?._id?.toString()} 로그인정보={로그인정보} />
        </div>
    );
}
