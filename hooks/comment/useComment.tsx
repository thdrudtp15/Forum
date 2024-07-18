import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useCommentList(comment: string | undefined, id: string) {
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    const getCommentList = async () => {
        console.log('왜이래');
        axios
            .get(`http://localhost:3000/api/get/comment?id=${id}`)
            .then((res) => {
                console.log(res.data);
                setCommentList(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const writeComment = async () => {
        let data = {
            comment,
            parent: id,
        };
        fetch('http://localhost:3000/api/post/comment', { method: 'POST', body: JSON.stringify(data) })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                getCommentList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCommentList();
    }, []);

    return { commentList, loading, error, writeComment };
}
