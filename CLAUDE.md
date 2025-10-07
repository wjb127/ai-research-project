# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 15 application that provides an AI-powered research assistant using Perplexity API for real-time search and Gemini API for structured report generation. The app uses a serverless architecture with Netlify Functions and stores search history in Netlify Blob Storage.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Development server runs at http://localhost:3000.

## Environment Variables

Required environment variables in `.env.local`:
- `PERPLEXITY_API_KEY` - Perplexity API key for search functionality
- `GEMINI_API_KEY` - Google Gemini API key for report generation
- `NETLIFY_BLOB_TOKEN` - Netlify Blob Storage token (auto-provided in Netlify deployment)

## Architecture

### State Management
- **Zustand store** (`store/useSearchStore.ts`): Global state for search query, sources, report, loading states, and history
- Client-side state with no persistence layer (history is fetched from Netlify Blob)

### API Flow
1. **Search Flow**: User query → `/api/search` (Netlify Function) → Perplexity API → Returns sources + answer
2. **Report Generation**: Sources + context → `/api/generate-report` (Netlify Function) → Gemini API → Returns markdown report
3. **History Management**: CRUD operations via `/api/get-history`, `/api/save-history`, `/api/delete-history`

### Netlify Functions
All API endpoints are serverless functions in `netlify/functions/`:
- `search.ts`: Calls Perplexity API with model `llama-3.1-sonar-small-128k-online`
- `generate-report.ts`: Calls Gemini API with model `gemini-2.0-flash-exp`
- `get-history.ts`, `save-history.ts`, `delete-history.ts`: Interact with Netlify Blob Storage

API routing: `/api/*` → `/.netlify/functions/*` (configured in `netlify.toml`)

### Component Structure
- `app/page.tsx`: Main page with conditional rendering (initial state → search results → report view)
- `components/SearchBar.tsx`: Handles search input and submission
- `components/SearchResults.tsx`: Displays search results from Perplexity
- `components/ReportView.tsx`: Renders markdown report with `react-markdown`
- `components/HistorySidebar.tsx`: Slide-in sidebar for history management
- `components/LoadingSpinner.tsx`: Loading state indicator

### Data Types
Core types in `types/index.ts`:
- `Source`: { title, url, snippet }
- `SearchHistory`: { id, query, report, sources, createdAt }
- `PerplexityResponse`, `GeminiResponse`, `SearchRequest`, `ReportRequest`

## Key Implementation Details

### Perplexity API Configuration
- Model: `llama-3.1-sonar-small-128k-online`
- Temperature: 0.2 (for factual consistency)
- `return_citations: true` to get source URLs
- `search_recency_filter: 'month'` for recent information

### Gemini API Configuration
- Model: `gemini-2.0-flash-exp`
- Temperature: 0.7
- maxOutputTokens: 2048
- Structured prompt requests Korean report with sections: 서론, 본론, 결론, 참고자료

### Report Structure
Generated reports follow this markdown format:
```
# [Topic]
## 서론 (Introduction)
## 본론 (Main Body)
### [Subsection 1]
### [Subsection 2]
## 결론 (Conclusion)
## 참고자료 (References)
```

## Common Development Tasks

When adding new API endpoints, create a new Netlify Function in `netlify/functions/` and it will automatically be routed to `/api/[function-name]`.

When modifying search or report generation logic, update the respective Netlify Function files. The frontend components expect specific response formats defined in `types/index.ts`.

For history features, interact with Netlify Blob Storage using the `@netlify/blobs` package (see existing history functions for patterns).

## Deployment

Deployed on Netlify with automatic deployments from the main branch. Build command: `npm run build`, Publish directory: `.next`. Set environment variables in Netlify dashboard.
