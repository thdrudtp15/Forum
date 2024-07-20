'use client';

import useCommentList from '@/hooks/comment/useComment';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';

type user = { user: { name: string; email: string; role: string } } | null;

export default function Comment({ id, 로그인정보 }: { id: string; 로그인정보: user }) {
    const [comment, setComment] = useState<string>();
    const { commentList, writeComment, deleteComment } = useCommentList(comment, id);

    return (
        <div>
            <div>댓글 리스트</div>
            <ul>
                {commentList.map((comment: { _id: string; comment: string; author: string }) => (
                    <li key={comment?._id.toString()} style={{ marginBottom: '10px' }}>
                        <strong>댓글 : {comment?.comment}</strong>
                        <p>글쓴이 : {comment?.author}</p>
                        {comment?.author === 로그인정보?.user.email && (
                            <button
                                onClick={() => {
                                    deleteComment(comment?._id.toString());
                                }}
                            >
                                삭제
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <input
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
            {로그인정보 && (
                <button
                    onClick={() => {
                        writeComment();
                        setComment('');
                    }}
                >
                    댓글전송
                </button>
            )}
        </div>
    );
}
