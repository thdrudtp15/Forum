import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Write({ children }: Readonly<{ children: React.ReactNode }>) {
    let 로그인정보 = await getServerSession(authOptions);
    if (!로그인정보) redirect('/api/auth/signin');

    return <html>{children}</html>;
}
