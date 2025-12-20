# 📱 모바일 앱 개발 가이드

> Expo + NativeWind 프로젝트 세팅 및 개발 가이드

---

## 🚀 프로젝트 세팅

### 1. Expo 프로젝트 생성

```bash
cd c:\v_bakery
mkdir apps
cd apps
npx create-expo-app@latest mobile --template blank-typescript
```

### 2. 필수 패키지 설치

```bash
cd mobile

# NativeWind (Tailwind for React Native)
npm install nativewind tailwindcss
npx tailwindcss init

# Expo Router (파일 기반 라우팅)
npx expo install expo-router expo-constants expo-linking expo-status-bar

# 웹 지원
npx expo install react-dom react-native-web

# 누락 패키지 설치 (필요시)
npm install babel-preset-expo --legacy-peer-deps
```

---

## ⚙️ 설정 파일

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#43A047',
        secondary: '#8D6E63',
        active: '#FF7043',
        scheduled: '#FFA726',
        soldout: '#9E9E9E',
        background: '#FAFAFA',
        card: '#FFFFFF',
        'text-primary': '#212121',
        'text-secondary': '#757575',
        disabled: '#BDBDBD',
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        'tag-new': '#4CAF50',
        'tag-renewal': '#2196F3',
        'tag-rare': '#9C27B0',
        'tag-limited': '#FF5722',
      },
    },
  },
  plugins: [],
}
```

### `babel.config.js`

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### `metro.config.js`

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `nativewind-env.d.ts` (TypeScript 타입)

```typescript
/// <reference types="nativewind/types" />
```

### `package.json` - main 수정

```json
{
  "main": "expo-router/entry",
  ...
}
```

### `app.json` - scheme 추가

```json
{
  "expo": {
    "scheme": "vbakery",
    "plugins": ["expo-router"]
  }
}
```

---

## 📁 폴더 구조

```
apps/mobile/
├── app/                    # Expo Router (파일 기반 라우팅)
│   ├── _layout.tsx        # 루트 레이아웃
│   └── index.tsx          # 홈 화면
├── components/            # 공용 컴포넌트 (예정)
├── global.css             # Tailwind CSS
├── tailwind.config.js     # Tailwind 설정
├── babel.config.js        # Babel 설정
├── metro.config.js        # Metro 설정
├── nativewind-env.d.ts    # TypeScript 타입
├── app.json               # Expo 설정
└── package.json
```

---

## 🏃 실행 방법

```bash
cd c:\v_bakery\apps\mobile
npx expo start --clear
```

- **웹**: `w` 키 → 브라우저에서 확인
- **Android**: `a` 키 또는 Expo Go 앱 QR 스캔
- **iOS**: `i` 키 (Mac만) 또는 Expo Go 앱 QR 스캔

---

## ✅ 현재 구현 상태

| 화면 | 상태 | 설명 |
|------|------|------|
| 홈 (Masonry Grid) | ✅ 완료 | 빵 카드 4개, 활성/비활성 상태 |
| 상품 상세 | ⬜ 예정 | 카드 확장형 정보 화면 |
| 장바구니 | ⬜ 예정 | 담긴 상품 목록 |
| 마이페이지 | ⬜ 예정 | 주문내역, 찜목록 |
| 사장님 대시보드 | ⬜ 예정 | 재고 현황, 출고 알림 |

---

## 🔗 관련 문서

- [UI/UX 디자인 가이드](./ui_ux_design_guide.md)
- [시스템 아키텍처](./system_architecture.md)
- [개발 로드맵](./development_roadmap.md)
