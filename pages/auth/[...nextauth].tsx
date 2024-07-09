import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Ov23limZKripVt2ucS8C',
            clientSecret: '6ebb46d6bd9400c4d36a894b709f02dced8345a6',
        }),
    ],
    secret: 'Asdf!zxcv15@', // jwt생성시쓰는암호
};
export default NextAuth(authOptions);
