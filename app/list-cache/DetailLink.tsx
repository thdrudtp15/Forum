'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DetailLink({ _id }: { _id: string }) {
    let router = useRouter();
  
    return (
        <button
            onClick={() => {
                router.push(`/modify/${_id}`);
            }}
        >
            수정
        </button>
    );
}
