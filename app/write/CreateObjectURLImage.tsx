'use client';

import { useState } from 'react';

export default function CreateObjectURL() {
    const [src, setSrc] = useState<string | null | any>('');
    const [pvsrc, setPvsrc] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const writeContent = async () => {
        let 업로드결과;
        if (src) {
            try {
                // src의 name을 꼭 넣어주자
                let filename = encodeURIComponent(src?.name);
                let res: { fields: any; url: string } | any = await fetch(`/api/post/image?file=${filename}`);
                res = await res.json();
                const formData = new FormData();
                Object.entries({ ...res.fields, src }).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                console.log(res);
                업로드결과 = await fetch(res.url, {
                    method: 'POST',
                    body: formData,
                });
                if (!업로드결과.ok) throw new Error('이미지 업로드 중 에러 발생!');
            } catch (e) {
                alert(e);
            }
        }
        // aws s3에 업로드 한 이후에 진행함.
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', src || '');
        try {
            let res = await fetch('/api/post/new', { method: 'POST', body: formData });
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
            <button onClick={writeContent}>작성</button>
        </div>
    );
}
