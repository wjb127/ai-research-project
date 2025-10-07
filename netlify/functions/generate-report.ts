import type { Handler, HandlerEvent } from '@netlify/functions';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
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
    const { query, context, sources } = JSON.parse(event.body || '{}');

    if (!query || !context) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Query and context are required' }),
      };
    }

    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Gemini API key not configured' }),
      };
    }

    // Format sources for the prompt
    const sourcesText = sources?.map((s: any, i: number) =>
      `${i + 1}. [${s.title}](${s.url})`
    ).join('\n') || '';

    const prompt = `You are a professional research assistant. Based on the following information, create a well-structured research report in Korean.

User Question: ${query}

Research Context:
${context}

Available Sources:
${sourcesText}

Please create a comprehensive report with the following structure:
1. **서론** (Introduction): Briefly introduce the topic and research purpose
2. **본론** (Main Body): Provide detailed analysis with 2-3 subsections
3. **결론** (Conclusion): Summarize key findings and implications
4. **참고자료** (References): List all sources used

Format the report in markdown. Be thorough but concise. Ensure all claims are backed by the provided context.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return {
        statusCode: response.status,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Gemini API request failed',
          details: errorText
        }),
      };
    }

    const data = await response.json();
    const report = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // For now, return as JSON instead of SSE (simpler implementation)
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ report }),
    };
  } catch (error) {
    console.error('Generate report error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
