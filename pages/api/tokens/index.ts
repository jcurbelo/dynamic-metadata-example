import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ApiResponse, Token } from '../../../types';
import { NIFTYKIT_API } from '../../../constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token[] | { message?: string }>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const results: Token[] = [];
  let hasNextPage = true;
  let page = 1;
  while (hasNextPage) {
    const response = await axios.get<ApiResponse>(
      `${NIFTYKIT_API}/drops/tokens`,
      {
        headers: {
          'x-api-key': process.env.API_KEY!,
        },
        params: {
          page,
        },
      }
    );
    const { data } = response;
    results.push(...data.data);
    hasNextPage = data.hasNextPage;
    page++;
  }
  res.status(200).json(results);
}
