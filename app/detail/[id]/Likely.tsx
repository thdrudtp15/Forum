'use client';

import useLike from '@/hooks/like/useLike';
import { useEffect } from 'react';

export default function Likely({ id }: { id: string | number }) {
    let { count, myLike, getLikeCount, like, disLike } = useLike(id);

    console.log(myLike);

    const 좋아요누르기 = () => {
        if (myLike === null) {
            return;
        } else if (myLike === false) {
            like();
        } else {
            disLike(myLike);
        }
    };

    return (
        <p>
            <button
                onClick={좋아요누르기}
                style={{ backgroundColor: myLike === true ? 'red' : myLike === false ? 'transparent' : 'black' }}
            >
                좋아요
            </button>
            <span>{count}</span>
        </p>
    );
}
