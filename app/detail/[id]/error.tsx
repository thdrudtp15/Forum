'use client';

export default function Error({ error, reset }: { error: any; reset: any }) {
    console.log(error); // 에러 보여줍니다.

    return (
        <div>
            <p>에러!</p>
            <button
                onClick={() => {
                    reset();
                }}
            >
                리셋
            </button>
        </div>
    );
}
