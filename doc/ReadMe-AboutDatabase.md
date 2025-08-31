# 📊 Database PostgreSQL

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

## ⚙️ Config Database PostgreSQL

- ⚙️ Sau khi đã cài <u>phần mềm chính **PostgreSQL**</u> với các phần mềm hỗ trợ khác nên đi kèm như **pgAdmin**...
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
    Port:                 5432
    Maintenance Database: postgres
    Username:             postgres
    Pass:                 [@*********] (pass của SuperUser)
    ```

    - Nhấn **[Save]**
      - ✅ Nếu thông tin đúng → thì **Server** sẽ xuất hiện trong sidebar.
      - ❌ Nếu báo lỗi khi Register `FATAL: password authentication failed` → sai mật khẩu hoặc user chưa được tạo.

  - 📌 Tips cho user mới
    - Dùng **user** `postgres` trước (là **SuperUser**), chắc chắn login được.
    - Sau đó mới <u>tạo user riêng</u> cho dự án:

    ```sql
    -- Tạo user mới tên `HT` (ROLE) với password `****` [DDMM]
    CREATE USER ht WITH PASSWORD 'yourpassword';

    -- Gán quyền cơ bản để user này có thể tạo DB, login
    ALTER USER ht WITH CREATEDB LOGIN;
    ```

  - ⚙️ Tạo **Database** riêng cho **User** được chỉ định
    ```sql
    -- Tạo Database mới tên `TFMDB` (Task Flow Manager Database) cho user tên `HT`
    CREATE DATABASE tfmdb OWNER ht;
    GRANT ALL PRIVILEGES ON DATABASE tfmdb TO ht;
    ```

---

- 🗂️ Tạo thư mục `server` trong _"thư mục root"_ dự án
  - Tạo file `package.json` riêng cho **Server**

    ```bash
    npm init -y
    ```

  - Cấu hình _"script"_ ban đầu thường như sau:

    ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

    - Đây là _"script mặc định"_ khi bạn chạy `npm test`.
    - Do hiện tại chưa có _"test"_ (chưa setup test framework) nên nó chỉ in ra: `Error: no test specified`

- ⚙️ Cài các gói sau vào `devDependencies`

  ```bash
  npm i -D ts-node typescript @types/node
  ```

- ⚙️ Chạy `(tsc)` để tạo file `tsconfig.json`

  ```bash
  npx tsc --init
  ```

- ➡️ Sau đó thực hiện cấu hình cho file `tsconfig.json`...

---

- 🗂️ Trong thư mục `server`, cài các gói sau vào `dependencies`

  ```bash
  npm i prisma @prisma/client
  ```

- Khởi tạo **Prisma** trong project (cụ thể là trong thư mục _"server"_)

  ```bash
  npx prisma init
  ```

  - 1️⃣ Khởi tạo cấu hình **Prisma**:
    - Tạo thư mục _"prisma/"_ chứa file `schema.prisma` ✅ _(mô tả cấu trúc database)_.
    - Tạo file `(.env)` ở _"root" (của thư mục "server")_ (nếu chưa có) với biến môi trường:

      ```env
      DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
      ```

      - Trong đó:
        - `user` là _[HT]_
        - `password` là _"[****] (DDMM)"_
        - `localhost` là **HostName/Address** của **Server** (đây là giá trị mặc định ~ có thể thay đổi được)
          - 👉🏻 Là <u>tên miền đặc biệt</u> _"trỏ về máy tính của chính bạn"_.
          - 💎 Nó tương ứng với địa chỉ `IP 127.0.0.1` trong `IPv4` (và `::1` trong `IPv6`).
        - `5432` là **Port** của (đây là giá trị mặc định ~ có thể thay đổi được)
          - 👉🏻 Là cổng mặc định của **PostgreSQL Server**.
            - Khi bạn khởi chạy **PostgreSQL**, nó sẽ _"lắng nghe (listen)"_ kết nối **Client** tại **Port** này.
            - Nếu bạn không chỉ định **Port** khi kết nối, _PostgreSQL client (psql, Prisma, pgAdmin…)_ sẽ <u>tự động dùng 5432</u>.
          - 💎 Nó được `IANA (Internet Assigned Numbers Authority)` <u>đăng ký làm cổng mặc định</u> cho **PostgreSQL**.
            - Giúp các tool / driver DB tự biết phải kết nối cổng nào.
            - Tương tự:
              - `MySQL → 3306`
              - `MongoDB → 27017`
              - `HTTP → 80`
              - `HTTPS → 443`
        - `mydb` là **Database**, cụ thể _"[TFMDB]"_

    - ‼️ Bạn cần phải chỉnh sửa lại `DATABASE_URL` cho đúng với **Database** của bạn hiện có (như vậy project _"server"_ này mới liên kết được **DB**).
      - Nếu bạn chưa có **Database** riêng, **Prisma** cũng hỗ trợ <u>format riêng</u> ngoài <u>format gốc</u> cho **PostgreSQL** `(postgresql://...)`.
      - Với _"connection string"_ kiểu `(prisma+postgres://...)`, đây là định dạng đặc biệt do **Prisma** <u>tự tạo ra</u>, dùng khi bạn chạy **Prisma** với **Prisma Data Proxy / Prisma Accelerate** hoặc khi _"dev"_ với lệnh `prisma dev`.
      - Khi bạn dùng dạng này:
        - **Prisma** sẽ tạo một _"database ảo tạm thời" (sandbox)_ để `test` hoặc chạy `migration`.
        - **Database** này không cần bạn cài **PostgreSQL** thủ công.
        - Thường dùng khi bạn <u>chưa có database</u> thật hoặc muốn chạy nhanh trong <u>môi trường dev/test</u>.

  - ‼️ Tạo file `.gitignore`
    - Cho **Git** biết file/thư mục nào không nên được theo dõi (track) và không _"commit"_ lên **Repo**.
    - Với **Next.js**, nó đã tự động sinh ra file `.gitignore` ở _"root"_ với cấu hình mặc định để loại bỏ những thứ không nên commit.

    ```.gitignore
    # Bỏ qua thư mục node_modules/
    # - Đây là nơi chứa toàn bộ package được cài bằng npm hoặc yarn.
    # - Rất nặng và có thể được cài lại từ package.json → không cần đưa lên Git.
    node_modules

    # Keep environment variables out of version control
    # - File này chứa biến môi trường (DB password, API key, token…).
    # - Nếu push lên GitHub sẽ lộ thông tin nhạy cảm → nguy hiểm bảo mật.
    .env

    # Bỏ qua thư mục /generated/prisma
    # - Có thể là thư mục sinh ra tự động (autogenerated code, ví dụ Prisma Client hoặc type).
    # Không cần version control vì có thể generate lại từ schema.
    /generated/prisma
    ```

  - 2️⃣ Thiết lập môi trường kết nối **Database**:
    - File `schema.prisma` mặc định cấu hình kết nối đến **DB** (<u>PostgreSQL mặc định</u>, nhưng có thể đổi).
    - Bạn chỉnh `provider` ✅ _(postgresql, mysql, sqlite, mongodb, sqlserver)_.

  - 3️⃣ Chuẩn bị để **Generate Prisma Client**:
    - ‼️ Sau khi chỉnh sửa `schema.prisma` + đã thêm các **Model**, 👉🏻 chạy lệnh: `npx prisma generate`.
    - ✅ Sinh ra code trong `./node_modules/@prisma/client` (bản cũ) để <u>query DB</u>.
      - Đây là <u>default output</u> (cách cũ, vẫn phổ biến).
      - Khi cần import code dùng câu lệnh này: `import { PrismaClient } from "@prisma/client";`
    - ⚠️ Tuy nhiên trong `schema.prisma` bản mới:

      ```schema.prisma
      generator client {
        provider = "prisma-client-js"
        output   = "../generated/prisma"
      }
      ```

      - Ở đây, `output` đã được _"custom"_.
      - Nghĩa là thay vì nhét code vào thư mục `node_modules`, **Prisma** sẽ _"generate"_ ra thư mục riêng.
      - Khi cần import code dùng câu lệnh này: `import { PrismaClient } from "../generated/prisma";`

  - 4️⃣ **Run "prisma migrate dev" to migrate your local Prisma Postgres database.**
    - Lệnh `npx prisma migrate dev`:
      - 👉 Chức năng:
        - So sánh `schema.prisma` <u>hiện tại</u> với _"lịch sử migration"_ trước đó.
        - Tự động tạo _"migration mới"_ (SQL file) nếu có thay đổi.
        - Áp dụng _"migration"_ đó lên **Database Local** (Postgres/MySQL/SQLite…).
        - Đồng thời chạy `prisma generate` để <u>cập nhật lại</u> **Prisma Client** theo _"schema mới"_.
      - 💡 Dùng trong quá trình phát triển (development).
      - ✅ Nên dùng thêm _"flag"_ `--name` để _"đặt tên migration"_ đó, giúp bạn biết _"migration"_ này dùng để làm gì 🧐
        - Lần đầu khởi tạo **DB** từ `schema` → nên dùng: `npx prisma migrate dev --name init`
        - Sau này mỗi lần thay đổi `schema` (thêm bảng, field mới…) → dùng: `npx prisma migrate dev --name add-task-comments`
    - 💎 `Migration` = <u>lịch sử thay đổi cấu trúc DB</u> (**Prisma** quản lý giúp bạn).

  - 5️⃣ Với lần đầu khởi tạo **DB** từ `schema` với _"migration"_ có tên _"init"_.
    - Chạy tiếp lệnh `npm run seed` để tạo data mẫu từ `JSON` vào **DB** của bạn.
    - ⚠️ Lưu ý đây là _"script tùy chỉnh"_ của riêng bạn, giúp tạo 💎 `Mock Seed Data` cho **DB**.
    - ‼️ Nếu `Terminal` phản hồi như sau, tức đoạn _"script"_ đã chạy thành công.
      ```
      Cleared data from Team
      Cleared data from Project
      Cleared data from ProjectTeam
      Cleared data from User
      Cleared data from Task
      Cleared data from Attachment
      Cleared data from Comment
      Cleared data from TaskAssignment
      Seeded team with data from team.json
      Seeded project with data from project.json
      Seeded projectTeam with data from projectTeam.json
      Seeded user with data from user.json
      Seeded task with data from task.json
      Seeded attachment with data from attachment.json
      Seeded comment with data from comment.json
      Seeded taskAssignment with data from taskAssignment.json
      ```
    - ✅ Cuối cùng vào phần mềm `pgAdmin` truy cập đường dẫn: `'name_server' > 'name_db' > 'Schemas' > 'public' > 'Tables' > ...` để kiểm tra data đã thêm thành công vào **DB** chưa 🧐

## ⚙️ Config `tsconfig.json`

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

## 🔗 Package Database

- Cài ở `devDependencies`:
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
- Cài ở `dependencies`:
  - 🔗 [prisma](https://www.npmjs.com/package/prisma)
    - 👉🏻 Là `ORM (Object Relational Mapper)` hiện đại cho **Node.js** & **TypeScript** 🚀.
    - 🔹 Vì sao nhiều người chọn `prisma`?
      - An toàn với **TypeScript** _type-safe (autocomplete + kiểm lỗi compile-time)_.
      - Nhanh hơn viết `raw SQL`.
      - Tự động `generate client code` → giảm lỗi, tăng năng suất.
      - Hỗ trợ nhiều **DB** _(Postgres, MySQL, SQLite, SQL Server, MongoDB)_.
    - 💎 Cung cấp <u>công cụ CLI</u> `(schema, migrate, generate)`. Không import vào code.
  - 🔗 [@prisma/client](https://www.npmjs.com/package/@prisma/client)
    - 👉🏻 Là thư viện runtime (dùng trong code để <u>query DB</u>).

# ⭐️ Prisma

- 🔹 Chức năng chính của **Package Prisma**
  - 1️⃣ Quản lý `database schema`:
    - Bạn định nghĩa <u>cấu trúc database</u> (model, bảng, quan hệ) trong file `schema.prisma`.
    - **Prisma** dịch ra `migrations SQL` để tạo/chỉnh sửa **DB** thật _(PostgreSQL, MySQL, MongoDB, SQLite...)_.
  - 2️⃣ Sinh `Prisma Client` (code tự động):
    - Từ `schema.prisma`, **Prisma** sinh ra một **Client TypeScript/JavaScript**.
    - Bạn có thể dùng **Client** này để _"query DB"_ bằng code an toàn (có type, autocomplete).
  - 3️⃣ **Migration** & quản lý **Version Database**:
    - Lệnh `npx prisma migrate dev` tạo `migration file` → 💎 giúp <u>đồng bộ</u> **schema** với **DB**.
    - Giúp dễ dàng _"rollback"_ hoặc _"deploy"_ `database schema` theo **Version**.
  - 4️⃣ `Prisma Studio`:
    - Giao diện web để xem/sửa dữ liệu trong **DB** trực quan (lệnh `npx prisma studio`).

- ✅ Trong khi `prisma` (package CLI) lo việc <u>quản lý schema + migrate + generate code</u>, thì `@prisma/client` chính là thư viện bạn <u>import vào code để thao tác DB</u>.

- 🔹 Chức năng `@prisma/client`:
  - 1️⃣ **Prisma Client** (**ORM** được generate từ `schema.prisma`)
    - Sau khi chạy `npx prisma generate`, **Prisma** <u>tạo ra code</u> trong _"node_modules/@prisma/client"_.
    - Bạn **import** nó vào **project** để _"query DB"_ bằng **TypeScript/JavaScript**.
  - 2️⃣ `Type-safe API` (tự động sinh type)
    - `@prisma/client` tự sinh type dựa trên `schema.prisma`.
    - Ví dụ:
      - Nếu bạn có _"bảng User"_ thì **Prisma Client** sẽ có sẵn `prisma.user` với type an toàn.
    - IDE hỗ trợ autocomplete rất mạnh.
  - 3️⃣ <u>Kết nối database</u> 💎
    - **Prisma Client** dùng _"config"_ từ `.env (DATABASE_URL)`.
    - Quản lý kết nối DB tối ưu (pooling).
  - 4️⃣ `CRUD` + **Query** nâng cao
    - Hỗ trợ _"findUnique, findMany, create, update, delete, count, aggregate, groupBy…"_
    - Có thể <u>query quan hệ</u> `(include, select)`.

## 🏆 CRUD

?!

## 💎 Mock Seed Data

- ✅ Cách cung cấp **Mock Seed Data** cho ứng dụng:
  - 👉🏻 <u>Tạo thủ công</u> thêm một thư mục `seedData` trong thư mục `prisma`.
    - Thêm các file `JSON` (chứa _"hạt giống dữ liệu giả"_ ban đầu của ứng dụng) vào thư mục `seedData`.
  - 👉🏻 Tương tự <u>tạo thủ công</u> thêm một file `seed.ts` trong thư mục `prisma`.
    - Đây là _"file script"_ có chức năng _"seed (tạo dữ liệu mẫu"_) cho **Database** thông qua `Prisma ORM`
    - `Script` này sẽ xóa toàn bộ dữ liệu cũ và **import** dữ liệu mới từ các file `JSON`
    - Thường được chạy trong quá trình _"development"_ hoặc _"setup database"_ ban đầu

- ‼️ Thêm đoạn cấu hình này vào `package.json` của project _"server"_

  ```json
  "scripts": {
    // ...,
    "seed": "ts-node prisma/seed.ts"
  },
  ```

  - Khi chạy `npm run seed` → thực thi file _"prisma/seed.ts"_ bằng `ts-node`.
  - `ts-node` cho phép chạy file **TypeScript** trực tiếp (không cần build sang **JavaScript** trước).
  - 👉 Chạy _"script"_ `seed.ts` → **Database** sẽ được làm sạch & nạp dữ liệu mẫu từ `JSON`.

## ⚙️ Config `schema.prisma`

- ‼️ Sau khi chạy lệnh `npx prisma init`, giúp khởi tạo **Prisma**, với cấu hình mặc định ban đầu của `schema.prisma` ➡️ Bạn cần thêm vào cấu hình các **Model** trước khi chạy lệnh `npx prisma generate`, để tạo **Prisma Client**, giúp <u>query DB</u>.

- 💎 Danh sách các **Model** sử dụng cho ứng dụng:

  ```
  1. User
  2. Team
  3. Project
  4. ProjectTeam
  5. Task
  6. TaskAssignment
  7. Attachment
  8. Comment
  ```

---

- 📌 Các **Model chính** trong hệ thống:
  - 1️⃣ `User`
    - 👉🏻 _"Người dùng hệ thống."_
      - `userId` (PK).
    - Thuộc về 1 `Team` _(teamId)_.
    - Có thể là _"author"_ hoặc _"assignedUser"_ của `Task`.
  - 2️⃣ `Team`
    - 👉🏻 _"Nhóm người dùng."_
      - `id` (PK).
    - Có nhiều `User`.
    - Có thể gắn với nhiều `Project` thông qua bảng trung gian `ProjectTeam`.
    - Có <u>2 role đặc biệt</u>:
      - _"productOwnerUserId"_
      - _"projectManagerUserId"_
  - 3️⃣ `Project`
    - 👉🏻 _"Dự án cụ thể."_
      - `id` (PK).
    - Có nhiều `Task`.
    - Liên kết với nhiều `Team` (qua `ProjectTeam`).
  - 4️⃣ `Task`
    - 👉🏻 _"Công việc trong dự án."_
      - `id` (PK).
    - Thuộc về 1 `Project` _(projectId)_.
    - Có _"authorUserId"_ (người tạo).
    - Có _"assignedUserId"_ (người được giao).
    - Có thể có nhiều `Comment`, `Attachment`.
    - Quan hệ 'multi-multi' với `User` qua `TaskAssignment`.

- 📌 Các **Table trung gian & phụ**:
  - 1️⃣ `ProjectTeam`
    - 👉🏻 _"Quan hệ 'multi-multi' giữa Project và Team."_
    - Mỗi bản ghi = 1 `Team` tham gia vào 1 `Project`.
  - 2️⃣ `TaskAssignment`
    - 👉🏻 _"Quan hệ 'multi-multi' giữa Task và User."_
    - Cho phép 1 `Task` có nhiều `User` tham gia (ngoài _"assignedUserId"_ chính).
  - 3️⃣ `Comment`
    - 👉🏻 _"Bình luận trên Task."_
    - _"userId"_ → người viết.
    - _"taskId"_ → thuộc về Task nào.
  - 4️⃣ `Attachment`
    - 👉🏻 _"File đính kèm của Task."_
    - _"taskId"_ → thuộc Task nào.
    - _"uploadedById"_ → User nào upload.

---

- 📌 Tóm tắt mối quan hệ:
  - `User` ↔️ `Team`: Nhiều `User` thuộc 1 `Team`.
  - `User` ↔️ `Task`:
    - 1 `User` có thể tạo `Task` (_"authorUserId"_).
    - 1 `User` có thể được giao `Task` (_"assignedUserId"_).
    - Ngoài ra `User` có thể tham gia `Task` qua <u>bảng</u> `TaskAssignment`.
  - `Task` ↔️ `Project`: Nhiều `Task` thuộc 1 `Project`.
  - `Team` ↔️ `Project`: Quan hệ _"multi-multi"_ qua `ProjectTeam`.
  - `Task` ↔️ `Comment`: 1 `Task` có nhiều `Comment` (`User` viết).
  - `Task` ↔️ `Attachment`: 1 `Task` có nhiều `Attachment` (`User` upload).

- 🎯 Hiểu nhanh:
  - `User` ↔ `Team`: mỗi người ở trong 1 team.
  - `Team` ↔ `Project`: team tham gia nhiều project, project có nhiều team.
  - `Project` ↔ `Task`: mỗi project có nhiều task.
  - `User` ↔ `Task`: user có thể là tác giả, được giao, hoặc tham gia task.
  - `Task` ↔ `Comment/Attachment`: task có comment, có file đính kèm.
