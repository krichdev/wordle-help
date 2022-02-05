// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { globalWordSearch } from '../../lib/wordSearch';

type Data = {
  words: string[] | never[],
  message: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;

  const words = globalWordSearch(body);

  if (words.length <= 0) {
    return res.status(200).json({
      words,
      message: 'No possible words found.'
    })
  }

  res.status(200).json({
    words,
    message: `There are ${words.length} possible words`,
  });
}