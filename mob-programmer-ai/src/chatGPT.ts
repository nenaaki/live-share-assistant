import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const apiUrl = process.env.GEMINI_URL;
const apiKey = process.env.GEMINI_API_KEY;

export async function getReviewComments(code: string): Promise<string> {
  const url = `${apiUrl}${apiKey}`;
  const requestData = {
    contents: [
      {
        parts: [
          {
            text: `このコードに対して日本語でレビューしてください。出力はプレーンテキストでお願いします。:\n${code}`
          }
        ]
      }
    ]
  };
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(url, requestData, { headers });
    logger.info('Response:', response.data);
    const review = response.data.candidates[0].content.parts[0].text;
    return review;
  } catch (error: any) {
    logger.error('Error:', error);
    return 'コードレビューの取得中にエラーが発生しました。';
  }
}