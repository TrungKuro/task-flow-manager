# App Route (Next.js 13+)

- 🧐 Đây là <u>hệ thống routing mới</u> của **Next.js** (thay thế `Pages Router` cũ).
  - 👉🏻 Dùng thư mục `app/` làm `Entry Point`
    - ➡️ Dựa vào <u>cấu trúc thư mục</u> = `route` _(file system-based routing)_
  - 👉🏻 Hỗ trợ `Server Component`, **Layout**, **Loading**, **Error**,… theo từng `route`
    - ➡️ File đặc biệt: `page.js`, `layout.js`, `loading.js`, `error.js`

- 🏆 `Dynamic Router`
  - Cho phép tạo _"route động" (parametric)_ với <u>ký hiệu</u> `[param]`.
  - <u>Tên file/thư mục</u> trong _"ngoặc vuông" `[]`_ = <u>biến</u> `param`.
  - 📌 Ví dụ:
    - **URL** `/blog/123` → `params.id = "123"`
    ```
    app/blog/[id]/page.tsx
    ```

- 🗂️ <u>Cấu trúc thư mục</u> cho dự án **Client**:

  ```
  app/                  ✅ ROUTE
  ├── layout.js         # RootLayout
  ├── page.js           # HomePage
  │
  ├── projects/         ✅ ROUTE
  │   └── [id]/
  │       └── page.js   # ProjectPage | /projects/[id]
  │
  └── static/           ✅ ROUTE (example)
      ├── layout.js     # 'Static' layout
      ├── page.js       # /static
      └── [dynamic]/
          └── page.js   # /static/[dynamic]
  ```
