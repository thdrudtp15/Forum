export default function Write() {
    return (
        <div className="p-20">
            <h4>글작성</h4>
            <form action={'/api/post/new'} method="POST">
                <input type="text" name="title" />
                <input type="text" name="content" />
                <button type="submit">작성</button>
            </form>
        </div>
    );
}
