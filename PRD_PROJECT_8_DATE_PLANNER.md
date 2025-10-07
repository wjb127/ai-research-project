# PRD: AI 데이트 플래너 💕

## 1. 프로젝트 개요

### 1.1 목적
20-30대 커플들이 데이트 코스 고민 없이 완벽한 데이트를 즐길 수 있도록, AI가 테마와 취향에 맞는 최적의 데이트 코스를 자동으로 생성하고 예약까지 지원하는 서비스

### 1.2 목표
- Perplexity API로 실시간 장소 정보 및 리뷰 수집
- Gemini API로 개인 맞춤형 데이트 코스 생성 및 동선 최적화
- 제휴 업체 광고 및 예약 시스템을 통한 수익화

### 1.3 타겟 사용자
- **Primary**: 20-30대 커플
- **Secondary**: 첫 데이트 준비자, 기념일 준비자
- **지역**: 국내 주요 도시 (서울, 경기, 부산 등)

### 1.4 시장 규모
- 국내 20-30대 인구: 약 1,300만 명
- 커플 비율: 약 40% → **520만 명**
- 월 1회 이상 데이트: 대부분
- TAM: 매우 큼 (반복적 니즈)

---

## 2. 기술 스택

### 2.1 Frontend
- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Zustand** - 상태 관리
- **Framer Motion** - 애니메이션

### 2.2 AI & APIs
- **Perplexity API** - 실시간 장소 리서치, 리뷰 분석
- **Gemini API** - 데이트 코스 생성, 동선 최적화
- **Kakao Map API** - 지도 및 경로 표시
- **Weather API** - 날씨 기반 대안 코스

### 2.3 Backend
- **Next.js API Routes** or **Netlify Functions**
- **PostgreSQL** (Supabase) - 유저, 코스, 리뷰 데이터
- **Prisma** - ORM
- **Redis** - 캐싱

### 2.4 예약 & 결제
- **네이버 예약 API**
- **카카오 예약 API**
- **Toss Payments** - 프리미엄 결제

### 2.5 배포
- **Vercel** or **Netlify**

---

## 3. 주요 기능

### 3.1 데이트 코스 생성 (MVP - P0)
**우선순위: P0**

#### 기능 설명
사용자가 지역, 테마, 예산을 입력하면 AI가 최적의 데이트 코스를 3가지 옵션으로 생성

#### 사용자 플로우
1. **지역 선택**
   - 홍대, 강남, 성수, 이태원, 여의도 등
   - 또는 주소 직접 입력

2. **테마 선택**
   - 🌹 로맨틱
   - 🎨 액티비티/체험
   - 🍽️ 맛집 투어
   - 🎭 문화/전시
   - 🌳 자연/힐링
   - 💎 럭셔리

3. **AI 질문 답변**
   - "예산은? (5만원 / 10만원 / 15만원+)"
   - "몇 시간 코스? (3시간 / 6시간 / 종일)"
   - "이동 수단? (도보 / 대중교통 / 자차)"
   - "특별히 피하고 싶은 것?"

4. **로딩 (AI 작동)**
   - Perplexity: 장소 리서치 중...
   - Gemini: 코스 생성 중...

5. **3가지 코스 옵션 제시**
   - A코스: 테마 강조형
   - B코스: 믹스형
   - C코스: 숨은 명소형

#### 기술 스펙

**API Endpoint**: `/api/generate-course`

**Input**:
```typescript
{
  region: string;
  theme: 'romantic' | 'activity' | 'food' | 'culture' | 'nature' | 'luxury';
  budget: number;
  duration: number; // hours
  transport: 'walk' | 'public' | 'car';
  avoid?: string[];
}
```

**Output**:
```typescript
{
  courses: [
    {
      id: string;
      name: string;
      type: 'theme-focused' | 'mixed' | 'hidden-gems';
      totalBudget: number;
      totalDuration: number;
      places: [
        {
          order: number;
          name: string;
          category: string;
          address: string;
          lat: number;
          lng: number;
          budget: number;
          duration: number; // minutes
          rating: number;
          reviewCount: number;
          description: string;
          imageUrl?: string;
          bookingUrl?: string;
          isSponsored: boolean;
        }
      ]
    }
  ]
}
```

**Perplexity 검색 쿼리 예시**:
```
"홍대 로맨틱한 브런치 카페 2024 최신 리뷰"
"강남 루프탑 레스토랑 야경 좋은 곳"
"성수동 데이트 하기 좋은 전시 갤러리"
```

**Gemini 프롬프트 예시**:
```
Based on the following information, create 3 date course options:

Region: Hongdae, Seoul
Theme: Romantic
Budget: 150,000 KRW
Duration: 6 hours
Transport: Public transit

Available places:
[Perplexity 검색 결과]

Create 3 different courses (A: Theme-focused, B: Mixed, C: Hidden gems).
Each course should:
1. Have optimal route (minimize travel time)
2. Consider timing (lunch, dinner, sunset)
3. Balance budget
4. Include variety

Output in JSON format.
```

---

### 3.2 코스 상세 보기 및 지도 (MVP - P0)
**우선순위: P0**

#### 기능 설명
생성된 코스를 시각적으로 보여주고, 지도에서 경로 확인

#### UI 구성
```
┌─────────────────────────────────────┐
│  강남 로맨틱 데이트 코스            │
│  💰 15만원 │ ⏱️ 6시간              │
├─────────────────────────────────────┤
│  [지도 표시 - 경로선 연결]          │
├─────────────────────────────────────┤
│  ⏰ 13:00 - 브런치                  │
│  📍 더 라운지                       │
│  💰 3만원 │ ⭐ 4.8 (1,234)        │
│  [예약하기] [더보기]                │
├─────────────────────────────────────┤
│  ⏰ 15:00 - 전시 관람               │
│  📍 아트 갤러리                     │
│  ...                                │
└─────────────────────────────────────┘
```

#### 기술 스펙
- **Kakao Map API** 사용
- 장소 마커 표시
- 경로선 표시
- 이동 시간 계산

---

### 3.3 제휴 업체 광고 (P0)
**우선순위: P0 (수익화 핵심)**

#### 기능 설명
광고비를 지불한 업체를 코스에 우선 노출

#### 광고 로직
1. **스폰서 배지**: 🎯 표시
2. **상위 노출**: 같은 카테고리 내 1-3위 노출
3. **강조 UI**: 다른 색상 카드

#### 광고 관리자 대시보드
- 광고주 등록
- 광고 기간 설정
- 노출 통계 확인
- 예약 전환율 확인

#### 비즈니스 모델
- **프리미엄 노출**: 월 100만원 (1위)
- **일반 노출**: 월 50만원 (2-3위)
- **지역별 독점**: 월 150만원

---

### 3.4 예약 시스템 (P1)
**우선순위: P1**

#### 기능 설명
제휴 업체 원클릭 예약

#### 사용자 플로우
1. 코스 내 장소에서 "예약하기" 클릭
2. 예약 가능 시간 확인 (실시간)
3. 인원, 시간 선택
4. 예약 완료 → 업체에 알림

#### 기술 스펙
- 초기: 외부 예약 링크 (네이버, 카카오)
- 향후: 자체 예약 시스템 구축

---

### 3.5 프리미엄 구독 (P1)
**우선순위: P1**

#### Free vs Premium

| 기능 | Free | Premium (월 9,900원) |
|---|---|---|
| 코스 생성 | 3개/월 | 무제한 |
| 광고 | 있음 | 없음 |
| 코스 저장 | 3개 | 무제한 |
| 날씨 대안 코스 | ❌ | ✅ |
| 우선 예약 | ❌ | ✅ |
| 커스터마이징 | 기본 | 고급 |

---

### 3.6 데이트 후기 & 커뮤니티 (P2)
**우선순위: P2**

#### 기능 설명
- 데이트 완료 후 리뷰 작성
- 사진 업로드
- 별점 및 코멘트
- 포인트 적립 (다음 코스 생성 시 사용)

---

### 3.7 날씨 기반 대안 코스 (P2)
**우선순위: P2**

#### 기능 설명
데이트 당일 날씨가 나쁘면 대안 코스 자동 제안

#### 로직
- D-1: 날씨 확인
- 비 예보 시: 실내 중심 대안 코스 생성
- 푸시 알림 발송

---

## 4. UI/UX 설계

### 4.1 메인 화면
```
┌─────────────────────────────────────┐
│         💕 데이트 플래너            │
├─────────────────────────────────────┤
│                                     │
│   [어디서 데이트할까요? 🌍]        │
│   홍대 / 강남 / 성수 / 이태원       │
│                                     │
│   [어떤 분위기를 원하세요? 🎨]      │
│   🌹 로맨틱  🎨 액티비티           │
│   🍽️ 맛집    🎭 문화               │
│                                     │
│   [코스 생성하기 →]                 │
│                                     │
└─────────────────────────────────────┘
```

### 4.2 코스 결과 화면
```
┌─────────────────────────────────────┐
│  ← 뒤로   강남 로맨틱 데이트         │
├─────────────────────────────────────┤
│  [A코스] [B코스] [C코스]            │
├─────────────────────────────────────┤
│  💰 15만원 │ ⏱️ 6시간 │ ⭐ 4.7    │
│                                     │
│  [지도 보기]                         │
│                                     │
│  ⏰ 13:00 브런치 🎯                 │
│  📍 더 라운지 (신사동)              │
│  💰 3만원 │ ⭐ 4.8                 │
│  [예약하기] [더보기]                │
│                                     │
│  ⏰ 15:00 전시 관람                 │
│  ...                                │
│                                     │
│  [이 코스 저장하기]                 │
│  [친구에게 공유하기]                │
└─────────────────────────────────────┘
```

---

## 5. 데이터 모델

### 5.1 User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'premium';
  subscriptionExpiresAt?: Date;
  createdAt: Date;
}
```

### 5.2 Course
```typescript
interface Course {
  id: string;
  userId: string;
  name: string;
  region: string;
  theme: string;
  totalBudget: number;
  totalDuration: number;
  places: Place[];
  createdAt: Date;
  savedAt?: Date;
}
```

### 5.3 Place
```typescript
interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl?: string;
  bookingUrl?: string;
  isSponsored: boolean;
  sponsorshipTier?: number;
}
```

### 5.4 Review
```typescript
interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  photos: string[];
  createdAt: Date;
}
```

### 5.5 Sponsor
```typescript
interface Sponsor {
  id: string;
  placeId: string;
  tier: 1 | 2 | 3;
  monthlyFee: number;
  startDate: Date;
  endDate: Date;
  stats: {
    impressions: number;
    clicks: number;
    bookings: number;
  };
}
```

---

## 6. API 스펙

### 6.1 코스 생성
```
POST /api/generate-course

Request:
{
  region: "홍대",
  theme: "romantic",
  budget: 150000,
  duration: 6,
  transport: "public"
}

Response:
{
  courses: [...],
  generatedAt: "2024-03-20T10:00:00Z"
}
```

### 6.2 코스 저장
```
POST /api/courses/save

Request:
{
  courseId: "uuid",
  userId: "uuid"
}

Response:
{
  success: true,
  savedCourse: {...}
}
```

### 6.3 예약하기
```
POST /api/booking

Request:
{
  placeId: "uuid",
  date: "2024-03-25",
  time: "19:00",
  partySize: 2
}

Response:
{
  success: true,
  bookingId: "uuid",
  confirmationCode: "ABC123"
}
```

---

## 7. 개발 일정

### Phase 1: MVP (3주)
- [Week 1] 기본 UI 및 코스 생성 로직
  - 지역/테마 선택 UI
  - Perplexity API 연동
  - Gemini API 연동
  - 코스 생성 알고리즘

- [Week 2] 코스 표시 및 지도
  - 코스 결과 UI
  - Kakao Map 연동
  - 장소 상세 정보

- [Week 3] 스폰서 시스템 및 배포
  - 광고 노출 로직
  - 외부 예약 링크
  - Vercel 배포

### Phase 2: 성장 (4주)
- 자체 예약 시스템
- 프리미엄 구독 결제
- 유저 인증 (OAuth)
- 코스 저장 기능

### Phase 3: 확장 (6주)
- 데이트 후기 & 커뮤니티
- 날씨 대안 코스
- 관리자 대시보드
- 광고주 셀프 서비스

**총 예상 기간: 13주 (약 3개월)**

---

## 8. 성공 지표 (KPI)

### 8.1 사용자 지표
- MAU (Monthly Active Users): 10,000+ (6개월 내)
- 코스 생성 횟수: 50,000+/월
- 평균 체류 시간: 5분+
- 재방문율: 40%+

### 8.2 비즈니스 지표
- 광고주 수: 50+ (6개월 내)
- 월 광고 수익: 3,000만원+
- 예약 전환율: 15%+
- 프리미엄 전환율: 5%+

### 8.3 기술 지표
- API 응답 시간: < 3초
- 코스 생성 성공률: > 95%
- 에러율: < 1%

---

## 9. 리스크 및 대응

### 9.1 Perplexity API 비용
- **리스크**: 사용량 증가 시 비용 급증
- **대응**: 캐싱 전략, 무료 티어 제한

### 9.2 광고주 확보
- **리스크**: 초기 광고주 확보 어려움
- **대응**: 무료 체험 기간, 성과 보장 계약

### 9.3 예약 시스템 연동
- **리스크**: 외부 API 불안정
- **대응**: 다중 예약 채널, Fallback 시스템

### 9.4 경쟁
- **리스크**: 카카오, 네이버 진입
- **대응**: 빠른 시장 선점, 차별화된 UX

---

## 10. 마케팅 전략

### 10.1 런칭 전략
- 인스타그램 광고 (20-30대 타겟)
- 틱톡 바이럴 콘텐츠
- 커플 인플루언서 협업

### 10.2 성장 전략
- 리퍼럴 프로그램 (친구 초대 시 무료 코스)
- 데이트 후기 이벤트
- 시즌별 테마 (벚꽃, 크리스마스 등)

### 10.3 리텐션 전략
- 주간 추천 코스 뉴스레터
- 기념일 알림
- 포인트 시스템

---

## 11. 다음 단계

1. ✅ PRD 검토 및 승인
2. 디자인 시스템 구축
3. Perplexity & Gemini API 테스트
4. MVP 개발 시작
5. 베타 테스트 (소수 유저)
6. 공식 런칭

---

## 12. 부록

### 12.1 경쟁 분석
- **블로그/커뮤니티**: 수동 검색, 오래된 정보
- **망고플레이트**: 맛집 중심, 코스 생성 없음
- **포켓플레이스**: 장소 저장만, AI 없음

### 12.2 차별화 요소
- ✅ AI 자동 코스 생성
- ✅ 실시간 정보 (Perplexity)
- ✅ 최적 동선 (Gemini)
- ✅ 원클릭 예약
- ✅ 테마별 맞춤형
