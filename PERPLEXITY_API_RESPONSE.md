# Perplexity Search API - 실제 응답 결과

## API 엔드포인트 및 요청 형식

```bash
curl -X POST https://api.perplexity.ai/search \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": ["양자컴퓨팅 최신 트렌드"]
  }'
```

## 응답 구조 (Response Structure)

```typescript
interface PerplexitySearchResponse {
  results: Array<{
    title: string;           // 검색 결과 제목
    url: string;             // 원본 링크 URL
    snippet: string;         // 내용 미리보기/요약
    date: string | null;     // 컨텐츠 작성일 (YYYY-MM-DD 형식 또는 null)
    last_updated: string | null;  // 마지막 업데이트 날짜 (YYYY-MM-DD 형식 또는 null)
  }>;
}
```

## 실제 테스트 결과 (Test Query: "양자컴퓨팅 최신 트렌드")

### 결과 1: PDF 문서
```json
{
  "title": "[PDF] 양자컴퓨팅 소프트웨어 최신 기술 동향",
  "url": "https://ettrends.etri.re.kr/ettrends/213/0905213003/40-3_58-68.pdf",
  "snippet": "68\n전자통신동향분석 제40권 제3호 2025년 6월\n양자컴퓨팅 소프트웨어 최신 기술 동향\nⅠ. 서론\n양자컴퓨터는 양자역학의 원리를 활용하여 고전적인 컴퓨터로는 현실적인 시간 내에 풀기 어려운 문제를 푸는 컴퓨터이다. 양자컴퓨터의 기본 단위인 큐빗(Qubit)은 0과 1의 값을 동시에 가질 수 있는 양자역학의 중첩(Superposition) 원리와 얽힘(Entanglement) 원리를 활용하여 병렬적으로 많은 계산을 수행할 수 있다.\n양자컴퓨터의 하드웨어 성능과 품질은 지속적으로 개선되고 있으나 완벽한 양자컴퓨터(Fault-tolerant Quantum Computer)의 개발에 는 아직 많은 시간이 필요하다. 따라서 양자컴퓨터를 실질적으로 활용하기 위해서는 현재 기술 수준에서 사용 가능한 중간 단계 의 양자컴퓨터인 NISQ (Noisy Intermediate-Scale Quantum) 컴퓨터를 활용하여 유용한 계산 문제를 해결하는 방법을 개발 해야 한다. 양자컴퓨팅 소프트웨어는 양자 하드웨어를 활용하여 계산 문제를 해결하는 소프트웨어를 말한다.\n양자컴퓨팅 소프트웨어는 양자 하드웨어의 발전에 따라 양자 우위(Quantum Supremacy)를 달성할 수 있는 분야로 기대되고 있으며, 금융, 화학, 제약, 인공지능, 암호학 등의 다양한 분야에서 활용될 것으로 기대되고 있다.\n이 논문에서는 양자컴퓨팅 소프트웨어의 최신 기술 동향을 살펴보고, 양자컴퓨터를 활용하여 유용한 계산 문제를 해결하는 방법에 대해 소개한다.\n양자컴퓨팅 소프트웨어 최신 기술 동향\nⅡ. 양자컴퓨팅 소프트웨어 개요\n1. 양자컴퓨팅 소프트웨어 스택\n양자컴퓨팅 소프트웨어는 <그림 1>과 같이 양자 하드웨어, 양자 게이트, 양자 회로, 양자 알고리즘, 양자 애플리케이션으로 구성된다.\n양자 하드웨어는 실제 양자컴퓨터를 구현하는 물리적 장치이다. 초전도 큐빗(Superconducting Qubit), 이온 트랩(Ion Trap), 광자(Photonic) 큐빗 등 다양한 방식으로 양자 하드웨어를 구현할 수 있다.\n양자 게이트는 양자 상태를 변환하는 기본 연산이다. 고전 컴퓨터의 논리 게이트에 해당하며, 단일 큐빗 게이트와 다중 큐빗 게이트로 구분된다.\n양자 회로는 양자 게이트를 조합하여 원하는 양자 계산을 수행하는 구조이다.",
  "date": null,
  "last_updated": "2025-10-05"
}
```

**특징:**
- PDF 문서는 제목에 `[PDF]` 태그가 붙음
- `date` 필드가 `null`이지만 `last_updated`에 값이 있음
- `snippet`에 PDF 내용의 텍스트 추출 결과가 긴 문자열로 포함됨

---

### 결과 2: YouTube 비디오
```json
{
  "title": "양자컴퓨팅 산업 최신 동향 2024~2025",
  "url": "https://www.youtube.com/watch?v=mJAqs4BTees",
  "snippet": "##### Jun 26, 2025\n\nSo you want to be a quantum engineer, but you don't know what's happening in the industry? Don't worry this video will help you catch up!",
  "date": "2025-06-26",
  "last_updated": "2025-08-23"
}
```

**특징:**
- YouTube 영상 링크
- `date`와 `last_updated` 모두 값이 존재
- `snippet`에 영상 설명과 업로드 날짜가 포함됨
- 마크다운 형식(`#####`)이 snippet에 포함됨

---

### 결과 3: 일반 웹 페이지
```json
{
  "title": "양자컴퓨터의 최신 동향",
  "url": "https://hjtic.snu.ac.kr/node/12719",
  "snippet": "### 일경컴퓨터_2022/04/28\n\n양자컴퓨터의 최신 동향\n\n#### 작성자\n\n2022-05-20\n\n#### 분류\n\n양자컴퓨터, 양자회로\n\n#### 국가\n\n일본\n\n#### 주요 내용\n\n양자컴퓨터는 양자역학의 원리를 활용하여 0과 1이 중첩된 양자 비트(큐비트)를 이용하여 고전 컴퓨터로는 계산할 수 없는 대량의 계산을 단시간에 처리할 수 있는 기술임\n\n양자컴퓨터는 지금까지 연구기관에서 개발되어 왔으나, 최근 IBM 등의 기업이 클라우드로 제공하면서 이용자들이 접근할 수 있게 되었음",
  "date": null,
  "last_updated": null
}
```

**특징:**
- 일반 웹 페이지 결과
- `date`와 `last_updated` 모두 `null`
- `snippet`에 마크다운 형식(`###`, `####`)의 구조화된 정보 포함
- 문서 메타데이터(작성자, 분류, 국가)가 snippet에 포함됨

---

## 주요 관찰 사항

1. **다양한 컨텐츠 타입 지원**: PDF, YouTube, 웹 페이지 등 다양한 소스를 검색 결과로 제공
2. **snippet 형식**: 마크다운 형식(`###`, `#####`)이 포함되어 있어 구조화된 정보 표시 가능
3. **날짜 정보 일관성 없음**: `date`와 `last_updated` 필드가 소스에 따라 `null`이거나 값이 있음
4. **snippet 길이**: PDF의 경우 매우 긴 텍스트, 다른 소스는 짧은 요약문
5. **한국어 쿼리 지원**: 한국어 검색어에 대해 정확한 한국어 결과 반환

## 활용 방안

- `snippet`의 마크다운을 파싱하여 UI에 구조화된 형태로 표시
- `date`/`last_updated` 정보를 활용한 최신성 표시
- `title`의 `[PDF]` 태그로 컨텐츠 타입 아이콘 표시
- 긴 `snippet`은 truncate 처리 후 펼치기 버튼 제공
