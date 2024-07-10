'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

export default function LoginAuthBtn({ 로그인정보 }: { 로그인정보: Session | null }) {
    if (로그인정보) {
        return <button onClick={() => signOut()}>로그아웃</button>;
    } else {
        return (
            <button
                onClick={() => {
                    signIn();
                }}
            >
                로그인
            </button>
        );
    }
}
