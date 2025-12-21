# V-Bakery 프로젝트 진행 현황

## 📊 전체 진행률: 40%

---

## ✅ 완료된 작업

### Phase 0: 기획 및 설계
- [x] 요구사항 분석 및 문서화
- [x] UI/UX 디자인 가이드 작성
- [x] 시스템 아키텍처 설계
- [x] 개발 로드맵 수립

### Phase 1: 프로젝트 세팅
- [x] Expo 프로젝트 초기화 (고객 앱)
- [x] Expo 프로젝트 초기화 (사장님 앱)
- [x] Supabase 프로젝트 생성 및 테이블 설계

### Phase 2: 고객 앱 (mobile)
- [x] 반응형 Masonry Grid 홈 화면
- [x] 상품 상세 페이지
- [x] 하단 탭 네비게이션 (홈, 장바구니, 마이페이지)
- [x] 장바구니 기능 (Context API)
- [x] 찜하기 기능 (Context API)
- [x] Supabase 연동 (데이터 조회)
- [x] Pull-to-refresh

### Phase 3: 사장님 앱 (mobile-admin)
- [x] 재고 관리 UI
- [x] 상태 변경 (판매중/출고예정/품절)
- [x] 출고 시간 설정
- [x] 출고 알림 버튼
- [x] Supabase 연동 (CRUD)

---

## 🔄 진행 중

(현재 없음)

---

## 📋 남은 작업

### Phase 2: 고객 앱 (계속)
- [ ] 상세 페이지 Supabase 연동
- [ ] 마이페이지 찜 목록 Supabase 연동
- [ ] 장바구니 Supabase 연동
- [ ] 주문 기능

### Phase 3: 사장님 앱 (계속)
- [ ] 빵 추가/삭제 기능
- [ ] 주문 관리 화면
- [ ] 매출 통계 화면

### Phase 4: 푸시 알림
- [ ] Expo Push Notifications 설정
- [ ] 찜한 빵 출고 알림
- [ ] 사장님 → 고객 알림 발송

### Phase 5: 인증 및 보안
- [ ] 사용자 인증 (Supabase Auth)
- [ ] 사장님 앱 접근 제어
- [ ] Row Level Security 설정

### Phase 6: 배포
- [ ] 앱 아이콘 및 스플래시 이미지
- [ ] 빌드 및 스토어 등록
- [ ] 프로덕션 환경 설정

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React Native, Expo, Expo Router |
| State | React Context API |
| Backend | Supabase (PostgreSQL) |
| Styling | React Native StyleSheet |

---

## 📁 프로젝트 구조

```
v_bakery/
├── apps/
│   ├── mobile/          # 고객용 앱
│   │   ├── app/         # 화면 (Expo Router)
│   │   ├── components/  # 재사용 컴포넌트
│   │   ├── context/     # 상태 관리
│   │   ├── lib/         # Supabase 클라이언트
│   │   └── data/        # 임시 데이터 (deprecated)
│   └── mobile-admin/    # 사장님용 앱
│       ├── app/         # 화면
│       └── lib/         # Supabase 클라이언트
└── docs/                # 프로젝트 문서
```

---

*마지막 업데이트: 2025-12-21*
