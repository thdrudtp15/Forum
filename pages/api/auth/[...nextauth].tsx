import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Ov23limZKripVt2ucS8C',
            clientSecret: 'd83eab6382da070872f56684c17286c974a205df',
        }),
    ],
    secret: 'Asdf!zxcv15@',
};
export default NextAuth(authOptions);
