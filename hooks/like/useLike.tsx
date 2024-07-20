import { useState } from 'react';
import { useEffect } from 'react';

export default function useLike(id: string | number) {
    const [count, setCount] = useState<number>(0);
    const [myLike, setMyLike] = useState<boolean | null>(null);

    /**
     * 좋아요 카운트 get
     */
    const getLikeCount = async () => {
        fetch(`http://localhost:3000/api/get/likecount?id=${id}`, { method: 'GET' })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCount(data.count);
                setMyLike(data.likes);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /**
     * 좋아요
     */
    const like = async () => {
        fetch(`http://localhost:3000/api/get/like?id=${id}`, { method: 'GET' })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                getLikeCount();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /**
     * 좋아요 해제
     */
    const disLike = async (myLike: boolean) => {
        fetch(`http://localhost:3000/api/get/like?id=${id}&my_like=${myLike}`, { method: 'POST' })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                getLikeCount();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getLikeCount();
    }, []);

    return { count, myLike, getLikeCount, like, disLike };
}
