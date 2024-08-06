'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateObjectURL() {
    let router = useRouter();

    const [src, setSrc] = useState<any>('');
    const [pvsrc, setPvsrc] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const writeContent = async () => {
        let file = src;
        let imageUrl;
        if (file) {
            console.log('뭐여 싯팔진짜');
            try {
                // src의 name을 꼭 넣어주자
                let filename = encodeURIComponent(src?.name);
                let res: { fields: any; url: string } | any = await fetch(`/api/post/image?file=${filename}`);
                res = await res.json();
                const formData = new FormData();
                // 변수명을 꼭 file로 해주어야 한다.
                // 이유는 잘 모르겠다..;
                Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                let 업로드결과 = await fetch(res.url, {
                    method: 'POST',
                    body: formData,
                });
                if (업로드결과.ok) {
                    imageUrl = 업로드결과.url + `/` + filename;
                } else {
                    throw new Error('이미지 업로드 중 에러 발생!');
                }
            } catch (e) {
                alert(e);
            }
        }
        // aws s3에 업로드 한 이후에 진행함.
        try {
            let res = await axios.post('/api/post/new', { title, content, image: imageUrl });
            if (res.status === 200) {
                router.replace('/list');
            }
            // form태그가 아닌 일반 함수로 ajax 요청시
            // 서버에서 redirect를 반환해도 redirect가 되지 않는다
            // 즉 서버 응답을 받아가지고, 따로 처리를 해주어야 한다.
            // ajax는 함수 안에서 api 요청을 하는 거라고 생각하자(새로고침이 없음)
            // form 태그는 새로고침이 무조건 일어난다!
        } catch (e) {
            alert('에러 발생');
        }
    };

    const mountImages = (e: any) => {
        let file = e.target.files[0];
        let preview = window.URL.createObjectURL(file);
        setSrc(file);
        setPvsrc(preview);
    };

    return (
        <div className="p-20">
            <h4>글작성</h4>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => mountImages(e)} />
            <p>{pvsrc && <img src={pvsrc} alt="image" />}</p>
            <button onClick={() => writeContent()}>작성</button>
        </div>
    );
}
