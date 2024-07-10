import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB } from '@/util/database';
import { Adapter } from 'next-auth/adapters';

let adapter: Adapter = MongoDBAdapter(connectDB) as Adapter;
// 뭔가 돌려막기 한 느낌이라 찝찝쓰..

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Ov23limZKripVt2ucS8C',
            clientSecret: 'd83eab6382da070872f56684c17286c974a205df',
        }),
    ],
    secret: 'Asdf!zxcv15@',
    adapter,
};
export default NextAuth(authOptions);

// 왜 TS는 오류가 발생하냐고요오
