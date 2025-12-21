# 🍞 V-Bakery

동네 빵집을 위한 모바일 주문 및 재고 관리 시스템

---

## 📱 프로젝트 소개

V-Bakery는 소규모 베이커리를 위한 **실시간 재고 관리** 및 **고객 주문 시스템**입니다.

### 핵심 기능
- **고객 앱**: 빵 메뉴 확인, 찜하기, 장바구니, 주문
- **사장님 앱**: 재고 관리, 출고 알림, 상태 변경
- **실시간 동기화**: Supabase를 통한 데이터 연동

---

## 🚀 시작하기

### 필수 조건
- Node.js 18+
- Expo Go 앱 (모바일 테스트용)

### 설치

```bash
# 고객 앱
cd apps/mobile
npm install
npx expo start

# 사장님 앱
cd apps/mobile-admin
npm install
npx expo start
```

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React Native + Expo |
| Navigation | Expo Router |
| State | React Context API |
| Database | Supabase (PostgreSQL) |
| Styling | React Native StyleSheet |

---

## 📁 프로젝트 구조

```
v_bakery/
├── apps/
│   ├── mobile/          # 고객용 앱
│   └── mobile-admin/    # 사장님용 앱
└── docs/                # 프로젝트 문서
```

---

## 📊 개발 현황

자세한 진행 현황은 [docs/project_status.md](docs/project_status.md)를 참고하세요.

### 완료
- ✅ 고객 앱 기본 UI (홈, 상세, 장바구니, 마이페이지)
- ✅ 사장님 앱 재고 관리
- ✅ Supabase 연동

### 진행 예정
- 📋 푸시 알림
- 📋 사용자 인증
- 📋 주문 시스템

---

## 📄 문서

- [개발 로드맵](docs/development_roadmap.md)
- [UI/UX 디자인 가이드](docs/ui_ux_design_guide.md)
- [시스템 아키텍처](docs/system_architecture.md)
- [프로젝트 현황](docs/project_status.md)

---

## 📝 라이선스

MIT License

---

*Made with ❤️ for local bakeries*
