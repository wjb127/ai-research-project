export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchHistory {
  id: string;
  query: string;
  report: string;
  sources: Source[];
  createdAt: number;
}

export interface PerplexityResponse {
  sources: Source[];
  answer: string;
}

export interface GeminiResponse {
  report: string;
}

export interface SearchRequest {
  query: string;
}

export interface ReportRequest {
  query: string;
  context: string;
  sources: Source[];
}
