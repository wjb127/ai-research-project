# 📋 스마트 리서치 어시스턴트 - TODO List

## ✅ 완료된 작업

### Phase 1: 기본 설정
- [x] Next.js 15 프로젝트 초기화
- [x] 기본 UI 레이아웃 구성
- [x] Netlify Functions 설정
- [x] Tailwind CSS 설정
- [x] TypeScript 타입 정의 (`types/index.ts`)
- [x] Zustand 스토어 설정 (`store/useSearchStore.ts`)

### Phase 2: 검색 기능 (MVP - P0)
- [x] Perplexity API 연동 (`netlify/functions/search.ts`)
- [x] 검색 UI 구현 (`components/SearchBar.tsx`)
- [x] 검색 결과 표시 (`components/SearchResults.tsx`)
- [x] 로딩 스피너 구현 (`components/LoadingSpinner.tsx`)
- [x] 메인 페이지 통합 (`app/page.tsx`)

### Phase 3: 리포트 생성 (MVP - P0)
- [x] Gemini API 연동 (`netlify/functions/generate-report.ts`)
- [x] 리포트 생성 로직 구현
- [x] 마크다운 렌더링 (`components/ReportView.tsx` with react-markdown)
- [x] 리포트 구조 (서론-본론-결론-참고자료)

### Phase 4: 검색 히스토리 (MVP - P1)
- [x] Netlify Blob Storage 기본 설정
- [x] 히스토리 저장 함수 (`netlify/functions/save-history.ts`)
- [x] 히스토리 조회 함수 (`netlify/functions/get-history.ts`)
- [x] 히스토리 삭제 함수 (`netlify/functions/delete-history.ts`)
- [x] 히스토리 사이드바 UI (`components/HistorySidebar.tsx`)

---

## 🚧 진행 중 / 미완성 작업

### Phase 4: 검색 히스토리 완성
- [ ] 히스토리 저장 기능 프론트엔드 연동
  - SearchResults 또는 ReportView에서 저장 버튼 추가
  - 리포트 생성 완료 시 자동 저장 로직
- [ ] 히스토리 목록 불러오기 구현
  - HistorySidebar에서 `/api/get-history` 호출
  - 목록 렌더링 및 날짜 포맷팅
- [ ] 히스토리 항목 클릭 시 리포트 다시 보기
  - Zustand 스토어에 히스토리 데이터 로드
  - 기존 리포트 복원
- [ ] 히스토리 삭제 기능 연동
  - 삭제 버튼 UI 추가
  - 삭제 후 목록 갱신

### Phase 5: 최적화 및 배포
- [ ] 에러 핸들링 개선
  - 각 API 호출 실패 시 사용자 친화적 에러 메시지
  - 네트워크 오류 처리
  - API 키 누락 시 안내 메시지
- [ ] 로딩 상태 개선
  - 검색 중 상태 표시 강화
  - 리포트 생성 진행률 표시 (가능하면 스트리밍)
- [ ] API Rate Limiting 클라이언트 측 구현
  - 연속 요청 제한
  - 쿨다운 타이머
- [ ] 환경 변수 검증
  - 필수 환경 변수 체크
  - `.env.example` 파일 생성
- [ ] Netlify 배포 테스트
  - 프로덕션 빌드 확인
  - 환경 변수 설정
  - 기능 테스트

---

## 🔮 향후 개선 사항 (Nice to Have)

### P2: PDF 내보내기
- [ ] jsPDF + html2canvas 라이브러리 설치
- [ ] PDF 내보내기 버튼 UI
- [ ] `/api/export-pdf` 엔드포인트 생성
- [ ] PDF 다운로드 기능 구현
- [ ] 인쇄 최적화 스타일링

### P3: 고급 기능
- [ ] 다크 모드 토글 버튼
- [ ] 다크 모드 테마 완전 적용 (현재 부분 적용됨)
- [ ] 리포트 템플릿 선택 기능
  - 학술 논문 형식
  - 비즈니스 보고서 형식
  - 간단 요약 형식
- [ ] 여러 검색 통합 리포트
  - 멀티 쿼리 입력
  - 통합 분석 리포트 생성
- [ ] 리포트 편집 기능
  - 마크다운 에디터 통합
  - 실시간 프리뷰
- [ ] 공유 링크 생성
  - 리포트 퍼블릭 링크
  - 읽기 전용 뷰

---

## 🐛 알려진 이슈

- [ ] 검색 결과에서 Perplexity citations 파싱 로직 개선 필요
  - 현재 `search.ts:86-90`에서 모든 소스에 동일한 snippet 사용
  - 각 citation별 실제 snippet 추출 필요
- [ ] Gemini API 스트리밍 응답 미구현
  - `generate-report.ts:110-115`에서 일반 JSON 응답 사용
  - SSE (Server-Sent Events) 구현으로 실시간 스트리밍 필요
- [ ] 히스토리 데이터 페이지네이션 없음
  - 많은 히스토리 항목 시 성능 이슈 가능
  - 무한 스크롤 또는 페이지네이션 추가 필요
- [ ] 모바일 반응형 최적화
  - 히스토리 사이드바 모바일 UX 개선
  - 검색 결과 카드 레이아웃 개선

---

## 📝 개발 우선순위

### 🔴 긴급 (Phase 4 완성)
1. 히스토리 저장 기능 프론트엔드 연동
2. 히스토리 목록 불러오기 및 표시
3. 히스토리 클릭 시 복원 기능

### 🟡 중요 (Phase 5)
4. 에러 핸들링 개선
5. Perplexity citations 파싱 로직 수정
6. Netlify 배포 및 테스트

### 🟢 추후 (P2-P3)
7. PDF 내보내기
8. 리포트 템플릿 선택
9. 고급 기능 추가

---

## 🎯 다음 단계

**즉시 착수 가능:**
1. `components/ReportView.tsx`에 "히스토리에 저장" 버튼 추가
2. `components/HistorySidebar.tsx`에 히스토리 목록 불러오기 및 렌더링
3. 히스토리 항목 클릭 핸들러 구현
4. `search.ts`의 citations 파싱 로직 개선

**완료 목표:** MVP 기능 완전 동작 → 배포 준비
