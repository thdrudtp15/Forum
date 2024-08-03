'use client';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function PresignedImage() {
    // 클라이언트 컴포넌트에서는 getServerSession을 사용할 수 없다.
    // 클라이언트 컴포넌트에서 유저의 로그인 여부 식별은
    // 서버에 api 요청을 통해 token을 검증 받는 방식으로 할 수 있다.
    // 아니면 그냥 클라이언트 컴포넌트를 자식 요소로 만들고
    // 페이지 자체를 서버 컴포넌트로 만들어서 해결하면 될 듯ㄴ
    // 레이아웃에 집어넣던가

    // let 로그인정보 = await getServerSession(authOptions);
    // if (!로그인정보) {
    //     redirect('/api/auth/signin');
    // }

    const [src, setSrc] = useState('');

    const mountImage = async (e: any) => {
        let file = e.target.files[0];

        // 파일 명이 한글이거나 이상한 문자일때
        // 인코딩을 해준다.
        let filename = encodeURIComponent(file.name);
        try {
            let res: { fields: any; url: string } | any = await fetch(`/api/post/image?file=${filename}`);
            res = await res.json();
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            console.log(formData, '폼데이터');
            let 업로드결과 = await fetch(res.url, {
                method: 'POST',
                body: formData,
            });
            if (업로드결과.ok) {
                // 파일명을 붙혀주어야 함!
                setSrc(업로드결과.url + '/' + filename);
            } else {
                throw new Error('이미지 업로드 중 에러 발생');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action={'/api/post/new'} method="POST">
                <input type="text" name="title" />
                <input type="text" name="content" />
                <input type="file" accept="image/*" onChange={(e) => mountImage(e)} />
                <input type="hidden" name="image" value={src} />
                <img src={src} alt="image" />
                <button type="submit">작성</button>
            </form>
        </div>
    );
}
