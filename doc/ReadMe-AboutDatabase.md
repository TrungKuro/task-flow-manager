# Database PostgreSQL

- 🌐 `PostgreSQL` (hay gọi tắt là `Postgres`):
  - Là một **hệ quản trị cơ sở dữ liệu quan hệ** `(RDBMS)` mã nguồn mở, mạnh mẽ và phổ biến.
  - Nó dựa trên `SQL` để thao tác dữ liệu, nhưng hỗ trợ thêm nhiều tính năng nâng cao vượt trội so với `MySQL` hay `SQLite`.

- ⚡️ Đặc điểm nổi bật:
  - **Mã nguồn mở & miễn phí** → dùng thoải mái cho cá nhân, doanh nghiệp.
  - **ACID compliant** → đảm bảo tính nhất quán, an toàn dữ liệu.
  - **Hỗ trợ dữ liệu đa dạng**:
    - Kiểu dữ liệu cơ bản: `INT`, `TEXT`, `BOOLEAN`, `DATE`, `FLOAT`…
    - Kiểu dữ liệu nâng cao: `JSON/JSONB`, `ARRAY`, `UUID`, `HSTORE` (key-value), `Geospatial` (PostGIS).
    - Mở rộng linh hoạt:
      - Có thể viết `function` bằng nhiều ngôn ngữ: _"SQL, PL/pgSQL, Python, C, …"_
      - Hỗ trợ `index` nâng cao: _"B-Tree, Hash, GiST, GIN, BRIN"_
    - Tích hợp tốt cho hệ thống lớn:
      - **Replication** (sao chép dữ liệu giữa server).
      - **Partitioning** (chia bảng lớn thành bảng nhỏ).
      - **High availability** (HA).

- 📊 So sánh nhanh với `MySQL`:

  | Tiêu chí           | PostgreSQL 🚀                              | MySQL                             |
  | ------------------ | ------------------------------------------ | --------------------------------- |
  | Chuẩn SQL          | Chuẩn hơn                                  | Một số khác biệt                  |
  | Dữ liệu nâng cao   | JSONB, ARRAY, HSTORE, GIS mạnh             | JSON cơ bản, GIS yếu hơn          |
  | Transaction        | Rất mạnh (ACID)                            | Ổn nhưng hạn chế hơn              |
  | Mở rộng            | Hỗ trợ plugin, ngôn ngữ lập trình          | Ít mở rộng hơn                    |
  | Tốc độ             | Thường chậm hơn MySQL trong query đơn giản | Nhanh hơn với workload đơn giản   |
  | Enterprise support | Mạnh, dùng nhiều trong big data, fintech   | Phổ biến trong web app nhỏ/medium |

- 🛠️ Cách dùng cơ bản:
  - 1️⃣ Tạo database và bảng

  ```sql
  CREATE DATABASE mydb;

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

  - 2️⃣ Thêm dữ liệu

  ```sql
  INSERT INTO users (name, email) VALUES ('Trung', 'trung@example.com');
  ```

  - 3️⃣ Truy vấn dữ liệu

  ```sql
  SELECT id, name, email FROM users WHERE name = 'Trung';
  ```

  - 4️⃣ Cập nhật

  ```sql
  UPDATE users SET name = 'Hoang Trung' WHERE id = 1;
  ```

  - 5️⃣ Xoá

  ```sql
  DELETE FROM users WHERE id = 1;
  ```

## Config Database

- 🛠️ Các bước **Register Server** trong phần mềm `pgAdmin`
  - Mở **pgAdmin**
    - Khi mở lần đầu, **pgAdmin** sẽ yêu cầu đặt `Master Password` (dùng để lưu mật khẩu các server sau này).
    - Đây cũng chính _"pass"_ của `SuperUser` trong lúc cài đặt `PostgreSQL` phải tạo
    - Mặc định **SuperUser** tên là `postgres`
  - Thêm **Server** mới
    - Ở panel bên trái, chuột phải vào _“Servers”_ → chọn _“Register → Server…”_.
    - Điền thông tin kết nối:
      - 👉🏻 Tab General:
        - `Name`: đặt tên tuỳ ý, ví dụ: _"Local PostgreSQL"_
      - 👉🏻 Tab Connection
        - `Host name/address`: _"localhost"_ hoặc _"127.0.0.1"_
        - `Port`: _"5432"_ (mặc định **PostgreSQL**)
        - `Maintenance database`: _"postgres"_ (**Database** mặc định).
        - `Username`: user bạn muốn dùng (mặc định _"postgres"_).
        - `Password`: nhập password đã đặt cho user đó.

    ```
    Name:                 WebProject (Build for web app projects)
    Host Name:            localhost
    Port:                 8000
    Maintenance Database: postgres
    Username:             postgres
    Pass:                 [****]
    ```

    - Nhấn **[Save]**
      - ✅ Nếu thông tin đúng → thì **Server** sẽ xuất hiện trong sidebar.
      - ❌ Nếu báo lỗi khi Register `FATAL: password authentication failed` → sai mật khẩu hoặc user chưa được tạo.

  - 📌 Tips cho user mới
    - Dùng **user** `postgres` trước (là **SuperUser**), chắc chắn login được.
    - Sau đó mới tạo user riêng cho dự án:

    ```sql
    -- Tạo user mới (ROLE) với password `****` [DDMM]
    CREATE USER ht WITH PASSWORD 'yourpassword';

    -- Gán quyền cơ bản để user có thể tạo DB, login
    ALTER USER ht WITH CREATEDB LOGIN;
    ```

  - ⚙️ Tạo database cho user chỉ định
    ```sql
    -- Tạo database mới (Task Flow Manager Database) cho user này
    CREATE DATABASE tfmdb OWNER ht;
    GRANT ALL PRIVILEGES ON DATABASE tfmdb TO ht;
    ```

- 🗂️ Tạo thư mục `server` trong _"thư mục root"_ dự án
  - Tạo file `package.json` riêng cho **Server**

  ```bash
  npm init -y
  ```

  - Cài các gói sau vào `devDependencies`

  ```bash
  npm i -D ts-node typescript @types/node
  ```

  - Chạy `(tsc)` để tạo file `tsconfig.json`

  ```bash
  npx tsc --init
  ```

## Config `tsconfig.json`

- 🔗 [Compiler Options](https://www.typescriptlang.org/tsconfig/)
- Một số cấu hình cho _"compilerOptions"_:
  - 👉🏻 `Modules`:
    - 🔗 [Module](https://www.typescriptlang.org/tsconfig/#module)
      - ⭐️ `nodenext` is available from **TypeScript 4.7**, but its behavior changes with the latest stable versions of **Node.js**. `--module nodenext` implies the floating `--target esnext`.
      - ✅ _"module": "nodenext"_
      - 💎 Quy định <u>cách biên dịch **module**</u> `(import/export)`.
        - `nodenext` nghĩa là:
          - **TypeScript** sẽ tự động chọn **CommonJS** hay **ESM** dựa vào `(.ts/.mts/.cts)` và `package.json` "type" field.
          - Hữu ích khi **Node.js** project hỗn hợp `ESM (import ...)` và `CJS (require(...))`.
          - Nếu chỉ `"esnext"` thì chỉ cho **ESM**, chỉ `"commonjs"` thì chỉ cho **CJS**.
        - `nodenext` là chuẩn khuyến nghị cho **Node 16+**.
    - 🔗 [Module Resolution](https://www.typescriptlang.org/tsconfig/#moduleResolution)
      - ⭐️ Default: `nodenext` if _"module"_ is `nodenext`
      - ✅ _"moduleResolution": "nodenext"_
      - 💎 Quy định <u>cách **TypeScript** tìm **module**</u> khi bạn `(import)`.
    - 🔗 [Resolve JSON Module](https://www.typescriptlang.org/tsconfig/#resolveJsonModule)
      - ⭐️ **TypeScript** does not support resolving **JSON** files by default ➡️ Enabling the option allows importing **JSON**, and validating the types in that **JSON** file.
      - ✅ _"resolveJsonModule": true_
      - 💎 Cho phép <u>`import` trực tiếp file `(.json)`</u> như **module**</u>.
  - 👉🏻 `Language and Environment`:
    - 🔗 [Target](https://www.typescriptlang.org/tsconfig/#target)
      - ⭐️ Default: `esnext` if _"module"_ is `nodenext`
      - ✅ _"target": "esnext"_
      - 💎 Cho **TypeScript** biết nên <u>biên dịch code ra chuẩn `ECMAScript`</u> nào? ➡️ chọn `esnext` = build ra **JS** hiện đại nhất mà **TS** hỗ trợ.
  - 👉🏻 `Emit`:
    - 🔗 [Out Dir](https://www.typescriptlang.org/tsconfig/#outDir)
      - ⭐️ If not specified, `(.js)` files will be _"emitted"_ in the _"same directory"_ as the `(.ts)` files they were generated from:
        ```
        $ tsc
        example
        ├── index.js
        └── index.ts
        ```
      - ✅ _"outDir": "./dist"_
      - 💎 Chỉ định <u>thư mục chứa code đã biên dịch</u>. Khi chạy lệnh `npx tsc` thì toàn bộ file `(.ts)` trong `(src/)` ➡️ sẽ thành `(.js)` trong `(dist/)`.
        ```
        $ tsc
        example
        ├── dist
        │   └── index.js
        ├── index.ts
        └── tsconfig.json
        ```
  - 👉🏻 `Interop Constraints`:
    - 🔗 [ES Module Interop](https://www.typescriptlang.org/tsconfig/#esModuleInterop)
      - ⭐️ By default (with `esModuleInterop: false` or not set) **TypeScript** treats **CommonJS/AMD/UMD modules** similar to **ES6 modules** ➡️ But, default `true` if module is `nodenext`.
      - ✅ _"esModuleInterop": true_
      - 💎 Cho phép <u>`import default` từ **module CommonJS** như thể nó là **ES Module**</u>. Nếu không bật, bạn phải dùng `import * as ...` khi **import lib CommonJS**.
        ```ts
        // Nếu esModuleInterop: false
        import * as express from "express";
        // Nếu esModuleInterop: true
        import express from "express"; ✅
        ```
    - 🔗 [Force Consistent Casing In File Names](https://www.typescriptlang.org/tsconfig/#forceConsistentCasingInFileNames)
      - ⭐️ Default `true`. When this option is set, **TypeScript** will issue an error if a program tries to include a file by a casing different from the casing on disk.
      - ✅ _"forceConsistentCasingInFileNames": true_
      - 💎 Buộc <u>tên **file import** phải khớp chính xác _"chữ hoa/thường"_</u>.
        ```ts
        import { fn } from "./utils/helper"; // ❌ Sai casing
        import { fn } from "./utils/Helper"; // ✅ Đúng
        ```

  - 👉🏻 `Type Checking`:
    - 🔗 [Strict](https://www.typescriptlang.org/tsconfig/#strict)
      - ⭐️ The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness.
      - ✅ _"strict": true_
      - 💎 Bật **Strict Type-Checking Mode** (tập hợp nhiều rule nghiêm ngặt): Giúp code an toàn, ít bug nhưng đòi hỏi khai báo type rõ ràng.
  - 👉🏻 `Completeness`:
    - 🔗 [Skip Lib Check](https://www.typescriptlang.org/tsconfig/#skipLibCheck)
      - ⭐️ Bỏ qua việc kiểm tra kiểu của các tệp khai báo.
      - ✅ _"skipLibCheck": true_
      - 💎 <u>Bỏ qua kiểm tra type</u> trong các file `(.d.ts)` của thư viện bên ngoài **(node_modules)**.
        - Giúp build nhanh hơn, tránh bị kẹt do xung đột type giữa lib.
        - Nhược điểm: có thể bỏ sót lỗi type trong lib.

- Cấu hình cho _"include"_:
  - 👉🏻 `src/**/*` → toàn bộ code **TS/TSX/JS** trong `(src/)`.
  - 👉🏻 `src/data/**/*.json` → import cả **JSON** (do đã bật `resolveJsonModule`).
  - 👉🏻 `prisma/**/*` → include **schema + client code của Prisma** (thường `schema.prisma`, **generated client**).
  - ‼️ Nếu không khai báo → mặc định chỉ include file `(.ts)` trong thư mục gốc.
  - 💎 Xác định file nào được **TypeScript** biên dịch/kiểm tra type.

## Package Database

- 🔗 [ts-node](https://www.npmjs.com/package/ts-node)
  - 👉🏻 Là một **TypeScript** execution engine cho **Node.js**
  - ⚡️ Chức năng chính:
    - Cho phép chạy trực tiếp file `(.ts)` **(TypeScript)** mà không cần build ra `(.js)` **(JavaScript)** trước bằng `tsc`
    - Tự động transpile _"TypeScript → JavaScript"_ rồi nạp vào **Node.js** runtime
    - Hữu ích cho development (chạy nhanh, test code, script)
- 🔗 [typescript](https://www.npmjs.com/package/typescript)
  - 👉🏻 **TypeScript** là ngôn ngữ lập trình mở rộng từ **JavaScript** + bộ công cụ compiler `(tsc)`.
  - ⚡️ Chức năng chính:
    - Cung cấp **TypeScript Compiler** `(tsc)` ➡️ Chuyển file `(.ts) / (.tsx)` thành **JavaScript** thuần để **Node.js** hoặc trình duyệt chạy được.
    - Kiểm tra kiểu **(Type Checking)** ➡️ Giúp phát hiện lỗi ngay khi code, trước khi chạy.
    - Hỗ trợ **IDE / Editor** ➡️ Cung cấp _"IntelliSense (gợi ý code)"_, autocomplete, go-to-definition… ➡️ Nhờ file `tsconfig.json`, bạn có thể cấu hình strict mode, target ES version, module system…
- 🔗 [@types/node](https://www.npmjs.com/package/@types/node)
  - 👉🏻 Là _"type definition (khai báo kiểu)"_ cho **Node.js**, dùng trong **TypeScript**.
  - ⚡️ Chức năng chính:
    - Giúp **TypeScript** hiểu được các `API` có sẵn của **Node.js** (fs, path, http, process, Buffer, …)
