import { useState } from 'react';

export default function Write() {
    return (
        <div className="p-20">
            <h4>회원가입</h4>
            <form action={'/api/post/signUp'} method="POST">
                <input type="text" name="name" placeholder="이름" />
                <input type="text" name="email" placeholder="이메일" />
                <input type="text" name="password" placeholder="비밀번호" />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
