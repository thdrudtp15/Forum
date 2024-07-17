import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Write() {
    let 로그인정보: unknown = await getServerSession(authOptions);
    if (!로그인정보) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action={'/api/post/new'} method="POST">
                <input type="text" name="title" />
                <input type="text" name="content" />
                <button type="submit">작성</button>
            </form>
        </div>
    );
}
