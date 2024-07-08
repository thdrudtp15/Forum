import { connectDB } from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';
import ListItem from './ListItem';

// export const revalidate = 20; // 20초 동안 캐싱을 함

type result = { _id: string; title?: string; content: string }[];

export default async function List() {
    // const client: any = await connectDB;
    // const db = client.db('forum');
    // const result: result = await db.collection('post').find().toArray();

    const apiResult: Response = await fetch('http://localhost:3000/api/list', { method: 'GET' }); // <== 캐싱 옵션 on (사실 자동으로 됨ㅋ)
    const result: result = await apiResult.json(); // ...;; api 전체 경로를 적어줘야 한단다...클라이언트는 안 적어도 되나??

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    );
}

// 말썽 그만..
