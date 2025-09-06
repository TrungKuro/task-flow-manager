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

## JSON ↔️ Object

- 🧐 `(req.body)`
  - 👉 Là dữ liệu mà **Client** gửi kèm trong phần _"body"_ của **HTTP Request**, thường dùng với:
    - **Create** - `(POST)`
    - **Update** - `(PATCH)`
    - **Update** _"all"_ - `(PUT)`
  - 👉 Nói ngắn gọn: `req.body` = dữ liệu _"payload"_ từ **Client** gửi lên **Server**.
- ‼️ Bên **Frontend** khi gửi dữ liệu qua `req.body` (thường bằng `fetch` hay `axios`) thì:
  - ✅ `Object JS` phải được chuyển thành` JSON string`
  - ⚠️ Phải kèm `header` _"Content-Type": "application/json"_ để **Server** hiểu dữ liệu là `JSON`.
  - 👉 Tóm gọn: **Frontend** phải `stringify` **Object** ➡️ **JSON** + set `Content-Type`, thì **Server** mới _"parse"_ ra `req.body` đúng dạng **Object**.

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

- `URL (Uniform Resource Locator)` 👉 là địa chỉ duy nhất để truy cập một tài nguyên trên **Internet**.
  - 📌 Cấu trúc cơ bản:

    ```
    protocol://hostname:port/path?query#fragment
    ```

    - 1️⃣ `protocol` → giao thức (`http`, `https`, …).
    - |
    - 2️⃣ `hostname` → tên miền hoặc `IP` (vd: `localhost`, _"google.com"_).
    - 2️⃣ `port` → cổng (mặc định `80` cho `http`, `443` cho `https`).
    - |
    - 3️⃣ `path` → đường dẫn đến tài nguyên (_"`/`users/1"_).
    - 3️⃣ `query` → tham số truyền kèm (_"`?`projectId`=`1"_).
    - 3️⃣ `fragment` → phần đánh dấu trong tài liệu (_"`#`section1"_).

  - 👉 Nói ngắn gọn: `URL` = _“địa chỉ đường đi”_ để **Client** tìm tới đúng tài nguyên trên **Server**.

- `Status Code` 👉 là mã số trong _"HTTP Response"_ để cho biết kết quả xử lý _"request"_ từ **Server**.
  - 📌 Các nhóm chính:
    - `1xx` → Thông tin _(info)_.
    - `2xx` → Thành công _(success)_, ví dụ `200 OK`, `201 Created`.
    - `3xx` → Chuyển hướng _(redirect)_, ví dụ `301 Moved Permanently`.
    - `4xx` → Lỗi phía **Slient**, ví dụ `400 Bad Request`, `401 Unauthorized`, `404 Not Found`.
    - `5xx` → Lỗi phía **Server**, ví dụ `500 Internal Server Error`.
  - 👉 Nói ngắn gọn: `Status Code` = _“thông báo kết quả”_ cho mỗi **Request HTTP**.

- `Response Time` ?!

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
      ```

  - ➡️ Lệnh `curl "localhost:8000"`
    - 📌 Ý nghĩa:
      - `curl` 👉 công cụ dòng lệnh để gửi **HTTP "request"**.
      - `localhost` 👉 địa chỉ máy local (tương ứng với `127.0.0.1`).
      - `:8000` 👉 cổng (port) mà server đang chạy.
    - ✍🏻 Lệnh này sẽ gửi **HTTP GET "request"** tới địa chỉ: `http://localhost:8000/`
    - 📌 Kết quả:
      - Nếu **Server Backend** (Express, NestJS, Django, …) <u>đang lắng nghe</u> trên **Port** 8000, bạn <u>sẽ nhận được _"response"_</u> (HTML, JSON, text…).
        ```
        Server : [1] 127.0.0.1 - - [01/Sep/2025:17:05:04 +0000] "GET / HTTP/1.1" 200 18
        Client : This is Home Route%
        ```
      - Nếu không có **Server** hoặc **Server** chạy **Port** khác → báo lỗi _"Connection refused"_.

---

- ‼️ **Command for resetting ID in Database**:
  - 💎 Câu lệnh này dùng để _"reset sequence"_ của <u>cột</u> `id` cho đồng bộ với dữ liệu thực tế trong <u>bảng</u>.
    - Nếu bạn đã <u>chèn thủ công dữ liệu</u> (vd: qua `Postman`) có `id` lớn hơn mà quên cập nhật **Sequence → Insert** tiếp sẽ bị lỗi _"duplicate key"_.
    - Lệnh này sẽ đảm bảo _"sequence"_ tiếp tục đếm từ `[max(id)+1]`.

  - 👉🏻 Trong phần mềm **PostgreSQL** ➡️ chọn đúng **Table** cần lấy _"sequence"_ ➡️ mở `Query Tool` và nhập đoạn code sau vào _"tab"_ `Query` ➡️ nhấn nút `Execute Script` ➡️ lúc này tại _"tab"_ `Data Output` sẽ hiện _"bảng setval (bigint)"_ với giá trị `id` cao nhất đã +1 để `Postman` dùng với phương thức `(POST)` ⚠️ Đừng save đoạn script này.

  ```sql
  SELECT setval(
    pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id'),
    coalesce(max(id)+1, 1),
    false
  )
  FROM "[DATA_MODEL_NAME_HERE]";
  ```

  - 📌 Ý nghĩa từng phần:
    - `pg_get_serial_sequence('"[DATA_MODEL_NAME_HERE]"', 'id')`
      - Lấy tên _"sequence"_ mà **PostgreSQL** đang dùng cho <u>cột</u> `id` của <u>bảng</u> `[DATA_MODEL_NAME_HERE]`.
      - _"sequence"_ = <u>bộ đếm auto-increment</u> trong **PostgreSQL** (tạo giá trị cho `SERIAL` hoặc `BIGSERIAL`).
    - `max(id)+1`
      - Tìm giá trị `id` lớn nhất hiện tại trong <u>bảng</u>, rồi cộng thêm 1.
      - Đây sẽ là giá trị tiếp theo mà _"sequence"_ nên bắt đầu.
      - ⚡️ Trường hợp <u>bảng rỗng</u> thì `max(id) = NULL`.
    - `coalesce(max(id)+1, 1)`
      - _"coalesce"_ chọn giá trị đầu tiên khác `NULL`.
      - Nếu <u>bảng</u> có dữ liệu → `max(id)+1`.
      - Nếu <u>bảng rỗng</u> → `1`.
    - `setval(sequence, value, false)`
      - Cập nhật _"sequence"_ về giá trị `value` (cũng chính là `coalesce(max(id)+1, 1)`).
      - Tham số `false` nghĩa là giá trị tiếp theo được tạo ra chính xác bằng `value` (nếu để `true` thì giá trị kế tiếp sẽ là `value+1`).

  - 🎯 Tóm gọn: Lệnh này = _"đồng bộ `sequence`" (auto-increment id)_ với dữ liệu hiện có trong <u>bảng</u> → tránh lỗi khi _"insert"_ tiếp.

### Route [projects]

🔗 `GET: /projects`

- ➡️ Lệnh `curl "localhost:8000/projects"`
  - 📌 Chức năng: trả về `JSON` chứa danh sách tất cả **Project** hiện có trong **DB**.

🔗 `POST: /projects + JSON`

- 🧐 Để tạo mới **Project** và lưu vào **DB**.
  - Cần sử dụng `Postman` để thực hiện phương thức **HTTP (POST)** cũng với **URL**: `localhost:8000/projects`
  - Và cung cấp một `body` (chứa `JSON` của **Project** mới) đi kèm phương thức `(POST)`

### Route [tasks]

🔗 `GET: /tasks?projectId=[id]`

- ➡️ Lệnh `curl "localhost:8000/tasks?projectId=[id]"`
  - 📌 Chức năng: trả về `JSON` chứa danh sách tất cả **Task** hiện có của **Project[id]** (nhập số `id`) trong **DB**.

🔗 `POST: /tasks + JSON`

- 🧐 Để tạo mới **Task** và lưu vào **DB**.
  - Cần sử dụng `Postman` để thực hiện phương thức **HTTP (POST)** với **URL**: `localhost:8000/tasks`
  - Và cung cấp một `body` (chứa `JSON` của **Task** mới) đi kèm phương thức `(POST)`

🔗 `PATCH: /tasks/[id]/status + JSON`

- 🧐 Để cập nhập giá trị mới cho cột `status` của bảng **Task[id]** (nhập số `id`) trong **DB**.
  - Cần sử dụng `Postman` để thực hiện phương thức **HTTP (PATCH)** với **URL**: `localhost:8000/tasks/[id]/status`
  - Và cung cấp một `body` (chứa `JSON` phần `status` của **Task** đó) đi kèm phương thức `(PATCH)`

🔗 `GET: /tasks/user/[userId]`

- ?!

### Route [search]

🔗 `GET: /search?query=[value]`

- ➡️ Lệnh `curl "localhost:8000/search?query=[value]"`
  - 📌 Chức năng: trả về `JSON` với mảng danh sách của **Task, Project, User**. Trong đó các phần tử trong mảng (nếu có) cho biết đấy là các **Object** mà **DB** <u>tìm thấy</u> khớp với _"yêu cầu truy vấn tìm kiếm"_ từ **Client**. Giá trị `value` chính là _"nội dung tìm kiếm"_ mà người dùng cung cấp.

### Route [user]

🔗 `GET: /users`

- ➡️ Lệnh `curl "localhost:8000/users"`
  - 📌 Chức năng: trả về `JSON` chứa danh sách tất cả **User** hiện có trong **DB**.

### Route [team]

🔗 `GET: /teams`

- ➡️ Lệnh `curl "localhost:8000/teams"`
  - 📌 Chức năng: trả về `JSON` chứa danh sách tất cả **Team** hiện có trong **DB**.
