# Task Flow Manager App

- ?!

- 🔗 Learn from source: [Build a Nextjs Project Management App & Deploy on AWS | Cognito, EC2, Node, RDS, Postgres, Tailwind](https://www.youtube.com/watch?v=KAV8vo7hGAo)

## Settings

### JavaScript Runtime Environment

- 🔗 [Node.js](https://nodejs.org/en)
  - `Node.js` là một <u>môi trường runtime JavaScript</u>
  - Cho phép <u>chạy code JavaScript bên ngoài trình duyệt web</u>
  - Chủ yếu được sử dụng để phát triển _"ứng dụng server-side"_
- 👉🏻 _Step 1:_ Download và cài đặt **Node.js**
- 👉🏻 _Step 2:_ Nhập lệnh `node -v` để kiểm tra đã cài đặt thành công chưa? và phiên bản hiện đang dùng?

### Package Manager

- 🧐 `NPM` **(Node Package Manager)** là <u>trình quản lý package</u> mặc định của **Node.js**, giúp cài đặt, quản lý và chia sẻ các <u>thư viện JavaScript</u>.
- 🧐 `NPX` **(Node Package eXecute)** là một công cụ đi kèm với `NPM` (từ phiên bản 5.2.0), giúp <u>thực thi các package</u> **Node.js** mà không cần cài đặt **[global]**.
- ⚖️ Khác biệt chính giữa `NPM` và `NPX`:
  - 1️⃣ `NPM`:
    - Mục đích: Quản lý và cài đặt package
    - Cách hoạt động: <u>Tải về và lưu trữ package</u> trong **[node_modules]** hoặc **[global]**
    - Sử dụng lâu dài: Package được cài đặt vĩnh viễn
  - 2️⃣ `NPX`:
    - Mục đích: Thực thi package trực tiếp
    - Cách hoạt động: <u>Tải tạm thời và chạy, sau đó xóa</u>
    - Sử dụng một lần: Không lưu trữ lâu dài
  - 💎 Tóm lại: `NPM` để quản lý package, `NPX` để chạy package mà không cần cài đặt vĩnh viễn.
- 🔗 [npx](https://docs.npmjs.com/cli/v8/commands/npx)
  - Gói `NPX` này hiện đã là một phần của `NPM CLI`.

---

- ‼️ `ERESOLVE`
  - ✅ Khi cài đặt package không dùng _"flag"_ (mặc định từ **NPM +v7+** trở đi):
    - Kiểm tra `Peer Dependencies` nghiêm ngặt (là dependencies mà <u>package yêu cầu</u> nhưng không tự cài đặt, để tránh ❌ _"duplicate"_ và ❌ _"conflict version"_)
    - Dừng và báo lỗi nếu có conflict
    - Tạo `Dependency Tree` <u>chính xác theo yêu cầu</u>
    - Fail fast - không cài nếu không tương thích
    ```bash
    npm install some-package
    ```
  - ⚠️ Khi cài đặt package dùng _"flag"_ `--legacy-peer-deps`:
    - Sử dụng <u>thuật toán Resolve Dependency</u> cũ (**NPM v6 và trước**) ~ (lỏng lẻo hơn)
    - Bỏ qua một số conflict `Peer Dependency`
    - Vẫn cài đặt được package dù có warning
    - Tạo `Dependency Tree` <u>gần giống với mong muốn</u>
    ```bash
    npm install some-package --legacy-peer-deps
    ```
  - ❌ Khi cài đặt package dùng _"flag"_ `--force`:
    - Bỏ qua TẤT CẢ validation
    - Tính năng kiểm tra `Peer Dependencies` hoàn toàn bị bỏ qua
    - Cài đúng version yêu cầu
    ```bash
    npm install some-package --force
    ```
  - 💎 Khuyến nghị sử dụng:
    - `--legacy-peer-deps`: Khi biết package có thể work với version hiện tại
    - `--force`: Chỉ khi rất chắc chắn hoặc để test nhanh
    - Không dùng gì: Tốt nhất - `downgrade/upgrade dependency` nếu cần
    - Tóm lại: `--legacy-peer-deps` ⚠️ an toàn hơn `--force` ❌, nhưng cả hai đều có _"rủi ro" (risk)_.
  - 💀 Chú ý: `NPM` _"nhớ"_ cách **resolve** từ lần trước
    - Khi bạn dùng `--legacy-peer-deps` cho gói đầu tiên:
      - `NPM` tạo `package-lock.json` với thuật toán **NPM v6**
      - `Dependency Tree` được _"lock"_ theo cách cũ (kết quả cũng tương tự với `--force`)
      - Các gói tiếp theo khi cài, <u>phải tuân theo cách resolve này</u>! (cả 2 cờ đều _"làm bẩn"_ 💩 `package-lock.json`)
    - Giải pháp:
      - 1️⃣✅ Tiếp tục dùng kèm _"flag"_ `--legacy-peer-deps` để cài đặt các gói tiếp theo (cũng tương tự với `--force`).
      - 2️⃣❌ Xóa lock file và reinstall:
      ```bash
      rm package-lock.json
      rm -rf node_modules
      npm install
      ```

---

- ⭐️ Vài lệnh để <u>kiểm tra cấu trúc</u> `dependencies` có ổn hay không?
  - 🔹 1. **Kiểm tra cây dependencies**
    - <u>Hiển thị toàn bộ cây dependencies</u>.
    - Nếu có `invalid`, `deduped`, `extraneous` → tức là có vấn đề về **(version)** hoặc **(dependency)** thừa.
      - `invalid` (**version** sai so với **peer deps**)
      - `deduped` (**NPM hoist** chung bản để tránh trùng)
      - `extraneous` (có **package** cài mà không khai báo trong `package.json`)
    - Nếu mọi gói khớp **(version)** → không có dòng `“invalid”` ❌ thì **OK** ✅.
    ```bash
    npm ls
    ```
  - 🔹 2. **Kiểm tra lỗi/issue trong cây dependency**
    - Lệnh `npm audit` quét bảo mật & lỗi dependency.
    - Nếu muốn fix tự động: `npm audit fix`
  - 🔹 3. **Kiểm tra version không khớp (peer deps conflict)**
    - Xem chính xác bao nhiêu **(version)** `<package-name>` đang tồn tại và gói nào yêu cầu.
    ```bash
    npm ls <package-name>
    ```

- ⭐️ Cập nhật lên bản mới nhất trên `NPM Registry` (bỏ qua ‼️ **Range Version**)
  - Bước 1: `npx npm-check-updates -u` quét toàn bộ `package.json` và thay **(version)** bằng **(latest)**.
  - Bước 2: `npm install` để cài bản mới nhất vừa ghi vào file.
  - Đây là cách nhanh nhất để <u>toàn bộ gói đều lên bản mới nhất tuyệt đối</u>.

  ```bash
  npx npm-check-updates -u
  npm install
  ```

---

- ‼️ Cấu trúc **Repo** hiện đang dùng:

  ```
  task-flow-manager/   <-- repo Git chính
  ├── node_modules/    <-- dùng cho FE (Next.js)
  ├── package.json     <-- của FE
  ├── tsconfig.json
  ├── server/          <-- có package.json + tsconfig.json riêng cho BE
  └── src/             <-- FE code
  ```

  - File `package.json` ở _"root"_ vs trong _"server/"_
    - Hoàn toàn độc lập nhau 💎
    - `task-flow-manager/package.json` quản lý _"dependency"_ cho **FE (Next.js)**.
      - Khi bạn `npm install` ở _"root"_ → chỉ cài cho **FE**.
    - `task-flow-manager/server/package.json` quản lý _"dependency"_ cho **BE (Node.js/Express/NestJS)**.
      - Khi bạn `npm install` ở _"server/"_ → chỉ cài cho **BE**.

- 👉 Đây gọi là `Monorepo nhẹ` (**1 repo Git** <u>chứa nhiều project con</u>).
  - ✅ Ưu điểm:
    - Đơn giản, **FE/BE** cùng **Repo** → dễ đồng bộ.
    - Không bị vấn đề _"nested git"_.
    - Phù hợp dự án nhỏ hoặc trung bình.
  - ❌ Nhược điểm:
    - Mỗi bên **(client và server)** có `node_modules` riêng → dung lượng **Repo** nặng hơn, cài `dependency` mất nhiều thời gian.
    - Nếu sau này bạn muốn dùng `dependency` chung (ví dụ thư viện eslint, prettier, tsconfig), phải cài 2 nơi.
    - `CI/CD` cần setup tách riêng **FE/BE build** ➡️ `Deploy` riêng cho **FE và BE**.

- 🔹 Có thể: Nâng cấp thành `npm workspaces / pnpm workspaces`
  - Tạo 1 `package.json` ở _"root"_, định nghĩa **Workspaces**:
    ```json
    {
      "private": true,
      "workspaces": [
        "src", // FE (Next.js)
        "server" // BE (Node.js)
      ]
    }
    ```
  - Khi đó:
    - **FE và BE** vẫn có `package.json` riêng.
    - Nhưng `node_modules` gom chung ở _"root"_ → cài `dependency` nhanh hơn.
    - Có thể chia sẻ `lib` chung (ví dụ _"eslint-config, tsconfig, utils"_).

### Framework

- 🔗 Sử dụng [Next.js](https://nextjs.org/) là một **React Framework cho Web**.
- 👉🏻 Nhập lệnh: `npx create-next-app@latest` để khởi tạo dự án, sử dụng kèm các gói sau...
  - Gói `TypeScript`
  - Gói `ESLint`
  - Gói `Tailwind CSS`
  - ⭐️ Dùng `src/ directory`
    - Viết tắt của _"source"_, là một quy ước phổ biến trong phát triển phần mềm để <u>lưu trữ mã nguồn chính</u> của một ứng dụng hoặc dự án.
    - Mục đích của nó là phân tách rõ ràng _"logic cốt lõi" (core logic)_ và các _"tệp triển khai" (implementation files)_ khỏi các _"tài nguyên" (assets)_ khác của dự án.
  - ⭐️ Dùng `App Router`
    - ❌ `Page Router` (Cũ - **Next.js 12** và trước)
      - 👉🏻 Cấu trúc: File system routing trong thư mục `pages/` 💎
      - 👉🏻 File đặc biệt: \_app.js, \_document.js
      - 👉🏻 Tính năng: `Client Side Rendering`, `Static Generation`
      - 👉🏻 Data fetching: `getServerSideProps`, `getStaticProps`
      ```
      pages/
      ├── _app.js           # App component
      ├── index.js          # Home page
      ├── about.js          # /about
      └── blog/
          ├── index.js      # /blog
          └── [slug].js     # /blog/[slug]
      ```
    - ✅ `App Router` (Mới - **Next.js 13+**)
      - 🧐 Đây là <u>hệ thống routing mới</u> của Next.js, được xây dựng trên `React Server Components` và `Suspense`.
      - 👉🏻 Cấu trúc: File system routing trong thư mục `app/` 💎
      - 👉🏻 File đặc biệt: `page.js`, `layout.js`, `loading.js`, `error.js`
      - 👉🏻 Tính năng: `Server Components`, `Streaming`, `Nested Layouts`
      - 👉🏻 Data fetching: `fetch()` với `caching tự động`
      ```
      app/
      ├── layout.js          # Root layout
      ├── page.js           # Home page
      ├── about/
      │   └── page.js       # /about
      └── blog/
          ├── layout.js     # Layout cho blog
          ├── page.js       # /blog
          └── [slug]/
              └── page.js   # /blog/[slug]
      ```
    - ⚖️ Khác biệt chính:
      - ❌ `Page Router` đơn giản hơn, ổn định hơn cho dự án cũ
      - ✅ `App Router` hiện đại hơn, **performance** tốt hơn 🏆
  - ⭐️ Dùng `Tupopack`
    - 🧐 `Turbopack` là <u>bundler JavaScript thế hệ mới</u> được phát triển bởi **Vercel** (team tạo ra **Next.js**), được viết bằng **Rust** để thay thế `Webpack`.
    - ⚖️ So sánh tốc độ:
      - ✅ Khởi động nhanh hơn `Webpack` **(10x)**
      - ✅ Updates nhanh hơn **(700x)**
      - ✅ Cold start trên large codebase: giây thay vì phút
    - ‼️ Trạng thái hiện tại:
      - Alpha/Beta stage
      - Tích hợp sẵn trong Next.js 13+ cho dev mode
      - ❌ Chưa stable cho production
      - Mục tiêu thay thế hoàn toàn Webpack trong tương lai

### Extension

- Cho **IDE (Cursor | VSCode)**:
  - 🔗 [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
  - 🔗 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - 🔗 [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
  - 🔗 [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - 🔗 [Tailwind Documentation](https://marketplace.visualstudio.com/items?itemName=alfredbirk.tailwind-documentation)
  - 🔗 [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- Cho **Browser (Google Chrome | Brave)**:
  - 🔗 [Pesticide](https://chromewebstore.google.com/detail/pesticide/bakpbgckdnepkmkeaiomhmfcnejndkbi)
  - 🔗 [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Package

- Dùng cho `[dependencies]`:
  - ➡️ [MUI - Material UI](https://mui.com/)
    - 🔗 [@mui/material](https://www.npmjs.com/package/@mui/material)
      - 🧐 Đây là thư viện cung cấp các **Component React** nguồn mở triển khai theo _"Material Design"_ của **Google**
    - 🔗 [@mui/x-data-grid](https://www.npmjs.com/package/@mui/x-data-grid) ➡️ [MUI X Data Grid](https://mui.com/x/react-data-grid/)
      - 🧐 Dùng component **React Data Grid (data table)** từ **MUI**, giúp trình bày thông tin theo định dạng có cấu trúc gồm các hàng và cột
  - ➡️ [Emotion](https://emotion.sh/docs/introduction)
    - 🧐 Đây là một thư viện được thiết kế để <u>viết các kiểu **CSS** bằng **JavaScript**</u>
    - 🔗 [@emotion/react](https://www.npmjs.com/package/@emotion/react)
      - 🧐 Là **Core Library** của **Emotion** để viết `CSS-in-JS` trong **React**
    - 🔗 [@emotion/styled](https://www.npmjs.com/package/@emotion/styled)
      - 🧐 Cung cấp **API** để tạo **Styled Components** (tương tự `styled-components`)
  - 🔗 [lucide-react](https://www.npmjs.com/package/lucide-react) ➡️ [Lucide React](https://lucide.dev/guide/packages/lucide-react)
    - 🧐 Cung cấp bộ thư viện `Lucide Icon` cho các ứng dụng **React**
  - 🔗 [numeral](https://www.npmjs.com/package/numeral) ➡️ [Numeral.js](http://numeraljs.com/)
    - 🧐 Thư viện **JavaScript** để <u>định dạng và xử lý `Numeral`</u>
  - 🔗 [date-fns](https://www.npmjs.com/package/date-fns) ➡️ [Date-fns](https://date-fns.org/)
    - 🧐 Cung cấp bộ công cụ toàn diện nhất, nhưng đơn giản và <u>nhất quán để thao tác `Dates`</u> **JavaScript** trong **Browser** & **Node.js**
  - 🔗 [axios](https://www.npmjs.com/package/axios) ➡️ [Axios](https://axios-http.com/)
    - 🧐 Là thư viện `HTTP Client` phổ biến nhất cho **JavaScript**, được sử dụng để <u>thực hiện các `HTTP Requests`</u> từ **Browser** và **Node.js**
  - 🔗 [recharts](https://www.npmjs.com/package/recharts) ➡️ [Recharts](https://recharts.org/en-US)
    - 🧐 Là thư viện <u>biểu đồ `Redefined`</u> được xây dựng bằng **React** và **D3**
  - 🔗 [react-dnd](https://www.npmjs.com/package/react-dnd) ➡️ [React DnD](https://react-dnd.github.io/react-dnd/about)
    - 🧐 Là thư viện _"drag-and-drop"_ chính cho **React**, cung cấp các `hooks` và `utilities` để xây dựng <u>tương tác kéo thả phức tạp</u>
  - 🔗 [react-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend) ➡️ [HTML5](https://react-dnd.github.io/react-dnd/docs/backends/html5)
    - 🧐 Giúp <u>triển khai Backend</u> sử dụng `HTML5` _"Drag and Drop API native"_ của **Browser**
  - 🔗 [gantt-task-react](https://www.npmjs.com/package/gantt-task-react) ➡️ [Customizable React Gantt Chart](https://svar.dev/react/gantt/)
    - 🧐 Cung cấp component <u>biểu đồ `Gantt` có thể tương tác</u> cho **React** với **TypeScript**
    - 🏆 [Top 5 React Gantt Chart Libraries in 2025](https://svar.dev/blog/top-react-gantt-charts/#devextreme-react-gantt)
    - ‼️ Hiện tại `26-08-05`, gói _"gantt-task-react @0.3.9"_ chưa hỗ trợ _"React @19.1.0"_ (bản mới nhất ~ cũng là bản hiện tại đang dùng), chỉ hỗ trợ tới _"React @^18.0.0"_. Riêng gói này dùng lệnh `npm install gantt-task-react --legacy-peer-deps` để cài đặt
  - 🔗 [dotenv](https://www.npmjs.com/package/dotenv)
    - 🧐 Giúp quản lý _"biến môi trường"_ trong **Node.js**
      - Nó đọc file `(.env)` và nạp các biến vào `process.env`
      - Dùng để <u>tách config nhạy cảm</u> (`API key`, `DB password`, secret…) ra khỏi code. Tránh hardcode trực tiếp trong source
  - 🔗 [react-redux](https://www.npmjs.com/package/react-redux)
    - 🧐 Thư viện giúp kết nối `Redux` (thư viện <u>quản lý `state`</u> cho **JavaScript apps**) với **React**
  - 🔗 [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
    - 🧐 Viết tắt `(RTK)`, là bộ công cụ chính thức <u>để dùng `Redux` dễ hơn</u>. Nó giải quyết <u>nhược điểm của `Redux` gốc</u> (dài dòng, nhiều **boilerplate**)
  - 🔗 [redux-persist](https://www.npmjs.com/package/redux-persist)
    - 🧐 Thư viện giúp <u>lưu `(persist) state` của `Redux store`</u> vào **Storage** (thường là `localStorage` hoặc `AsyncStorage` trong **React Native**)

- Dùng cho `[devDependencies]`:
  - 🔗 [@types/node](https://www.npmjs.com/package/@types/node)
    - 🧐 Chứa các định nghĩa kiểu cho `Node`
  - 🔗 [@types/uuid](https://www.npmjs.com/package/@types/uuid)
    - 🧐 Chứa các định nghĩa kiểu cho `UUID`
  - 🔗 [@types/numeral](https://www.npmjs.com/package/@types/numeral)
    - 🧐 Chứa các định nghĩa kiểu cho `Numeral`
  - 🔗 [prettier](https://www.npmjs.com/package/prettier)
    - 🧐 Là `Code Formatter` – <u>công cụ tự động định dạng lại code</u> _(JS, TS, CSS, HTML, JSON, …)_ theo quy tắc thống nhất, giúp code sạch, dễ đọc, và đồng bộ trong cả team
  - 🔗 [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss/v/0.0.0-insiders.d539a72)
    - 🧐 Là `plugin` cho **Prettier** có chức năng: <u>tự động sắp xếp lại các `Class Tailwind` theo thứ tự chuẩn</u> (do team Tailwind quy định) 💎
    - ✅ Giúp code:
      - Gọn gàng, dễ đọc (`class` không bị lộn xộn)
      - Thống nhất trong team, tránh conflict khi merge code
      - Dễ bảo trì, vì các `class` luôn có thứ tự cố định
  - 🔗 [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
    - 🧐 Hàm tiện ích `(Utility Function)` để <u>hợp nhất các `Class Tailwind` trong **JS**</u> một cách hiệu quả mà không có xung đột về kiểu dáng
  - 🔗 [clsx](https://www.npmjs.com/package/clsx)
    - 🧐 Là một `utility` nhỏ cho **JavaScript/React** dùng để: <u>kết hợp nhiều `className` thành một string cuối cùng</u>, với hỗ trợ điều kiện `(true/false)` và mảng
    - ✅ Lợi ích:
      - Viết `className` gọn gàng, có điều kiện
      - Tránh chuỗi `class` dài dòng hoặc nhiều if/else

### Dababase

- 🌐 Sử dụng `PostgreSQL` (hay gọi tắt là `Postgres`):
  - 🔗 [PostgreSQL Downloads](https://www.postgresql.org/download/)
  - ✍🏻 [How to Install PostgreSQL on Mac | Install PostgreSQL on macOS](https://www.youtube.com/watch?v=PShGF_udSpk)
  - ‼️ Đảm bảo bạn có cài `pgAdmin` để kết nối với **Database** và xem những gì diễn ra bên trong và lưu pass **SuperUser** cẩn thận

## Web Tools

- [download-directory • github • io](https://download-directory.github.io/)
  - ❌ GitHub không hỗ trợ tải trực tiếp một thư mục trong một Repo.
  - ✅ Nếu chỉ cần down 1 thư mục thay vì nguyên Repo: dùng web tool ngoài này với _"link thư mục"_.
