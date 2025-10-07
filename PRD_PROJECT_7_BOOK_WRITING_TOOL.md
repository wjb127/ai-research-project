# PRD: AI 책 쓰기 자동화 툴 📚

## 1. 프로젝트 개요

### 1.1 목적
논픽션 및 전문서적 저자들이 정확하고 신뢰할 수 있는 콘텐츠를 빠르게 작성할 수 있도록, AI 기반 팩트체크, 출처 관리, 자동 인용 기능을 제공하는 도구

### 1.2 핵심 가치 제안
**"AI가 팩트체크하고 출처를 찾아주니, 당신은 창의적 집필에만 집중하세요"**

- 기존 AI 글쓰기 도구: 마케팅 카피, 블로그 글
- **이 도구**: 장편 콘텐츠 + 학술적 신뢰성 + 출처 검증

### 1.3 타겟 사용자
- **Primary**: 논픽션 작가, 비즈니스 서적 저자
- **Secondary**: 학술 연구자, 교수, 대학원생
- **Tertiary**: 기술 문서 작성자, 저널리스트

### 1.4 시장 기회
- 국내 출판 시장: 2조원+
- 논픽션/전문서 비중: 40%
- B2B: 출판사, 대학, 연구기관
- 구독 모델: 월 $19-49

---

## 2. 기술 스택

### 2.1 Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Tiptap** or **ProseMirror** - 리치 텍스트 에디터
- **Y.js** - 실시간 협업 (향후)

### 2.2 AI & APIs
- **Perplexity API** - 팩트체크, 출처 검색, 최신 정보
- **Gemini API** - 챕터 구조 생성, 초안 작성, 내용 분석
- **Citation.js** - 인용 형식 변환 (APA, MLA, Chicago 등)

### 2.3 Backend
- **PostgreSQL** (Supabase) - 책 데이터, 유저, 버전
- **S3** or **Supabase Storage** - 파일 저장
- **Redis** - 실시간 편집 캐싱

### 2.4 Export
- **Pandoc** - Markdown → PDF, DOCX, EPUB
- **LaTeX** - 전문 서적용 레이아웃

### 2.5 배포
- **Vercel** or **Netlify**

---

## 3. 주요 기능

### 3.1 챕터 구조 자동 생성 (MVP - P0)
**우선순위: P0**

#### 기능 설명
사용자가 책 주제를 입력하면 AI가 목차(챕터 구조)를 자동 생성

#### 사용자 플로우

**Step 1: 책 정보 입력**
```
┌─────────────────────────────────────┐
│  새 책 만들기                        │
├─────────────────────────────────────┤
│  책 제목:                            │
│  [AI 시대의 마케팅 전략]             │
│                                     │
│  카테고리:                           │
│  ○ 비즈니스  ○ 기술  ○ 자기계발    │
│  ○ 과학      ○ 역사  ○ 기타        │
│                                     │
│  타겟 독자:                          │
│  [마케터, 스타트업 창업자]           │
│                                     │
│  챕터 수:                            │
│  [10-15 챕터]                        │
│                                     │
│  [목차 생성하기 →]                   │
└─────────────────────────────────────┘
```

**Step 2: AI 목차 생성**
```
Gemini가 생성한 목차:

📖 AI 시대의 마케팅 전략

Part 1: 기초
├─ Chapter 1: AI가 바꾸는 마케팅 환경
├─ Chapter 2: 전통적 마케팅 vs AI 마케팅
└─ Chapter 3: 필수 AI 도구 소개

Part 2: 실전
├─ Chapter 4: 데이터 기반 고객 분석
├─ Chapter 5: AI 콘텐츠 생성 전략
├─ Chapter 6: 개인화 마케팅 자동화
└─ Chapter 7: 챗봇 & 고객 서비스

Part 3: 고급
├─ Chapter 8: 예측 분석 & 트렌드 파악
├─ Chapter 9: ROI 측정과 최적화
└─ Chapter 10: 윤리적 AI 마케팅

Appendix: 추천 도구 & 리소스

[목차 수정] [승인하고 시작]
```

#### 기술 스펙

**Gemini 프롬프트**:
```
Create a detailed book outline for:
Title: "AI 시대의 마케팅 전략"
Category: Business
Target readers: Marketers, Startup founders
Chapters: 10-15

Requirements:
- Logical flow from basics to advanced
- Practical, actionable content
- Include case studies sections
- Part structure (3-4 parts)
- Each chapter should have 3-5 subsections

Output in JSON:
{
  "parts": [
    {
      "title": "Part 1: 기초",
      "chapters": [
        {
          "number": 1,
          "title": "...",
          "subsections": [...]
        }
      ]
    }
  ]
}
```

---

### 3.2 AI 공동 집필 - 초안 작성 (MVP - P0)
**우선순위: P0**

#### 기능 설명
작가가 챕터 주제를 선택하면 Gemini가 초안을 작성

#### 사용자 플로우

**Step 1: 챕터 선택**
```
┌─────────────────────────────────────┐
│  Chapter 4: 데이터 기반 고객 분석   │
├─────────────────────────────────────┤
│  [AI 초안 작성하기]                  │
│  [직접 작성하기]                     │
└─────────────────────────────────────┘
```

**Step 2: 추가 정보 입력 (옵션)**
```
┌─────────────────────────────────────┐
│  AI에게 더 자세히 알려주세요:        │
│                                     │
│  [포함할 키워드]                     │
│  Google Analytics, 고객 세그먼트    │
│                                     │
│  [톤 & 스타일]                       │
│  ○ 전문적  ○ 친근함  ○ 학술적      │
│                                     │
│  [목표 분량]                         │
│  3,000 - 5,000 단어                 │
│                                     │
│  [초안 생성 →]                       │
└─────────────────────────────────────┘
```

**Step 3: AI 초안 생성**
```
[로딩 중...]
✓ 관련 자료 검색 중... (Perplexity)
✓ 초안 작성 중... (Gemini)
✓ 출처 찾는 중... (Perplexity)
```

**Step 4: 초안 결과**
```
┌─────────────────────────────────────┐
│  📝 Editor                           │
├─────────────────────────────────────┤
│  # Chapter 4: 데이터 기반 고객 분석  │
│                                     │
│  ## 서론                             │
│  현대 마케팅에서 데이터는 필수적이다.│
│  Google Analytics와 같은 도구를...  │
│  [출처: Gartner Report 2024] [✓]    │
│                                     │
│  ## 고객 세그먼트 이해하기           │
│  고객 세그먼트는 비슷한 특성을...    │
│  연구에 따르면 개인화된 마케팅은... │
│  [출처: Harvard Business Review] [✓]│
│                                     │
│  ...                                │
│                                     │
│  [수정하기] [팩트체크] [출처 추가]   │
└─────────────────────────────────────┘
```

---

### 3.3 실시간 팩트체크 시스템 (MVP - P0)
**우선순위: P0 (핵심 차별화)**

#### 기능 설명
작성 중인 내용을 Perplexity로 실시간 검증하고, 의심스러운 주장에 경고 표시

#### UI 동작

**케이스 1: 검증된 주장**
```
텍스트: "2024년 AI 시장 규모는 1,840억 달러이다."
         ✓ [검증됨]

출처: Statista - Global AI Market Size 2024
```

**케이스 2: 의심스러운 주장**
```
텍스트: "AI는 인간의 모든 직업을 대체할 것이다."
         ⚠️ [검증 필요]

AI 제안: "일부 직업은 대체될 수 있지만, 새로운
         직업도 창출될 것이다"라고 수정하는 것이
         더 정확합니다.

출처: World Economic Forum 2023
```

**케이스 3: 잘못된 정보**
```
텍스트: "ChatGPT는 2021년에 출시되었다."
         ❌ [잘못된 정보]

올바른 정보: ChatGPT는 2022년 11월에 출시되었습니다.
출처: OpenAI Official Release
```

#### 기술 스펙

**팩트체크 트리거**:
- 자동: 문장 완성 시 (1초 딜레이)
- 수동: 사용자가 "팩트체크" 버튼 클릭
- 배치: 챕터 전체 검증

**Perplexity 쿼리**:
```
"Verify: 2024년 AI 시장 규모는 1,840억 달러"
"Is this true: ChatGPT was released in 2021"
```

**응답 파싱**:
```typescript
interface FactCheckResult {
  claim: string;
  status: 'verified' | 'needs_review' | 'false';
  confidence: number; // 0-100
  correctInformation?: string;
  sources: {
    title: string;
    url: string;
    publishDate: Date;
  }[];
  suggestion?: string;
}
```

---

### 3.4 자동 출처 수집 & 인용 (MVP - P0)
**우선순위: P0**

#### 기능 설명
주장이나 데이터마다 Perplexity로 출처를 찾아 자동 인용

#### 사용자 플로우

**Step 1: 출처 필요한 텍스트 선택**
```
사용자가 텍스트 블록 선택:
"개인화 마케팅은 전환율을 30% 증가시킨다."

[출처 찾기] 버튼 클릭
```

**Step 2: AI 출처 검색**
```
[로딩...]
Perplexity로 검색 중:
"personalized marketing conversion rate increase statistics"
```

**Step 3: 출처 제안**
```
┌─────────────────────────────────────┐
│  📚 출처 후보                        │
├─────────────────────────────────────┤
│  1. McKinsey & Company (2023)       │
│     "The value of personalization"  │
│     신뢰도: ⭐⭐⭐⭐⭐              │
│     [이 출처 사용]                   │
│                                     │
│  2. Harvard Business Review (2022)  │
│     "Personalization at Scale"      │
│     신뢰도: ⭐⭐⭐⭐                │
│     [이 출처 사용]                   │
│                                     │
│  3. Salesforce Report (2024)        │
│     "State of Marketing"            │
│     신뢰도: ⭐⭐⭐⭐                │
│     [이 출처 사용]                   │
└─────────────────────────────────────┘
```

**Step 4: 인용 삽입**
```
결과 (APA 스타일):

"개인화 마케팅은 전환율을 30% 증가시킨다
(McKinsey & Company, 2023)."

또는 (각주 스타일):

"개인화 마케팅은 전환율을 30% 증가시킨다[1]."

---
[1] McKinsey & Company. (2023). The value of
    personalization. Retrieved from...
```

#### 인용 형식 지원
- **APA** (American Psychological Association)
- **MLA** (Modern Language Association)
- **Chicago**
- **Harvard**
- **IEEE**
- **Korean Citation Style** (학술 논문용)

---

### 3.5 참고문헌 자동 정리 (MVP - P0)
**우선순위: P0**

#### 기능 설명
챕터나 책 전체의 인용을 자동으로 참고문헌으로 정리

#### 생성 예시
```
## References

McKinsey & Company. (2023). The value of
    personalization in marketing. McKinsey Quarterly.
    https://www.mckinsey.com/...

Harvard Business Review. (2022). Personalization
    at scale: How leading companies use AI.
    Harvard Business Review, 100(3), 45-52.

Salesforce. (2024). State of marketing: Insights
    from 8,000+ marketers worldwide (7th ed.).
    Salesforce Research.

(알파벳순 자동 정렬)
```

---

### 3.6 버전 관리 & 협업 (P1)
**우선순위: P1**

#### 기능 설명
Git처럼 버전 관리 및 공동 편집

#### 기능
- **버전 히스토리**: 모든 변경 사항 추적
- **롤백**: 이전 버전 복원
- **브랜치**: 다른 버전으로 실험
- **공동 편집**: 여러 작가 동시 작업
- **코멘트**: 섹션별 피드백

---

### 3.7 표절 검사 (P1)
**우선순위: P1**

#### 기능 설명
작성한 내용이 기존 콘텐츠와 유사한지 검사

#### 기술
- Perplexity로 유사 문장 검색
- 유사도 % 표시
- 의도하지 않은 표절 경고

---

### 3.8 PDF/DOCX/EPUB 내보내기 (P1)
**우선순위: P1**

#### 기능 설명
완성된 책을 다양한 형식으로 내보내기

#### 지원 형식
- **PDF**: 전문 레이아웃 (LaTeX)
- **DOCX**: 출판사 제출용
- **EPUB**: 전자책
- **Markdown**: 백업용

---

## 4. 데이터 모델

### 4.1 Book
```typescript
interface Book {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  category: string;
  targetAudience: string;
  totalChapters: number;
  citationStyle: 'APA' | 'MLA' | 'Chicago' | 'Harvard';
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Chapter
```typescript
interface Chapter {
  id: string;
  bookId: string;
  number: number;
  title: string;
  content: string; // Markdown
  wordCount: number;
  status: 'draft' | 'review' | 'final';
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 Citation
```typescript
interface Citation {
  id: string;
  chapterId: string;
  text: string; // 인용된 텍스트
  source: {
    type: 'article' | 'book' | 'website' | 'report';
    title: string;
    authors: string[];
    year: number;
    url?: string;
    doi?: string;
    publisher?: string;
  };
  position: {
    start: number;
    end: number;
  };
  style: string; // 'APA', 'MLA' 등
  createdAt: Date;
}
```

### 4.4 FactCheck
```typescript
interface FactCheck {
  id: string;
  chapterId: string;
  claim: string;
  status: 'verified' | 'needs_review' | 'false';
  confidence: number;
  correctInformation?: string;
  sources: Source[];
  checkedAt: Date;
}
```

### 4.5 Version
```typescript
interface Version {
  id: string;
  bookId: string;
  chapterId: string;
  content: string;
  message: string; // commit message
  author: string;
  createdAt: Date;
}
```

---

## 5. API 스펙

### 5.1 목차 생성
```
POST /api/books/generate-outline

Request:
{
  "title": "AI 시대의 마케팅 전략",
  "category": "business",
  "targetAudience": "마케터, 스타트업 창업자",
  "chapterCount": "10-15"
}

Response:
{
  "outline": {
    "parts": [...],
    "totalChapters": 12
  }
}
```

### 5.2 초안 작성
```
POST /api/chapters/generate-draft

Request:
{
  "chapterId": "uuid",
  "keywords": ["Google Analytics", "고객 세그먼트"],
  "tone": "professional",
  "wordCount": 4000
}

Response:
{
  "draft": "# Chapter 4...",
  "citations": [...],
  "generatedAt": "..."
}
```

### 5.3 팩트체크
```
POST /api/factcheck

Request:
{
  "claim": "2024년 AI 시장 규모는 1,840억 달러이다",
  "context": "..."
}

Response:
{
  "status": "verified",
  "confidence": 95,
  "sources": [...],
  "checkedAt": "..."
}
```

### 5.4 출처 검색
```
POST /api/sources/find

Request:
{
  "claim": "개인화 마케팅은 전환율을 30% 증가시킨다",
  "preferredSourceTypes": ["academic", "industry_report"]
}

Response:
{
  "sources": [
    {
      "title": "...",
      "authors": [...],
      "year": 2023,
      "credibility": 5,
      "url": "..."
    }
  ]
}
```

---

## 6. 개발 일정

### Phase 1: MVP (5주)
- [Week 1] 기본 에디터 & 목차 생성
  - Tiptap 에디터 구현
  - Gemini 목차 생성

- [Week 2] AI 초안 작성
  - Gemini 초안 생성
  - 기본 UI

- [Week 3] 팩트체크 시스템
  - Perplexity 팩트체크 연동
  - 검증 UI

- [Week 4] 출처 & 인용
  - Perplexity 출처 검색
  - Citation.js 연동
  - 참고문헌 자동 생성

- [Week 5] 배포 & 테스트
  - Vercel 배포
  - 베타 테스트

### Phase 2: 성장 (6주)
- 버전 관리 시스템
- 공동 편집 (Y.js)
- 표절 검사
- PDF/DOCX 내보내기

### Phase 3: 확장 (6주)
- 전문가 리뷰 마켓플레이스
- Kindle 퍼블리싱 자동화
- 출판사 연동
- Enterprise 기능

**총 예상 기간: 17주 (약 4개월)**

---

## 7. 비즈니스 모델

### 7.1 구독 모델

| Tier | Free | Pro | Professional | Enterprise |
|---|---|---|---|---|
| **가격** | 무료 | $19/월 | $49/월 | 협의 |
| 책 | 1개 | 무제한 | 무제한 | 무제한 |
| 팩트체크 | 50/월 | 500/월 | 무제한 | 무제한 |
| AI 초안 | 3챕터 | 무제한 | 무제한 | 무제한 |
| 협업 | ❌ | 3명 | 10명 | 무제한 |
| 출판사 연동 | ❌ | ❌ | ✅ | ✅ |
| 전담 지원 | ❌ | ❌ | ✅ | ✅ |

### 7.2 예상 수익
- 월 유료 사용자: 1,000명 (1년 후)
- 평균 ARPU: $30
- **월 수익**: $30,000

### 7.3 B2B 타겟
- 출판사 (Enterprise)
- 대학 (Professional)
- 연구기관 (Professional)

---

## 8. 성공 지표 (KPI)

### 8.1 사용자 지표
- MAU: 5,000+ (1년 후)
- 작성된 챕터 수: 50,000+
- 팩트체크 요청: 100,000+/월

### 8.2 비즈니스 지표
- 유료 전환율: 10%+
- 평균 구독 기간: 6개월+
- NPS (Net Promoter Score): 50+

### 8.3 품질 지표
- 팩트체크 정확도: 95%+
- 출처 신뢰도: 90%+
- 사용자 만족도: 4.5/5+

---

## 9. 리스크 및 대응

### 9.1 AI 정확성
- **리스크**: 팩트체크 실수
- **대응**: 사용자 피드백, 수동 검증 옵션

### 9.2 출판사 반발
- **리스크**: AI 작성 콘텐츠 거부
- **대응**: "AI 보조" 강조, 사람이 최종 편집

### 9.3 저작권
- **리스크**: 인용 오류, 표절 논란
- **대응**: 엄격한 표절 검사, 법률 자문

---

## 10. 차별화 포인트

| 기존 AI 도구 | 책 쓰기 도구 |
|---|---|
| 짧은 콘텐츠 | 장편 책 |
| 팩트체크 없음 | 실시간 팩트체크 |
| 출처 없음 | 자동 출처 & 인용 |
| 일반 사용자 | 전문 작가/연구자 |

---

## 11. 마케팅 전략

- LinkedIn: 전문 작가 타겟
- 출판 컨퍼런스 참가
- 유명 작가 인터뷰 & 후기
- 대학 파트너십

---

## 12. 다음 단계

1. ✅ PRD 검토
2. Tiptap 에디터 프로토타입
3. Perplexity & Gemini API 테스트
4. MVP 개발 시작
5. 베타 작가 모집 (10명)
6. 공식 런칭
