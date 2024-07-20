import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useCommentList(comment: string | undefined, id: string) {
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    /**
     * 댓글 가져오기
     */
    const getCommentList = async () => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/api/get/comment?id=${id}`)
            .then((res) => {
                console.log(res.data);
                setCommentList(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    /**
     * 댓글 작성
     */
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
                getCommentList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /**
     * 댓글 삭제
     */
    const deleteComment = async (id: string) => {
        fetch(`http://localhost:3000/api/delete/comment`, { method: 'POST', body: JSON.stringify(id) })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                getCommentList();
            })
            .catch((e) => {
                console.log(e);
                alert('댓글 삭제를 실패하였습니다.');
            });
    };

    useEffect(() => {
        getCommentList();
    }, []);

    return { commentList, loading, error, writeComment, deleteComment };
}
