import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    // 라이브러리를 사용하기 위한 세팅
    aws.config.update({
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
        region: 'ap-northeast-2',
        signatureVersion: 'v4',
    });

    const s3 = new aws.S3();
    // 프리사인드 url 생성
    const url = await s3.createPresignedPost({
        Bucket: process.env.NEXT_AWS_BUCKET_NAME,
        Fields: { key: req.query.file }, // 파일명 기재
        Expires: 60, // seconds 유효기간
        Conditions: [
            ['content-length-range', 0, 1048576], //파일용량 1MB 까지 제한
        ],
    });

    res.status(200).json(url);
}
