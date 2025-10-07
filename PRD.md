# PRD: 스마트 리서치 어시스턴트

## 1. 프로젝트 개요

### 1.1 목적
학생 및 연구자가 효율적으로 정보를 수집하고 구조화된 리포트를 생성할 수 있도록 돕는 AI 기반 리서치 도구 개발

### 1.2 목표
- Perplexity API와 Gemini API를 활용한 실시간 정보 검색 및 리포트 생성
- 직관적이고 빠른 사용자 경험 제공
- Netlify를 통한 서버리스 아키텍처 구현

### 1.3 타겟 사용자
- 대학생 및 대학원생
- 리서처 및 작가
- 정보 수집이 필요한 일반 사용자

---

## 2. 기술 스택

### 2.1 Frontend
- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **React Markdown** - 마크다운 렌더링
- **Zustand** - 상태 관리

### 2.2 Backend
- **Netlify Functions** (Serverless)
- **Netlify Blob Storage** - 검색 히스토리 저장
- **Perplexity API** - 실시간 정보 검색
- **Gemini API** - 리포트 생성 및 구조화

### 2.3 배포
- **Netlify** - 호스팅 및 배포

---

## 3. 주요 기능

### 3.1 검색 기능 (MVP)
**우선순위: P0**

#### 기능 설명
- 사용자가 자연어 질문을 입력
- Perplexity API로 최신 정보 검색
- 검색 결과를 카드 형태로 표시

#### 사용자 플로우
1. 메인 페이지 검색창에 질문 입력
2. "검색" 버튼 클릭 또는 Enter
3. 로딩 상태 표시
4. 검색 결과 카드 표시 (제목, 요약, 출처 URL)

#### 기술 스펙
- API Endpoint: `/api/search`
- Input: `{ query: string }`
- Output: `{ sources: Array<{ title: string, summary: string, url: string }> }`
- Rate Limiting: 분당 10회

---

### 3.2 리포트 생성 (MVP)
**우선순위: P0**

#### 기능 설명
- 검색 결과를 기반으로 Gemini가 구조화된 리포트 생성
- 서론-본론-결론 형식
- 자동 인용 표기

#### 사용자 플로우
1. 검색 결과 확인 후 "리포트 생성" 버튼 클릭
2. Streaming 방식으로 리포트 실시간 생성
3. 마크다운 형식으로 렌더링

#### 기술 스펙
- API Endpoint: `/api/generate-report`
- Input: `{ query: string, sources: Array }`
- Output: Streaming Response (Server-Sent Events)
- 리포트 구조:
  ```
  # [주제]

  ## 서론
  [연구 배경 및 목적]

  ## 본론
  ### 1. [소주제 1]
  [내용]

  ### 2. [소주제 2]
  [내용]

  ## 결론
  [요약 및 시사점]

  ## 참고자료
  1. [출처 1]
  2. [출처 2]
  ```

---

### 3.3 검색 히스토리 (MVP)
**우선순위: P1**

#### 기능 설명
- 과거 검색 및 생성된 리포트 저장
- 히스토리 목록 조회
- 개별 리포트 다시 보기
- 삭제 기능

#### 사용자 플로우
1. 사이드바에서 "히스토리" 클릭
2. 저장된 검색 목록 표시
3. 클릭 시 해당 리포트 로드

#### 기술 스펙
- Storage: Netlify Blob Storage
- Data Structure:
  ```typescript
  interface SearchHistory {
    id: string;
    query: string;
    report: string;
    sources: Array<Source>;
    createdAt: number;
  }
  ```
- API Endpoints:
  - `GET /api/history` - 목록 조회
  - `GET /api/history/:id` - 개별 조회
  - `DELETE /api/history/:id` - 삭제

---

### 3.4 PDF 내보내기 (Nice to Have)
**우선순위: P2**

#### 기능 설명
- 생성된 리포트를 PDF로 다운로드

#### 기술 스펙
- Library: `jsPDF` + `html2canvas`
- API Endpoint: `/api/export-pdf`

---

### 3.5 고급 기능 (Future)
**우선순위: P3**

- 다크 모드
- 리포트 템플릿 선택 (학술, 비즈니스, 간단 요약)
- 여러 검색을 통합한 종합 리포트
- 리포트 편집 기능
- 공유 링크 생성

---

## 4. UI/UX 설계

### 4.1 레이아웃
```
┌─────────────────────────────────────────┐
│  Header (로고 + 히스토리 버튼)            │
├─────────────────────────────────────────┤
│                                         │
│    ┌─────────────────────────────┐     │
│    │   검색창                      │     │
│    └─────────────────────────────┘     │
│                                         │
│    [검색 결과 또는 리포트 표시 영역]     │
│                                         │
└─────────────────────────────────────────┘
```

### 4.2 주요 화면

#### 화면 1: 메인 페이지
- 중앙 정렬된 대형 검색창
- 플레이스홀더: "무엇이 궁금하신가요? (예: 양자컴퓨팅의 최신 트렌드)"
- 최근 검색어 표시 (옵션)

#### 화면 2: 검색 결과
- 상단에 검색창 (작게)
- 검색 결과 카드 (3-5개)
  - 각 카드: 출처 제목, 요약, URL 링크
- 하단에 "리포트 생성" 버튼

#### 화면 3: 리포트 뷰
- 좌측: 생성된 리포트 (마크다운 렌더링)
- 우측: 참고 자료 리스트
- 상단: "새 검색", "PDF 다운로드" 버튼

#### 화면 4: 히스토리 (사이드바)
- 슬라이드 인 사이드바
- 검색 히스토리 목록 (최신순)
- 각 항목: 질문, 날짜, 미리보기

---

## 5. API 스펙

### 5.1 Perplexity API 연동

```typescript
// /netlify/functions/search.ts

interface PerplexityRequest {
  query: string;
}

interface PerplexityResponse {
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  answer: string;
}

// Perplexity API 설정
const PERPLEXITY_API = 'https://api.perplexity.ai/chat/completions';
const model = 'llama-3.1-sonar-small-128k-online';
```

### 5.2 Gemini API 연동

```typescript
// /netlify/functions/generate-report.ts

interface GeminiRequest {
  query: string;
  context: string; // Perplexity 검색 결과
  sources: Array<Source>;
}

interface GeminiResponse {
  report: string; // 마크다운 형식
}

// Gemini API 설정
const model = 'gemini-2.0-flash-exp'; // 최신 모델
```

---

## 6. 데이터 모델

### 6.1 SearchHistory (Netlify Blob)

```typescript
interface SearchHistory {
  id: string;              // UUID
  query: string;           // 사용자 질문
  report: string;          // 생성된 리포트 (마크다운)
  sources: Source[];       // 참고 자료
  createdAt: number;       // Unix timestamp
}

interface Source {
  title: string;
  url: string;
  snippet: string;
}
```

---

## 7. 프로젝트 구조

```
ai-search-api-practice/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 메인 페이지
│   ├── search/
│   │   └── page.tsx            # 검색 결과 페이지
│   ├── report/
│   │   └── [id]/
│   │       └── page.tsx        # 개별 리포트 페이지
│   └── globals.css             # 전역 스타일
├── components/
│   ├── SearchBar.tsx           # 검색창 컴포넌트
│   ├── SearchResults.tsx       # 검색 결과 표시
│   ├── ReportView.tsx          # 리포트 뷰어
│   ├── HistorySidebar.tsx      # 히스토리 사이드바
│   └── LoadingSpinner.tsx      # 로딩 상태
├── netlify/
│   └── functions/
│       ├── search.ts           # Perplexity 검색
│       ├── generate-report.ts  # Gemini 리포트 생성
│       ├── get-history.ts      # 히스토리 조회
│       ├── save-history.ts     # 히스토리 저장
│       └── delete-history.ts   # 히스토리 삭제
├── lib/
│   ├── perplexity.ts           # Perplexity API 클라이언트
│   ├── gemini.ts               # Gemini API 클라이언트
│   └── storage.ts              # Netlify Blob 유틸
├── store/
│   └── useSearchStore.ts       # Zustand 스토어
├── types/
│   └── index.ts                # TypeScript 타입 정의
├── public/
├── .env.local                  # 환경 변수 (로컬)
├── .env.example                # 환경 변수 예시
├── netlify.toml                # Netlify 설정
├── next.config.js              # Next.js 설정
├── tailwind.config.ts          # Tailwind 설정
├── tsconfig.json               # TypeScript 설정
└── package.json
```

---

## 8. 환경 변수

```bash
# .env.local
PERPLEXITY_API_KEY=your_perplexity_api_key
GEMINI_API_KEY=your_gemini_api_key
NETLIFY_BLOB_TOKEN=your_netlify_blob_token
```

---

## 9. 개발 일정

### Phase 1: 기본 설정 (1일)
- [ ] Next.js 프로젝트 초기화
- [ ] 기본 UI 레이아웃 구성
- [ ] Netlify Functions 설정

### Phase 2: 검색 기능 (2일)
- [ ] Perplexity API 연동
- [ ] 검색 UI 구현
- [ ] 검색 결과 표시

### Phase 3: 리포트 생성 (2일)
- [ ] Gemini API 연동
- [ ] 스트리밍 리포트 생성
- [ ] 마크다운 렌더링

### Phase 4: 히스토리 (1일)
- [ ] Netlify Blob Storage 연동
- [ ] 히스토리 CRUD 구현
- [ ] 히스토리 UI

### Phase 5: 최적화 및 배포 (1일)
- [ ] 에러 핸들링
- [ ] 로딩 상태 개선
- [ ] Netlify 배포
- [ ] 테스트

**총 예상 기간: 7일**

---

## 10. 성공 지표

- 검색 응답 시간 < 3초
- 리포트 생성 시간 < 10초
- API 에러율 < 1%
- 사용자 만족도 (주관적)

---

## 11. 리스크 및 대응

### 11.1 API Rate Limiting
- **리스크**: Perplexity/Gemini API 요청 제한 초과
- **대응**: 클라이언트 측 rate limiting, 캐싱 전략

### 11.2 비용
- **리스크**: API 사용량에 따른 비용 증가
- **대응**: 무료 티어 모니터링, 사용량 제한 설정

### 11.3 응답 품질
- **리스크**: Gemini가 부정확하거나 불완전한 리포트 생성
- **대응**: 프롬프트 엔지니어링 최적화, Few-shot examples 제공

---

## 12. 다음 단계

1. ✅ PRD 검토 및 승인
2. Next.js 프로젝트 초기화
3. 기본 UI 레이아웃 구현
4. Perplexity API 연동 테스트
5. Gemini API 연동 테스트
6. 전체 플로우 구현
