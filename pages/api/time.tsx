import { NextApiRequest, NextApiResponse } from 'next';

export default function Time(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') return res.status(200).json(new Date().toTimeString());
}
