import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://admin:asdfzxcv15@cluster0.auksbnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let connectDB: Promise<MongoClient>;
let global: { _mongo?: Promise<MongoClient> } = {};

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url).connect();
}
export { connectDB };

// 데이터베이스 세팅 코드
// 페이지에 넣을 경우 새로고침 시 계속 DB와의 연결을 시도함
// 여기다 넣어서 따로 하면 좀 다른듯?
// 아니면 가져다 쓰려고 하는 걸 수도.
// 현재는 타입을 몰라서 any를 사용함
// 타입스크립트의 경우 내가 모르는 라이브러리, 서버 통신 등의 부분에서 오류가 많이 나므로 따로 정리도 필요해보임..
