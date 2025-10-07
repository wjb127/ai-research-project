import type { Handler, HandlerEvent } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const historyItem = JSON.parse(event.body || '{}');

    if (!historyItem.id || !historyItem.query || !historyItem.report) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid history item format' }),
      };
    }

    const store = getStore('search-history');
    await store.setJSON(historyItem.id, historyItem);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: historyItem.id }),
    };
  } catch (error) {
    console.error('Save history error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save history',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
