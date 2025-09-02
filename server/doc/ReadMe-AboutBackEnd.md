# 💎 Backend API

- ⚠️ Tạo thủ công thư mục `(/src)` và file `index.ts` bên trong.
- ✅ File **TypeScript** này có vai trò là `EntryPoint` của ứng dụng.
  - 1️⃣ **Điểm khởi động Server**:
    - Đây là file mà **Node.js** (hoặc `ts-node`) sẽ chạy đầu tiên.
    - Thường chứa code để:
      - Import `Express` _(hoặc `NestJS` app)_.
      - Cấu hình `Middleware` _(body-parser, cors, helmet...)_.
      - Đăng ký `Routes` _(API endpoints)_.
      - Lắng nghe `Port` _(app.listen(3000))_.
      - ...
  - 2️⃣ **Điểm tập trung để tổ chức code**:
    - Các **Module** khác (`routes/`, `controllers/`, `services/`, `db/`) sẽ được **Import** và khởi tạo từ đây.
    - Giúp bạn không phải chạy từng file lẻ, chỉ cần `node dist/index.js`.
  - 3️⃣ **Liên kết với "script" trong `package.json`**:
    - Cả giai đoạn sản xuất _"production"_ `(start)` và giai đoạn phát triển _"development"_ `(dev)` đều chạy từ file `index.ts` này.

---

- 🧐 `EntryPoint` là gì?
  - _"Điểm vào chương trình"_ 👉 là file hoặc hàm đầu tiên được chạy khi ứng dụng khởi động.
  - 📌 Ví dụ:
    - Trong `Node.js` Server → `src/index.ts`.
    - Trong `Next.js/React` Client → `src/app/page.tsx`.
  - 👉 Nói ngắn gọn: `EntryPoint` = _"nơi khởi động toàn bộ ứng dụng"_.

---

- 🧐 `Routes - EndPoint` là gì?
  - `Endpoint` 👉 là địa chỉ `URL` cụ thể mà **Client** gọi được.
  - `Route` 👉 là định nghĩa trong code **Server** để xử lý _"request"_ đến `EndPoint` đó.
  - 📌 Ví dụ với `Express`:

    ```ts
    app.get("/users/:id", (req, res) => {
      res.send(`User ID = ${req.params.id}`);
    });
    ```

    - `Route` = `app.get("/users/:id", ...)` (cách **Server** định nghĩa xử lý).
    - `EndPoint` = `/users/123` (**URL** thật mà **Client** gọi).

  - 👉 Nói ngắn gọn:
    - `Route` = code phía **Server**
    - `EndPoint` = **URL** mà **Client** truy cập

    ```
    Client → Endpoint (URL) → Server (Route) → Database
             |                |
             |----- HTTP -----|
    ```

## 🏆 CORS

- ⚙️ Kỹ thuật _"cross-origin requests"_ từ **Frontend**:
  - ?!

## JSON ➡️ Object

- 🧐 `(req.body)`
  - ?!

- ⚙️ Kỹ thuật _"parse request body"_ cho **Form Data**:
  - ?!

- 🧐 `JSON` và `URL-Encoded`
  - ?!

## 🏆 HTTP

- ⚙️ Các kỹ thuật _"log request HTTP"_:

  ```
  1️⃣ Method
  2️⃣ URL
  3️⃣ Status Code
  4️⃣ Response Time
  ```

  - ?!

- 🔐 Bảo mật `HTTP Header` và các cuộc _"tấn công mạng"_ 🐞:

  ```
  1️⃣ XSS
  2️⃣ ClickJacking
  3️⃣ Sniffing
  …
  ```

  - ?!

## ‼️ File/Folder Recursive

?!

## 🏆 API

- `Postman` 👉 phần mềm (app) dùng để test và quản lý `API`.
  - 📌 Chức năng chính:
    - _Gửi "request"_ (`GET`, `POST`, `PUT`, `DELETE…`) đến **Server**.
    - Thêm `header`, `body`, `token` dễ dàng.
    - _Nhìn thấy "response"_ (`status code`, `JSON`, `headers`).
    - Lưu lại _"request"_ thành **collection** để quản lý & chia sẻ với team.
    - Hỗ trợ <u>automation test</u> và <u>mock server</u>.
  - 👉 Nói ngắn gọn: `Postman` = công cụ trực quan để test `API`, thay vì phải gõ `curl` trong **Terminal**.

- `CRUD` 👉 viết tắt của <u>4 thao tác cơ bản</u> khi làm việc với `Database/API`:
  - `C` – **Create** → tạo mới dữ liệu `(POST)`.
  - `R` – **Read** → đọc/lấy dữ liệu `(GET)`.
  - `U` – **Update** → cập nhật dữ liệu `(PUT/PATCH)`.
  - `D` – **Delete** → xóa dữ liệu `(DELETE)`.
  - 📌 Ví dụ với bảng _"users"_:
    - _"Create"_ → thêm user mới.
    - _"Read"_ → lấy danh sách user.
    - _"Update"_ → đổi tên user.
    - _"Delete"_ → xóa user.
  - 👉 `CRUD` = <u>4 chức năng cốt lõi</u> trong bất kỳ ứng dụng quản lý dữ liệu nào.

- `HTTP Method` 👉 là cách mà **Client** yêu cầu **Server** xử lý _"request"_.
  - 📌 Các _"method"_ chính:
    - `GET` → lấy dữ liệu _(read)_.
    - `POST` → tạo mới dữ liệu _(create)_.
    - `PUT` → cập nhật toàn bộ dữ liệu _(update)_.
    - `PATCH` → cập nhật một phần dữ liệu _(partial update)_.
    - `DELETE` → xóa dữ liệu _(delete)_.
  - 👉 Nói ngắn gọn: `HTTP Method` = hành động mà **Client** muốn **Server** thực hiện trên _"resource"_.

## Các Package hỗ trợ cho Back-End

- 💡 3 gói này giúp giai đoạn _"dev backend"_ nhanh, gọn, không bị lỗi **build** cũ, không phải **restart** thủ công, và dễ chạy nhiều **tool** cùng lúc.
  - `rimraf` → dọn build cũ để tránh lỗi.
  - `nodemon` → tự reload server khi code thay đổi.
  - `concurrently` → chạy nhiều tiến trình dev cùng lúc.

- 📌 Gói `rimraf`
  - ⚠️ Khi bạn <u>build code</u> **TypeScript** `(.ts)` → **Node.js** `(.tsc)`, <u>output</u> thường nằm trong thư mục `dist/`.
  - ❌ Nếu không xoá trước, các file cũ vẫn nằm lại → dễ gây lỗi.
  - ✅ `rimraf` giúp <u>clean</u> `dist/` trước mỗi lần **Build**, <u>đảm bảo thư mục build luôn sạch</u>.
  - 👉 Cấu hình trong _"script"_ cho **Build**:

    ```json
    "scripts": {
      "build": "rimraf dist && npx tsc"
    }
    ```

    - Khi nhập lệnh `npm run build`
      - 1️⃣ `rimraf dist` → <u>xoá thư mục build cũ</u> `(dist/)`.
      - 2️⃣ `npx tsc` → biên dịch **TypeScript** `(.ts)` trong thư mục `src/` sang **JavaScript** `(.js)` vào thư mục `(dist/)`.
      - ⭐️ Đảm bảo build sạch, không dính file rác cũ.

- 📌 Gói `nodemon`
  - ❌ Khi _"code server"_, bạn <u>thay đổi file</u> → **Node.js** <u>không tự reload</u>.
  - ⚠️ Phải dừng & chạy lại thủ công → rất mất thời gian.
  - ✅ `nodemon` sẽ _"watch"_ <u>file thay đổi</u> ➡️ <u>tự động restart server</u>.
- 📌 Gói `concurrently`
  - ⚠️ Khi _"dev"_ thường phải <u>chạy nhiều process cùng lúc</u>:
    - `Server Backend` (Node/Express/Nest).
    - `Database` (Docker, hoặc local Postgres).
    - `Tool` khác (ví dụ Prisma Studio, hay watch build).
  - ‼️ Nếu chạy thủ công từng `Terminal` thì bất tiện.
  - 💎 `concurrently` cho phép chạy nhiều lệnh song song trong 1 script.

- 👉 Cấu hình trong _"script"_ cho **Dev**:

  ```json
  "scripts": {
    "dev": "npm run build && concurrently \"npx tsc -w\" \"nodemon --exec ts-node src/index.ts\""
  }
  ```

  - Khi nhập lệnh `npm run dev` (giai đoạn **DEV**)
    - 1️⃣ `npm run build` → build một lần đầu tiên để có `(dist/)` sẵn (đã thêm tự _"clean"_ thư mục build cũ).
    - 2️⃣ `concurrently` chạy song song 2 tiến trình:
      - `"npx tsc -w"` → chạy **TypeScript Compiler** ở _"watch mode"_ (tự _"build"_ sang **JS** khi bạn sửa code).
      - `"nodemon --exec ts-node src/index.ts"` → dùng `ts-node` để chạy code **TypeScript** trực tiếp (tự restart khi bạn sửa file).
  - ⭐️ Tóm lại:
    - `tsc -w` ➡️ giữ cho thư mục `(dist/)` luôn update.
    - `nodemon` ➡️ chạy code **TypeScript** trực tiếp trong _"dev"_ (không cần _"build"_ lại thủ công).

- 🏆 3 package này `(rimraf + nodemon + concurrently)` đã hỗ trợ rất nhiều trong giai đoạn _"dev"_ cho **Back-End**.
  - 👉🏻 Cuối cùng là giai đoạn _"production"_ với cấu hình trong _"script"_ cho **Start**:
    ```json
    "scripts": {
      "start": "npm run build && node dist/index.js"
    }
    ```
  - 👉🏻 Khi nhập lệnh `npm start`
    - `npm run build` ➡️ <u>build lại</u> code trước (đã kèm tính năng tự động _"clean"_ thư mục build cũ).
    - `node dist/index.js` ➡️ <u>chạy server</u> bằng **Node.js** từ code đã build.
    - ⚠️ Đây là lệnh dùng trong _"production"_ (không dùng **TypeScript** trực tiếp nữa).

## Một số lệnh NPM test Server:

- Trong giai đoạn _"dev"_:
  - ➡️ Lệnh `npm run dev`
    - 📌 Kết quả (mẫu):
      ```
      Starting incremental compilation...
      [0]
      [0]
      [0] 12:04:52 AM - Found 0 errors. Watching for file changes.
      [1] [dotenv@17.2.1] injecting env (2) from .env -- tip: 📡 auto-backup env with Radar: https://dotenvx.com/radar
      [1] Server running on Port 8000
      [1] 127.0.0.1 - - [01/Sep/2025:17:05:04 +0000] "GET / HTTP/1.1" 200 18
      ```
  - ➡️ Lệnh `curl localhost:8000`
    - 📌 Ý nghĩa:
      - `curl` 👉 công cụ dòng lệnh để gửi **HTTP "request"**.
      - `localhost` 👉 địa chỉ máy local (tương ứng với `127.0.0.1`).
      - `:8000` 👉 cổng (port) mà server đang chạy.
    - ✍🏻 Lệnh này sẽ gửi **HTTP GET "request"** tới địa chỉ: `http://localhost:8000/`
    - 📌 Kết quả:
      - Nếu **Server Backend** (Express, NestJS, Django, …) <u>đang lắng nghe</u> trên **Port** 8000, bạn <u>sẽ nhận được _"response"_</u> (HTML, JSON, text…).
        ```
        This is Home Route%
        ```
      - Nếu không có **Server** hoặc **Server** chạy **Port** khác → báo lỗi _"Connection refused"_.
