import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB } from '@/util/database';

import { Adapter } from 'next-auth/adapters';

import bcrypt from 'bcrypt';

let adapter: Adapter = MongoDBAdapter(connectDB) as Adapter;
// 뭔가 돌려막기 한 느낌이라 찝찝쓰..
export const authOptions: any = {
    providers: [
        GithubProvider({
            clientId: 'Ov23limZKripVt2ucS8C',
            clientSecret: 'd83eab6382da070872f56684c17286c974a205df',
        }),

        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            //credentials에는 입력한 데이터가 들어옴
            async authorize(credentials): Promise<any | null> {
                let db = (await connectDB).db('forum');
                let user = await db.collection('user').findOne({ email: credentials?.email });
                if (!user) {
                    console.log('해당 이메일은 없음');
                    return null;
                }
                const pwcheck = await bcrypt.compare(credentials?.password, user.password);
                if (!pwcheck) {
                    console.log('비번틀림');
                    return null;
                }
                return user;
            },
        }),
    ],
    //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, //30일
    },
    callbacks: {
        //4. jwt 만들 때 실행되는 코드
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({
            token,
            account,
            user,
        }: {
            token: { user: { name?: string; email?: string; role?: string } };
            account: any;
            user: any;
        }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
                token.user.role = user.role;
            }
            return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        //getServerSessoion에서 조회되는 데이터를 뜻함.
        session: async ({ session, token }: { session: any; token: any }) => {
            session.user = token.user;
            return session;
        },
    },

    secret: 'Asdf!zxcv15@',
    adapter,
};
export default NextAuth(authOptions);

// 왜 TS는 오류가 발생하냐고요오
