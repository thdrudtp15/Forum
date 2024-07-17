'use client';

import Link from 'next/link';
import DetailLink from './DetailLink';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type result = { _id: string; title?: string; content: string; author: string }[];

export default function ListItem({ result }: { result: result }) {
    let router = useRouter();

    /**
     * post 요청에 body에 삭제할 내용을 담아 삭제하는 방법.
     */
    const deletePost = (_id: string, index: number) => {
        axios
            .post(`/api/post/delete`, { _id: _id })
            .then((res) => {
                console.log(res);
                let list = document.querySelectorAll('.list-item');
                if (list instanceof NodeList) {
                    list[index].classList.add('opacity0');
                }
            })
            .catch((e) => {
                console.log(e);
                let error: string = e?.response?.data;
                if (error === 'Please Login') {
                    alert('로그인 해주세요.');
                } else {
                    alert('본인 작성 게시글 외에는 삭제할 수 없습니다.');
                }
            });
    };

    /**
     * URL 파라미터로 삭제하는 방법.
     */
    // const deletePost = async (_id: string, index: number) => {
    //     axios
    //         .get(`/api/URLparameter/${_id}`)
    //         .then((res) => {
    //             let list = document.querySelectorAll('.list-item');
    //             if (list instanceof NodeList) {
    //                 list[index].classList.add('opacity0');
    //             }
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };

    /**
     * 쿼리스트링으로 삭제하는 방법
     */
    // const deletePost = async (_id: string, index: number) => {
    //     fetch(`/api/test?id=${_id}`, { method: 'GET' })
    //         .then((res) => {
    //             let list = document.querySelectorAll('.list-item');
    //             if (list instanceof NodeList) {
    //                 list[index].classList.add('opacity0');
    //             }
    //             setTimeout(() => {
    //                 router.refresh();
    //             }, 1000);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };

    return (
        <div>
            {result.map((item, index) => (
                <div className={`list-item ${index}`} key={item._id.toString()}>
                    <Link prefetch={false} href={`/detail/${item._id.toString()}`}>
                        {item.title}
                    </Link>
                    {item.author === 'admin' && <strong>⭐</strong>}
                    <p>{item.content}</p>
                    {/* <Link href={`/modify/${item._id}`}>수정하기</Link> */}
                    <DetailLink _id={item._id.toString()} />
                    <button onClick={() => deletePost(item._id.toString(), index)}>삭제</button>
                    {/* toString 함수 사용하지 않을 시 경고 발생 ( 경고 이유는 : 오브젝트를 프롭스로 넘기기 때문 ) */}
                </div>
            ))}
        </div>
    );
}
