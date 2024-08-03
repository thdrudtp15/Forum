import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PresignedImage from './PresignedImage';
import CreateObjectURL from './CreateObjectURLImage';

export default async function Write() {
    let 로그인정보 = await getServerSession(authOptions);
    if (!로그인정보) redirect('/api/auth/signin');
    return <CreateObjectURL />;
}
