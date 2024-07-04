import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const getModifyData = async (id: string | number) => {
    const db = (await connectDB).db('forum');
    const result = await db.collection('post').findOne({ _id: new ObjectId(id) });
    return result;
};

export default async function Modify(props: { params: { id: string | number } }) {
    let { id } = props.params;
    let result = await getModifyData(id);
    return (
        <div className="p-20">
            <h4>글 수정</h4>
            <form action={'/api/post/modify'} method="POST">
                <input type="text" name="title" defaultValue={result?.title} />
                <input type="text" name="content" defaultValue={result?.content} />
                <input type="hidden" name="_id" value={id} />
                <button type="submit">수정하기</button>
            </form>
        </div>
    );
}
