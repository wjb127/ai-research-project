# 🔍 스마트 리서치 어시스턴트

Next.js 15 + Perplexity API + Gemini API를 활용한 AI 기반 리서치 도구입니다.

## 📋 주요 기능

- **실시간 검색**: Perplexity API로 최신 정보 검색
- **AI 리포트 생성**: Gemini API로 구조화된 리포트 자동 생성
- **검색 히스토리**: Netlify Blob Storage를 활용한 검색 기록 저장
- **마크다운 렌더링**: 리포트를 보기 좋게 표시

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Netlify Functions (Serverless)
- **APIs**: Perplexity API, Gemini API
- **Storage**: Netlify Blob Storage
- **Deployment**: Netlify

## 🚀 시작하기

### 1. 패키지 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정

\`.env.local\` 파일을 생성하고 다음 내용을 추가하세요:

\`\`\`bash
PERPLEXITY_API_KEY=your_perplexity_api_key
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

http://localhost:3000 에서 확인할 수 있습니다.

## 📁 프로젝트 구조

\`\`\`
ai-search-api-practice/
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/               # React 컴포넌트
│   ├── SearchBar.tsx
│   ├── SearchResults.tsx
│   ├── ReportView.tsx
│   ├── HistorySidebar.tsx
│   └── LoadingSpinner.tsx
├── netlify/functions/        # Netlify Functions
│   ├── search.ts
│   ├── generate-report.ts
│   ├── get-history.ts
│   ├── save-history.ts
│   └── delete-history.ts
├── store/                    # Zustand 상태 관리
│   └── useSearchStore.ts
├── types/                    # TypeScript 타입
│   └── index.ts
└── netlify.toml              # Netlify 설정
\`\`\`

## 🔑 API 키 발급

### Perplexity API
1. [Perplexity AI](https://www.perplexity.ai/) 가입
2. API 키 발급

### Gemini API
1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. API 키 발급

## 🌐 배포하기

### Netlify 배포

1. Netlify에 레포지토리 연결
2. 환경 변수 설정:
   - \`PERPLEXITY_API_KEY\`
   - \`GEMINI_API_KEY\`
3. 자동 배포 완료!

빌드 명령어: \`npm run build\`
퍼블리시 디렉토리: \`.next\`

## 📝 사용 방법

1. **검색**: 메인 페이지에서 궁금한 내용을 입력하고 검색
2. **리포트 생성**: 검색 결과 확인 후 "리포트 생성하기" 클릭
3. **히스토리**: 우측 상단 "히스토리" 버튼으로 과거 검색 확인
4. **인쇄**: 리포트 페이지에서 "인쇄하기" 버튼 클릭

## 🔧 주요 API 엔드포인트

- \`POST /api/search\`: Perplexity 검색
- \`POST /api/generate-report\`: Gemini 리포트 생성
- \`GET /api/get-history\`: 히스토리 조회
- \`POST /api/save-history\`: 히스토리 저장
- \`DELETE /api/delete-history?id={id}\`: 히스토리 삭제

## 📄 라이선스

MIT
