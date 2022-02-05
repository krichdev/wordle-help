// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { globalWordSearch, wordsThatStartWith } from '../../lib/wordSearch';

export type WordsData = {
  words: string[] | never[],
  message: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordsData>
) {
  if (req.method === 'POST') {
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

  if (req.method === 'GET') {
    const { query } = req;

    const words = wordsThatStartWith(query.starts as string);
    return res.status(200).json({
      words,
      message: `There are ${words.length} possible words`,
    })
  }
}