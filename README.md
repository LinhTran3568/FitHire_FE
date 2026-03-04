# FE Starter — React + Vite + TypeScript + Tailwind CSS

> Khung Frontend chuẩn, dễ maintain, dễ mở rộng.  
> Built with: **React 19 · Vite 8 · TypeScript 5 · Tailwind CSS v4 · Zustand · React Query · React Router v7**

---

## Mục lục

1. [Bắt đầu nhanh](#1-bắt-đầu-nhanh)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục)
3. [Quy chuẩn thiết kế kiến trúc](#3-quy-chuẩn-thiết-kế-kiến-trúc)
4. [Quy chuẩn code](#4-quy-chuẩn-code)
5. [Quản lý State](#5-quản-lý-state)
6. [Routing](#6-routing)
7. [Gọi API](#7-gọi-api)
8. [Styling — Tailwind CSS v4](#8-styling--tailwind-css-v4)
9. [Path Aliases](#9-path-aliases)
10. [Biến môi trường](#10-biến-môi-trường)
11. [Scripts](#11-scripts)
12. [Thêm feature mới](#12-thêm-feature-mới)
13. [Tech Stack & lý do chọn](#13-tech-stack--lý-do-chọn)

---

## 1. Bắt đầu nhanh

```bash
# 1. Cài dependencies
npm install

# 2. Copy biến môi trường
cp .env.example .env.local

# 3. Chạy dev server (http://localhost:3000)
npm run dev
```

---

## 2. Cấu trúc thư mục

```
fithire/
├── public/                 # Static assets (favicon, robots.txt…)
├── src/
│   ├── assets/             # Hình ảnh, font, icon tĩnh
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/         # Component dùng chung toàn app
│   │   ├── ui/             # Primitive UI: Button, Input, Badge, Spinner
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts    # Barrel export
│   │   └── layout/         # Shell: AppLayout, Header, Sidebar
│   │       ├── AppLayout.tsx
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── index.ts
│   │
│   ├── features/           # ★ Tổ chức theo nghiệp vụ (Feature-based)
│   │   └── auth/           # Ví dụ: feature "xác thực"
│   │       ├── components/ # Component riêng của feature
│   │       ├── hooks/      # Custom hooks (useLogin, useLogout…)
│   │       ├── services/   # Gọi API (authService.ts)
│   │       ├── store/      # Zustand store riêng (authStore.ts)
│   │       └── types/      # TypeScript types của feature
│   │
│   ├── hooks/              # Custom hooks dùng chung toàn app
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── lib/                # Tiện ích, cấu hình thư viện bên ngoài
│   │   ├── axios.ts        # Axios instance + interceptors
│   │   ├── queryClient.ts  # React Query client
│   │   └── utils.ts        # cn(), formatDate(), truncate()…
│   │
│   ├── pages/              # Route-level components (lazy loaded)
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── router/             # Cấu hình routing tập trung
│   │   └── index.tsx
│   │
│   ├── store/              # Zustand store toàn cục
│   │   └── useAppStore.ts  # Theme, sidebar, toast…
│   │
│   ├── types/              # TypeScript types/interfaces dùng chung
│   │   └── index.ts
│   │
│   ├── App.tsx             # Root component — compose providers
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind v4 + Design tokens
│
├── .env.example            # Template biến môi trường
├── .prettierrc             # Prettier config
├── .prettierignore
├── eslint.config.js        # ESLint flat config
├── tsconfig.app.json       # TypeScript cho src/
├── tsconfig.json
├── vite.config.ts          # Vite config (aliases + Tailwind plugin)
└── package.json
```

---

## 3. Quy chuẩn thiết kế kiến trúc

### 3.1 Feature-based Architecture (FBA)

> Nguồn gốc: Feature-Sliced Design (FSD) — https://feature-sliced.design

**Nguyên tắc cốt lõi:**
- Code được nhóm theo **nghiệp vụ** (feature), không theo loại file.
- Mỗi feature là một **module độc lập**: có types, store, service, hooks, components riêng.
- Feature không được import lẫn nhau trực tiếp → giao tiếp qua shared layer (`store/`, `lib/`).

**Khi nào tách thành feature?**
- Khi một nhóm chức năng có > 2 component, > 1 API call, có state riêng.
- Ví dụ: `auth`, `product`, `order`, `user-profile`, `notification`.

### 3.2 Atomic Design cho components/ui/

> Nguồn gốc: Atomic Design — Brad Frost

| Tầng | Nằm ở | Mô tả |
|------|--------|-------|
| **Atoms** | `components/ui/` | Button, Input, Badge, Spinner — không phụ thuộc business |
| **Molecules** | `components/ui/` hoặc `feature/components/` | SearchBar, FormField (gộp nhiều atoms) |
| **Organisms** | `feature/components/` | LoginForm, ProductCard, DataTable |
| **Templates** | `components/layout/` | AppLayout, AuthLayout |
| **Pages** | `pages/` | Render template + organisms, lazy-loaded |

### 3.3 Single Responsibility Principle

- Mỗi file chỉ làm **1 việc**: component chỉ render UI, service chỉ gọi API, store chỉ giữ state.
- Hook tách logic ra khỏi component → component chỉ còn JSX.

---

## 4. Quy chuẩn code

### 4.1 Đặt tên

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Component | PascalCase | `Button.tsx`, `LoginForm.tsx` |
| Hook | camelCase, prefix `use` | `useDebounce.ts`, `useLogin.ts` |
| Store | camelCase, prefix `use`, suffix `Store` | `useAuthStore.ts` |
| Service | camelCase, suffix `Service` | `authService.ts` |
| Types/Interface | PascalCase | `AuthUser`, `LoginPayload` |
| Constant | SCREAMING_SNAKE_CASE | `MAX_RETRY`, `API_TIMEOUT` |
| File thư mục | kebab-case | `user-profile/`, `order-history/` |

### 4.2 Import order (tự động bởi ESLint)

```
1. Built-in Node (path, fs…)
2. External packages (react, axios…)
3. Internal aliases (@lib/, @components/…)
4. Relative imports (./Component, ../utils)
```

### 4.3 TypeScript

- Luôn dùng **explicit types** cho function parameters và return types.
- Dùng `interface` cho object shapes, `type` cho union/intersection.
- Tránh `any` — dùng `unknown` nếu cần type động.
- Dùng `type` import: `import type { Foo } from './foo'`.

### 4.4 Component

```tsx
// ✅ Đúng: Named export + forwardRef nếu cần ref
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

// ❌ Sai: default export cho shared component (khó refactor)
```

---

## 5. Quản lý State

### Phân loại state

| Loại | Công cụ | Ví dụ |
|------|---------|-------|
| **Server state** | React Query | Danh sách sản phẩm, user profile |
| **Global UI state** | Zustand (`useAppStore`) | Theme, sidebar open/close, toast |
| **Feature state** | Zustand riêng trong feature | Auth user, giỏ hàng |
| **Local UI state** | `useState` | Modal open, form value |
| **URL state** | React Router `useSearchParams` | Filters, pagination |

### Zustand pattern

```ts
// store/useAppStore.ts
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
      }),
      { name: 'app-storage', partialize: (s) => ({ theme: s.theme }) }
    ),
    { name: 'AppStore' }
  )
);
```

### React Query pattern

```ts
// features/product/hooks/useProducts.ts
export function useProducts(params: ProductParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getAll(params),
  });
}
```

---

## 6. Routing

Cấu hình tập trung tại `src/router/index.tsx`.

```
/             → HomePage (lazy)
/dashboard    → DashboardPage (lazy)
/*            → NotFoundPage (lazy)
```

**Lazy loading:** Tất cả pages đều dùng `React.lazy()` + `<Suspense>` → code splitting tự động.

**Thêm route mới:**
1. Tạo file trong `src/pages/`
2. Khai báo lazy import trong `src/router/index.tsx`
3. Thêm vào mảng `router`

---

## 7. Gọi API

### Axios instance (`src/lib/axios.ts`)

- `baseURL`: lấy từ `VITE_API_BASE_URL`
- Timeout: 10 giây
- **Request interceptor**: tự động gắn `Authorization: Bearer <token>`
- **Response interceptor**: bắt lỗi 401 → redirect `/login`

### Service layer

```ts
// features/product/services/productService.ts
export const productService = {
  getAll: (params) => apiClient.get('/products', { params }).then(r => r.data),
  getById: (id)    => apiClient.get(`/products/${id}`).then(r => r.data),
  create: (data)   => apiClient.post('/products', data).then(r => r.data),
};
```

**Quy tắc:** Component/hook **không bao giờ** gọi `axios` trực tiếp — luôn qua service.

---

## 8. Styling — Tailwind CSS v4

### Cách sử dụng

```tsx
// Dùng Tailwind utilities
<div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4">

// Dùng cn() để merge classes động
import { cn } from '@lib/utils';
<div className={cn('base-class', isActive && 'text-blue-600', className)}>
```

### Design Tokens (CSS Custom Properties)

Định nghĩa tại `src/index.css`, dùng trong toàn bộ app:

```css
:root {
  --color-primary: oklch(0.55 0.2 264);
  --color-background: oklch(0.98 0 0);
  --radius: 0.5rem;
}
```

### Dark mode

Thêm class `dark` vào `<html>` để kích hoạt dark mode. Token sẽ tự thay đổi.

---

## 9. Path Aliases

Thay vì import relative dài dòng, dùng aliases:

```ts
// ❌ Relative hell
import { Button } from '../../../components/ui/Button';

// ✅ Alias
import { Button } from '@components/ui';
```

| Alias | Trỏ đến |
|-------|---------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@features/*` | `src/features/*` |
| `@hooks/*` | `src/hooks/*` |
| `@pages/*` | `src/pages/*` |
| `@lib/*` | `src/lib/*` |
| `@store/*` | `src/store/*` |
| `@types/*` | `src/types/*` |
| `@assets/*` | `src/assets/*` |

---

## 10. Biến môi trường

```bash
cp .env.example .env.local
```

| Biến | Mô tả |
|------|-------|
| `VITE_API_BASE_URL` | URL gốc của backend API |
| `VITE_APP_NAME` | Tên app hiển thị |

**Lưu ý:** Chỉ biến có prefix `VITE_` mới được expose ra client code.

---

## 11. Scripts

```bash
npm run dev           # Dev server tại http://localhost:3000
npm run build         # Build production → dist/
npm run preview       # Preview production build
npm run lint          # Kiểm tra lỗi ESLint
npm run lint:fix      # Tự sửa lỗi ESLint
npm run format        # Prettier format toàn bộ src/
npm run format:check  # Kiểm tra format (dùng trong CI)
```

---

## 12. Thêm feature mới

Ví dụ thêm feature `product`:

```bash
src/features/product/
├── components/
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── hooks/
│   ├── useProducts.ts      # React Query — lấy danh sách
│   └── useCreateProduct.ts # Mutation — tạo mới
├── services/
│   └── productService.ts   # axios calls
├── store/
│   └── productStore.ts     # Zustand (nếu cần local state)
└── types/
    └── index.ts            # Product, CreateProductDto…
```

**Checklist khi tạo feature:**
- [ ] Types định nghĩa rõ ràng trong `types/index.ts`
- [ ] Service tập trung axios calls trong `services/`
- [ ] Logic trong hooks, không trong component
- [ ] Component chỉ có JSX + handler gọi hook
- [ ] Barrel export `index.ts` nếu cần expose ra ngoài

---

## 13. Tech Stack & lý do chọn

| Công nghệ | Phiên bản | Lý do |
|-----------|-----------|-------|
| **React** | 19 | Ecosystem lớn, Concurrent features |
| **Vite** | 8 | Build cực nhanh, HMR tốt |
| **TypeScript** | 5 | Type-safe, refactor an toàn, IDE support |
| **Tailwind CSS** | v4 | Utility-first, không đặt tên class, bundle nhỏ |
| **React Router** | v7 | Routing chuẩn, lazy loading, nested routes |
| **Zustand** | latest | Lightweight, devtools, không boilerplate |
| **React Query** | v5 | Server state caching, stale-while-revalidate |
| **Axios** | latest | Interceptors, instance config |
| **ESLint** | v9 Flat | Import order, TS rules |
| **Prettier** | latest | Format nhất quán toàn team |
| **lucide-react** | latest | Icon tree-shakable, consistent style |

---

## Quy tắc vàng

1. **Components chỉ render** — logic vào hooks.
2. **Hooks chỉ orchestrate** — API calls vào services.
3. **Services chỉ gọi API** — không xử lý UI.
4. **Stores chỉ giữ state** — không gọi API trực tiếp.
5. **Types first** — định nghĩa types trước khi code.
