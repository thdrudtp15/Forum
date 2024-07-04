import { useState } from 'react';

export default function Write() {
    return (
        <div className="p-20">
            <h4>회원가입</h4>
            <form action={'/api/post/signUp'} method="POST">
                <input type="text" name="userId" />
                <input type="text" name="userPw" />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
