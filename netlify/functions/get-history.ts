import type { Handler, HandlerEvent } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const store = getStore('search-history');
    const { blobs } = await store.list();

    const historyItems = await Promise.all(
      blobs.map(async (blob) => {
        const data = await store.get(blob.key, { type: 'json' });
        return data;
      })
    );

    // Sort by createdAt descending
    const sortedHistory = historyItems
      .filter(item => item !== null)
      .sort((a: any, b: any) => b.createdAt - a.createdAt);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(sortedHistory),
    };
  } catch (error) {
    console.error('Get history error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to retrieve history',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
