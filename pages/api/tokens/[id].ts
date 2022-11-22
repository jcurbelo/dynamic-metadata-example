import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NIFTYKIT_API } from '../../../constants';
import { Token } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token | { message?: string }>
) {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  const { token } = req.body;

  const { data } = await axios.put<Token>(
    `${NIFTYKIT_API}/drops/tokens/${id}`,
    token.data,
    {
      headers: {
        'x-api-key': process.env.API_KEY!,
      },
    }
  );

  res.status(200).json({ ...token, data });
}
