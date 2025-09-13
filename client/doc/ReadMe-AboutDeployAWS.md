# AWS

```
AWS (Amazon Web Services):
- Là nền tảng CLOUD COMPUTING lớn nhất thế giới
- Cung cấp hạ tầng và dịch vụ như SERVER, STORAGE, DATABASE, AI, CI/CD, bảo mật…

Bạn có thể "deploy ứng dụng" từ nhỏ (web cá nhân) đến lớn (hệ thống doanh nghiệp).
```

- ✅ **Amazon Web Services**:
  - Get started:
    - _Step 1:_ Getting started
      - Sign up for an `AWS account`: Gain instant access to the `AWS Free Tier`.
    - _Step 2:_ `Console` 🎮 ➡️ `Sign in to console`
      - Start building in the console: Build your production solution quickly and easily once you're ready

- ‼️ Chú ý 2 loại tài khoản:
  - 1️⃣ `AWS Account`
  - 2️⃣ `AWS Builder ID`
    - Là một loại <u>tài khoản đăng nhập mới</u> của **AWS** (ra mắt cuối 2022 – 2023) bên cạnh `AWS Account` truyền thống.
    - Nó giống như `Google Account` / `GitHub Account`, dùng để <u>truy cập các dịch vụ</u> dành cho _"developer"_ của **AWS** mà không cần phải tạo full `AWS Account` (với _"billing"_, _"IAM"_ phức tạp).
  - ⚖️ Khác biệt với `AWS Account`:

    | Tiêu chí      | AWS Account                                   | AWS Builder ID                                                 |
    | ------------- | --------------------------------------------- | -------------------------------------------------------------- |
    | **Mục đích**  | Toàn bộ dịch vụ AWS (EC2, S3, RDS…)           | Các công cụ developer (CodeCatalyst, Skill Builder, re\:Post…) |
    | **Chi phí**   | Có thể phát sinh chi phí (dùng dịch vụ cloud) | Thường miễn phí, chỉ cho dev tools                             |
    | **Quản lý**   | Có root user, IAM, billing                    | Đăng nhập trực tiếp bằng email/social                          |
    | **Đối tượng** | Doanh nghiệp, production                      | Developer, học tập, thử nghiệm công cụ                         |

- 🧐 Dùng `AWS Builder ID` để làm gì?
  - Hiện tại, Builder ID dùng để đăng nhập các dịch vụ/dev tools như:
    - **AWS CodeCatalyst** (nền tảng dev & CI/CD cloud-native).
    - **AWS re:Post** (Q&A cộng đồng, kiểu như StackOverflow của AWS).
    - **AWS Skill Builder** (nền tảng học online của AWS).
    - **AWS Community Builders Program** (chương trình dành cho dev AWS).

- 🧐 Khi nào bạn cần `AWS Builder ID`?
  - Nếu bạn chỉ học, thử _"tool dev"_ hoặc tham gia <u>cộng đồng AWS</u> → chỉ cần `Builder ID`.
  - Nếu bạn muốn <u>deploy ứng dụng</u>, tạo `EC2/S3/RDS` → bắt buộc cần `AWS Account`.

## AWS Architecture Diagram

<img src="./AWS Architecture Diagram.png" alt="AWS Architecture Diagram" width="100%">

🔎 Đây là một kiến trúc điển hình để _"triển khai ứng dụng web"_ ➡️ `Frontend [Next.js] + Backend API [Node.js] + Database` trên **AWS**.

1. 👱🏻 **Người dùng (User / Client)**
   - Người dùng truy cập ứng dụng qua trình duyệt hoặc app.
   - _"Request"_ sẽ đi qua **Internet** → vào `AWS Cloud`.
2. 🌐 **Frontend (Next.js)**
   - `Amplify`: Nơi _"deploy frontend"_ (**Next.js** build _"SSG"_ hoặc _"SSR"_ hoặc ...).
   - `Amazon S3`: Có thể _"lưu trữ static assets"_ (hình ảnh, file, script) để giảm tải cho `Amplify`.
   - Khi user truy cập, frontend sẽ gọi `API` qua `API Gateway`.
3. 🚪 **API Gateway**
   - `Amazon API Gateway`: Là _"lớp trung gian"_ tiếp nhận request từ frontend → chuyển tiếp đến backend (`EC2`).
   - Lợi ích:
     - Bảo mật, throttling, logging.
     - Giúp frontend không gọi trực tiếp `EC2`.
     - Có thể tích hợp thêm xác thực qua `Cognito`.
4. 🫆 **Authentication**
   - `Amazon Cognito`: Dùng cho _"đăng nhập/đăng ký"_, _"quản lý user"_, cấp _"JWT token"_, ...
   - Khi user đăng nhập → token từ `Cognito` → gửi kèm trong API request → `API Gateway` kiểm tra → cho phép truy cập backend.
5. 📦 `Virtual Private Cloud (VPC)`
   - Toàn bộ backend (`EC2` + `RDS`) nằm trong một `VPC` (<u>mạng riêng trong **AWS**</u>).
   - `VPC` chia thành <u>2 loại</u> _"subnet"_:
     - 🔹 `Public Subnet`
       - Chứa `Amazon EC2` (backend API).
       - Có `VPC Internet Gateway` để `EC2` có thể nhận request từ ngoài Internet.
       - `Public Route Table` để định tuyến ra Internet.
     - 🔹 `Private Subnet`
       - Chứa `Amazon RDS` (database).
       - Database không public ra Internet → chỉ `EC2` trong `VPC` mới truy cập được.
       - Có route qua `VPC NAT Gateway` nếu `RDS` cần ra Internet (update, patch, ...).
6. 🔐 **Security**
   - Tường lửa <u>cấp instance</u> = `VPC NACL (Network Access Control List)`
     - `EC2`: mở _"cổng 80/443 (HTTP/HTTPS)"_ cho API.
     - `RDS`: chỉ cho phép `EC2` truy cập, không mở ra ngoài.
   - Tường lửa <u>cấp subnet</u> = `SG (Security Group)`
     - Quản lý traffic inbound/outbound.
7. 👉🏻 **Luồng hoạt động (Flow)**
   - User → truy cập ứng dụng (`Amplify Host` **Next.js**).
   - Next.js → gọi API qua `API Gateway`.
   - `API Gateway` → xác thực với `Cognito` (nếu có).
   - `API Gateway` → forward request đến `EC2` (backend).
   - `EC2` → query database trên `RDS` trong private subnet.
   - Response → trả ngược lại cho user qua `API Gateway` → frontend → hiển thị.
8. ✅ **Ưu điểm của kiến trúc này**
   - Bảo mật: DB trong private subnet, không lộ ra Internet.
   - Scalable: `Amplify` scale frontend tự động, `EC2` có thể gắn thêm load balancer.
   - Tách biệt rõ ràng: Frontend – API – Auth – Backend – DB.
   - Quản lý hiện đại: `API Gateway` giúp chuẩn hóa request, dễ mở rộng **[microservices]**.

---

- 🧐 Bộ 3 `SSG` vs `SSR` vs `CSR`
  - 🔹 `Static Site` - `SSG` (_"Static Site Generation"_)
    - Cách hoạt động: HTML được build sẵn khi deploy - _"HTML tĩnh"_.
    - Ví dụ: Blog cá nhân, landing page, docs.
    - Ưu điểm:
      - Siêu nhanh (**CDN** serve file tĩnh).
      - Rẻ, dễ scale.
    - Nhược điểm:
      - Nội dung khó thay đổi thường xuyên (phải rebuild).
  - 🔹 `SSR` (_"Server-Side Rendering"_)
    - Cách hoạt động: Mỗi request → server render _"HTML động"_ rồi trả về.
    - Ví dụ: E-commerce, dashboard, news feed.
    - Ưu điểm:
      - Dữ liệu luôn mới.
      - **SEO** tốt (bot thấy HTML ngay).
    - Nhược điểm:
      - Chậm hơn `SSG` (render mỗi request).
      - Tốn tài nguyên server.
  - 🔹 `CSR` (_"Client-Side Rendering"_)
    - Cách hoạt động: Server trả về 1 file _"HTML rỗng"_ + _"JS bundle"_ → Browser load xong mới render UI.
    - Ví dụ: `SPA (Single Page App)` như React/Vue app chạy trên Netlify/Vercel.
    - Ưu điểm:
      - Trải nghiệm mượt (`SPA`, không reload).
      - Logic UI chạy client, giảm tải server.
    - Nhược điểm:
      - **SEO** kém (bot thấy _"HTML rỗng"_).
      - Tốc độ load lần đầu chậm (_"JS bundle"_ to).

  - 📊 Bảng so sánh nhanh:

    | Tiêu chí        | **SSG** (Static)    | **SSR** (Server)          | **CSR** (Client)        |
    | --------------- | ------------------- | ------------------------- | ----------------------- |
    | **Render**      | Lúc build           | Mỗi request               | Trên client (browser)   |
    | **Tốc độ**      | 🚀 Nhanh nhất       | ⚡ Trung bình             | 🐢 Chậm lần đầu         |
    | **SEO**         | Tốt                 | Tốt                       | Kém nếu không prerender |
    | **Dữ liệu mới** | Không (cần rebuild) | Có (render động)          | Có (fetch API client)   |
    | **Chi phí**     | Rẻ (CDN)            | Đắt hơn (server cần chạy) | Rẻ (ít server)          |
    | **Use case**    | Blog, landing page  | E-commerce, dashboard     | SPA, app tương tác cao  |

    ```
    1️⃣ SSG → HTML "tĩnh" được tạo trước.
    Đặc điểm: Nội dung cố định, sinh ra sẵn từ trước (build-time).

    2️⃣ SSR → HTML "động" được tạo khi có request.
    Đặc điểm: Nội dung được server sinh ra mỗi lần request, có thể thay đổi theo user, thời gian, dữ liệu.

    3️⃣ CSR → HTML ban đầu "rỗng", browser chạy JS để render trên client.
    ```

  - ‼️ Chú ý: **HTML** đang nói là về toàn bộ `Document HTML`

    | Rendering | HTML ban đầu            | Ai tạo HTML cuối cùng? | SEO                             |
    | --------- | ----------------------- | ---------------------- | ------------------------------- |
    | **SSG**   | HTML tĩnh (build sẵn)   | Server (trước deploy)  | ✅ Tốt                          |
    | **SSR**   | HTML động (mỗi request) | Server (real-time)     | ✅ Tốt                          |
    | **CSR**   | HTML gần như trống      | Client (JS dựng)       | ❌ Kém (nếu không có prerender) |

- 🧐 `JWT Token`
  - ?!

- 🧐 `NACL` _(Network Access Control List)_
  - Là _"tường lửa cấp subnet"_ trong `VPC`.
  - Nó hoạt động ở <u>layer thấp hơn</u> `Security Group` (`SG` gắn với `EC2/RDS`, còn `NACL` gắn với `Subnet`).
  - Quy định <u>luồng traffic được phép hoặc bị chặn vào/ra</u> `Subnet`.
    - Tất cả _"instance"_ trong _"subnet"_ đó đều chịu tác động.
    - Có cả ✅ **Allow rules** và ✅ **Deny rules**.
  - Nó như _"danh sách đen"_ (`Blacklist`) cho những trang web (`IP` hoặc `Domain`) bên ngoài mà bạn không muốn cho truy cập vào `Subnet` này.

- 🧐 `SG` _(Security Group)_
  - Là _"tường lửa cấp instance"_ (hoặc _"resource"_).
  - Gắn trực tiếp vào `ENI (Elastic Network Interface)` của `EC2`, `RDS`, `Lambda` trong `VPC`…
  - Kiểm soát <u>luồng traffic inbound & outbound</u> của từng _"instance"_.
    - Chỉ có ✅ **Allow rules**, ❌ không có **Deny rules**.
    - Quản lý chi tiết hơn cho từng máy ảo hoặc <u>service</u>.

- 🧐 `CIDR`
  - ⁉️ `CIDR (Classless Inter-Domain Routing)` = _"Cách viết dải địa chỉ IP + subnet mask"_ trong một ký hiệu ngắn gọn.
    - Được dùng nhiều trong **mạng máy tính**, **định tuyến**, `AWS VPC`.
  - 🔹 Cấu trúc `CIDR`: `<IP address>/<prefix length>`
    - `IP address`: địa chỉ gốc của mạng.
    - `prefix length`: số bit dành cho **[network]** (phần còn lại cho **[host]**).
  - ➡️ Ví dụ: `192.168.0.0/24`
    - `/24` nghĩa là **24 bit (3 byte)** đầu cố định cho **[network]**.
    - **8 bit (1 byte)** cuối, với 256 địa chỉ, dành cho **[host]**.
    - Kết quả ta có <u>dải IP</u> = `192.168.0.0 → 192.168.0.255`.
      - Trong đó **[network]** <u>cố định</u> là `192.168.0`
      - Còn <u>phạm vi</u> **[host]** từ `.0` đến `.255`
  - ➡️ Một số ví dụ **CIDR**:
    ```
    10.0.0.0/16    → 65,536 IP = 16bit (từ 10.0.0.0 đến 10.0.255.255)
    172.16.0.0/20  → 4,096 IP = 12bit
    192.168.1.0/28 → 16 IP = 4bit
    ```
  - ✅ Ứng dụng **CIDR**:
    - Chia mạng (subnetting): tách mạng lớn thành nhiều mạng nhỏ.
    - Định tuyến Internet: giúp router giảm số lượng route cần lưu.
    - Cloud (AWS, GCP, Azure):
      - Khi tạo `VPC/Subnet`, bạn phải chọn `CIDR block` (vd: 10.0.0.0/16).
      - 💎 `CIDR` quyết định <u>bạn có bao nhiêu `IP private`</u> để gán cho các dịch vụ khác bên trong `VPC` của bạn như: _EC2, RDS…_
  - 🔑 Tóm gọn:
    - `CIDR` = _"cách viết gọn subnet mask"_.
    - Trên `AWS`: _“CIDR block”_ = <u>phạm vi `IP`</u> của `VPC/subnet`.

- 🧐 `Amazon Machine Image (AMI)`
  - ?!

- 🧐 `Proxy` vs `VPN`
  - 🔹 **Proxy** là gì?
    - `Proxy Server` = máy chủ trung gian giữa bạn và Internet.
    - Khi bạn truy cập web qua proxy:
      - Request của bạn đi đến proxy trước.
      - Proxy thay mặt bạn gửi request đến website.
      - Website trả dữ liệu về cho proxy.
      - Proxy chuyển lại dữ liệu cho bạn.
    - 👉 Proxy thường được dùng để:
      - Ẩn IP thật (website chỉ thấy IP proxy).
      - Bypass chặn nội dung (VD: chặn Facebook, proxy vẫn vào được).
      - Cache để tăng tốc (nhất là trong công ty).
  - 🔹 **VPN** là gì?
    - `VPN (Virtual Private Network)` = tạo đường hầm mã hóa (encrypted tunnel) giữa bạn và server VPN.
    - Toàn bộ traffic (không chỉ web mà cả app, email, game, API…) đi qua VPN → được mã hóa và gửi đến server VPN trước khi ra Internet.
    - 👉 VPN thường dùng để:
      - Ẩn danh + thay đổi vị trí địa lý (fake IP sang Mỹ, Nhật…).
      - Bảo mật khi dùng WiFi công cộng (dữ liệu bị mã hóa, hacker khó sniff).
      - Truy cập tài nguyên nội bộ (VD: nhân viên làm việc remote truy cập server công ty qua VPN).
  - 💎 Nói đơn giản:
    - `Proxy` = người trung gian chuyển lời nói giúp bạn (ẩn danh nhưng không che giấu nội dung).
    - `VPN` = vừa có người trung gian, vừa có “hộp đen” mã hóa thông điệp (người khác không hiểu bạn nói gì).

- 🧐 `Invoke URL`
  - Thực ra `Invoke URL` cũng chỉ là một loại `URL`, nhưng có sự khác biệt về ngữ cảnh sử dụng:
    - **URL (Uniform Resource Locator)**
      - → Khái niệm chung: đường dẫn để <u>truy cập tài nguyên</u> trên web (website, file, ảnh, API...).
      - Ví dụ:
        ```
        https://google.com (website)
        https://myapp.com/assets/logo.png (ảnh)
        ```
    - **Invoke URL**
      - → Là `URL` được sinh ra để `gọi (invoke)` một <u>dịch vụ hay API</u> sau khi bạn deploy.
      - → Thường thấy trong <u>môi trường cloud</u> (AWS API Gateway, Amplify, Lambda function URL...).
      - Ví dụ AWS API Gateway cấp cho bạn:
        ```
        https://abcd1234.execute-api.us-east-1.amazonaws.com/prod/
        ```
      - ✅ Đây không phải _URL “tĩnh”_ như website, mà là _URL chuyên dụng_ để gửi request tới `API Backend`.
  - 📌 Nói ngắn gọn:
    - `URL` = khái niệm chung.
    - `Invoke URL` = URL cụ thể, sinh ra bởi hệ thống cloud/service, để bạn gọi thực thi (invoke) API/service.

- 🧐 `Internet Gateway (IGW)` vs `API Gateway (APIGW)`
  - 🔹 **IGW**
    - Là cổng mạng giúp các tài nguyên trong `VPC` (ví dụ `EC2`) ra/vào Internet.
    - Khi bạn truy cập `http://[Public IPv4 address]`, request đi qua `Internet Gateway` để tới `EC2 Public IP`.
    - Nó không can thiệp vào request của bạn, chỉ giống như "cầu nối mạng", tức <u>xử lý request</u> HTTP/WS.
    - 👉 Tóm lại: `IGW` chỉ để connect mạng, không có tính năng nâng cao.
  - 🔹 **APIGW**
    - Là một dịch vụ _"application layer"_ của `AWS` để <u>quản lý request</u> HTTP/WS.
    - Nó không chỉ là cầu nối mà còn có nhiều chức năng quan trọng:
    - 💎 Các tính năng chính của `API Gateway`:
      - ✅ Routing: Điều hướng request đến Lambda, EC2, ECS, hay nhiều service backend khác nhau.
      - ✅ Authentication & Authorization: Tích hợp AWS Cognito, IAM, OAuth2 để kiểm soát ai được gọi API.
      - ✅ Rate limiting & Throttling: Giới hạn số request/giây để chống DDoS hoặc abuse.
      - ✅ Monitoring & Logging: Tích hợp CloudWatch để xem log, metrics, request count, error count.
      - ✅ Caching: Giảm tải backend bằng cách cache response.
      - ✅ Custom Domain + SSL: Bạn có thể expose API với tên miền riêng (api.myapp.com) thay vì IP.
      - ✅ Versioning: Quản lý nhiều version của API (v1, v2).
  - 🏆 Tóm lại:
    - `Internet Gateway` = cầu nối mạng `(network-level)`.
      - Khi không có `API Gateway`
      ```
      User (Browser) ➡️ Internet Gateway ➡️ EC2 (‼️ Public IP) ➡️ Database (RDS Private Subnet)
      ```
    - `API Gateway` = cửa chính có bảo vệ, kiểm soát, và quản lý traffic API `(application-level)`.
      - Khi có `API Gateway`
      ```
      User (Browser) ➡️ API Gateway (Public URL, HTTPS) ➡️ EC2 (‼️ Private Subnet, không cần Public IP) ➡️ Database (RDS Private Subnet)
      ```

## Các dịch vụ sử dụng cho `Web App`:

- 🔗 [What is the AWS `Command Line Interface`?](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)

- ✅ **Compute:**
  - 1️⃣ [`Amazon EC2`](https://aws.amazon.com/ec2/)
    - ➡️ Resizable compute capacity in the Cloud.
    - 🧐 `EC2` = `Elastic Compute Cloud` = `Backend`

- ✅ **Databases:**
  - 2️⃣ [`Amazon RDS`](https://aws.amazon.com/rds/)
    - ➡️ Managed Relational Database Service for MySQL, PostgreSQL, MariaDB, or SQL Server.
    - 🧐 `RDS` = `Relational Database Service` = `Database`.

- ✅ **Mobile:**
  - 3️⃣ [`AWS Amplify Hosting`](https://aws.amazon.com/amplify/hosting/)
    - ➡️ Fast, secure, and reliable hosting for modern web apps, powered by AWS Amplify.
    - 🧐 `Amplify` = dịch vụ _"triển khai & quản lý"_ web/app. Nó lo: build, deploy, CI/CD, auth, storage…
      - 🏡 `Hosting` (chủ nhà): nơi <u>web được lưu</u> và chạy (`Amplify`).
      - 🗺️ `Domain` (tên miền): <u>địa chỉ</u> để user truy cập vào web đã _"host"_ trên `Amplify`.
  - 4️⃣ [`Amazon API Gateway`](https://aws.amazon.com/api-gateway/)
    - ➡️ Publish, maintain, monitor, and secure APIs at any scale.
    - 🧐 `API Gateway` = a fully managed service = create `RESTful APIs` and `WebSocket APIs`.

- ✅ **Storage:**
  - 5️⃣ [`Amazon S3`](https://aws.amazon.com/s3/)
    - ➡️ Secure, durable, and scalable object storage infrastructure.
    - 🧐 `S3` = `Simple Storage Service` = `Storage`.

- ✅ **Security-Identity-Compliance:**
  - 6️⃣ [`Amazon Cognito`](https://aws.amazon.com/cognito/)
    - ➡️ Simple and Secure User Sign-Up, Sign-In, and Access Control.
    - 🔗 [`Authenticator`](https://ui.docs.amplify.aws/react/connected-components/authenticator)
    - 🔗 [Configure `Amplify` categories](https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/)

## Step-by-Step

1. Tạo `Budget`: để quản lý ngân sách riêng, giúp theo dõi chi phí và mức sử dụng **AWS** của bạn.
   - Name: _"My Zero-Spend Budget"_

### Cấu hình VPC:

1. Tạo `VPC`: cho phép bạn khởi chạy các tài nguyên **AWS** vào một _"mạng ảo"_ mà bạn đã xác định.
   - Name: _"tfm-vpc"_
   - IPv4 CIDR block: _"IPv4 CIDR manual input"_
   - IPv4 CIDR: `10.0.0.0/16`
     - ➡️ với 16 bit (2byte) = <u>2 số đầu cố định</u> là `[10.0.]` làm **[network]**
     - ➡️ còn lại 16 bit (2byte) = <u>2 số cuối tùy chọn</u> là `[10.0._._]` làm **[host]**
     - ➡️ có tất cả `65,536 IP` khác nhau mà dùng trong `VPC` này
   - IPv6 CIDR block: _"No IPv6 CIDR block"_
2. Tạo `Subnet`: tạo các _"mạng con"_ (là một <u>dải địa chỉ `IP` trong `VPC`</u> của bạn) cho mỗi `Availability Zone` trong `VPC`.
   - VPC ID: chọn `VPC` có tên _"tfm-vpc"_
   - ‼️ Mỗi `Subnet` là một phần mạng trong `VPC`, <u>bắt buộc</u> phải gán vào một `AZ (Availability Zone)` duy nhất.
     - Nếu chỉ tạo 1 `Subnet` → chọn bất kỳ `AZ` đều được.
     - Nếu tạo nhiều `Subnet` nên phân bổ vào nhiều `AZ` khác nhau.
   - 1️⃣ Mạng con <u>công khai</u> thứ nhất:
     - Name: _"tfm-public-subnet-1"_
     - Availability Zone: _"...-1a"_ ‼️
     - IPv4 VPC CIDR block: `10.0.0.0/16`
       - ➡️ bạn có tất cả `65,536 IPs` để dùng cho **[host]**
     - IPv4 subnet CIDR block: `10.0.0.0/24`
       - ➡️ trích ra `256 IPs` dùng với phạm vi từ `[10.0].(0).0` đến `[10.0].(0).255`
   - 2️⃣ Mạng con <u>riêng tư</u> thứ nhất:
     - Name: _"tfm-private-subnet-1"_
     - Availability Zone: _"...-1a"_ ‼️
     - IPv4 VPC CIDR block: `10.0.0.0/16`
       - ➡️ bạn có tất cả `65,536 IPs` để dùng cho **[host]**
     - IPv4 subnet CIDR block: `10.0.1.0/24`
       - ➡️ trích ra `256 IPs` dùng với phạm vi từ `[10.0].(1).0` đến `[10.0].(1).255`
   - 3️⃣ Mạng con <u>riêng tư</u> thứ hai:
     - Name: _"tfm-private-subnet-2"_
     - Availability Zone: _"...-1b"_ ‼️ dự phòng nếu _"...-1a"_ có sự cố ✅
     - IPv4 VPC CIDR block: `10.0.0.0/16`
       - ➡️ bạn có tất cả `65,536 IPs` để dùng cho **[host]**
     - IPv4 subnet CIDR block: `10.0.2.0/24`
       - ➡️ trích ra `256 IPs` dùng với phạm vi từ `[10.0].(2).0` đến `[10.0].(2).255`
3. Tạo `Internet Gateway`: để `VPC` của bạn có thể kết nối với **Internet** bên ngoài.
   - Name: _"tfm-internet-gateway"_ ➡️ sau đó cần phải `Attach to VPC` của bạn
4. Tạo `Route Table`: để xác định _"lưu lượng mạng" (network traffic)_ từ `Subnet` hoặc `Gateway` của bạn được chuyển hướng đến đâu.
   - 🧐 Mỗi khi tạo mới một `VPC`, mặc định nó sẽ có một `Main Route Table` là nơi mà tất cả `Subnet` bạn tạo đều sử dụng chung
     - ➡️ Tuy nhiên nếu muốn `Subnet "private"` được cách ly riêng `(bảo mật)`, ta cần thiết lập như sau...
     - Chú ý, ❌ bạn không được xóa `Main Route Table` này và nên ✅ đặt tên cho nó là _"main"_ thay vì mặc định
   - 1️⃣ Bảng lộ trình <u>công khai</u> thứ nhất:
     - Name: _"tfm-public-route-table-1"_
       - ➡️ Vào `Action` chọn Edit subnet associations: _"tfm-public-subnet-1"_
       - ‼️ Sau khi thiết lập kết nối với `Subnet`. Mặc định các `Route Table` này đều có `Target` là _"local"_ với `Destination` của `Subnet` liên kết (tức chỉ dành cho các <u>IP nội bộ</u> bên trong `VPC` này)
       - ✅ Cho nên với `Route Table "public"` bạn cần <u>thiết lập thêm</u> `Target` sang _"Internet Gateway"_ (để mở rộng các <u>IP được phép</u> truy cập)
       - ➡️ Vào `Edit Routes`:
         - Destination: `0.0.0.0/0` ✅ nghĩa là _"bất kì `IP` nào"_
         - Target: _"tfm-internet-gateway"_ ✅ đây là `VPC Internet Gateway`
   - 2️⃣ Bảng lộ trình <u>riêng tư</u> thứ nhất:
     - Name: _"tfm-private-route-table-1"_
       - ➡️ Vào `Action` chọn Edit subnet associations: _"tfm-private-subnet-1"_
   - 1️⃣ Bảng lộ trình <u>riêng tư</u> thứ hai:
     - Name: _"tfm-private-route-table-2"_
       - ➡️ Vào `Action` chọn Edit subnet associations: _"tfm-private-subnet-2"_

### Cấu hình EC2:

1. Vào `EC2 → Instances → Launch Instances`
2. Đặt tên **Backend**:
   - Name: _"tfm-ec2-backend"_
3. Chọn `AMI`:
   - Application and OS Images (Amazon Machine Image): `Amazon Linux` với ‼️ `Free tier eligible`
   - Key pair name - required : _"standard-key"_ ‼️ đây là 🔑 bạn đã tạo và lưu cẩn thận ở nơi kín đáo chỉ bạn biết.
     - Nếu chưa có 🔑 bấm vào `Create new key pair` để tạo
     - Key pair name: _"standard-key"_
     - Key pair type: `RSA`
     - Private key file format: `(.pem)` ➡️ _"For use with OpenSSH"_
     - ⚠️ When prompted, store the private key in a secure and accessible location on your computer. **You will need it later to connect to your instance.**
4. Network settings:
   - ✅ Allow `SSH` traffic from: Helps you connect to your instance ➡️ `Anywhere 0.0.0.0/0`
   - ✅ Allow `HTTPS` traffic from the internet: To set up an endpoint, for example when creating a web server
   - ✅ Allow `HTTP` traffic from the internet: To set up an endpoint, for example when creating a web server
   - Vào `Edit` để cấu hình chi tiết hơn:
     - VPC: _"tfm-vpc"_
     - Subnet: _"tfm-public-subnet-1"_
     - Auto-assign public IP: ✅ Enable
       - Nếu tùy chọn này `Enable` → **AWS** sẽ tự động gán cho `EC2` một _"Public IPv4 address"_ tạm thời.
       - Nếu tùy chọn này `Disable` → `EC2` chỉ có _"Private IP"_ (không thể truy cập trực tiếp từ **Internet**, trừ khi bạn <u>gán thủ công</u> `Elastic IP` hoặc dùng `NAT Gateway`).
     - Firewall (security groups): _"tfm-ec2-sg"_
     - Description: _"tfm-ec2-sg created..."_
5. Cuối cùng nhấn `Launch Instance` ... chờ cho tới khi khởi tạo **Backend** thành công
   - Vào **Backend** vừa tạo chọn `Connect`
   - Trong thẻ `EC2 Instance Connect`
     - Connection type: ✅ Connect using a Public IP: Connect using a public IPv4 or IPv6 address
   - Bấm nút `Connect` ... nếu kết nối **Backend** thành công ... sẽ được chuyển hướng tới trang, ví dụ:
     - PublicIPs: `23.115.222.60`
       - ➡️ Là <u>địa chỉ công khai</u> trên **Internet** của `EC2`
       - ‼️ Phải nằm trong phạm vi `CIDR` có `Target` _"Internet Gateway"_ mà bạn đã cấu hình cho _"tfm-public-subnet-1"_, cụ thể là bất kì `IP` nào
       - ➡️ Nhờ **Public IP**, **client** từ Internet (VD: máy bạn ở nhà, trình duyệt) mới kết nối `SSH/HTTP` trực tiếp đến **server** được.
       - ➡️ **Public IP** này có thể thay đổi khi bạn stop/start lại `EC2` (trừ khi bạn gán `Elastic IP` để cố định).
     - PrivateIPs: `10.0.0.101`
       - ➡️ Là <u>địa chỉ nội bộ</u> trong `VPC` của `EC2`
       - ‼️ Phải nằm trong phạm vi `CIDR` có `Target` _"local"_ mà bạn đã cấu hình cho _"tfm-public-subnet-1"_

     ```
       ,     #_
       ~\_  ####_        Amazon Linux 2023
       ~~  \_#####\
       ~~     \###|
       ~~       \#/ ___   https://aws.amazon.com/linux/amazon-linux-2023
       ~~       V~' '->
         ~~~         /
           ~~._.   _/
             _/ _/
           _/m/'
     [ec2-user@ip-10-0-0-107 ~]$
     ```

   - ‼️ **Connect to EC2 Instance via EC2 Instance Connect** ➡️ Trang này có giao diện `Termninal` cho phép bạn nhập lệnh `CLI` để điều khiển một máy tính khác, cụ thể đây là **Server Backend** _"tfm-ec2-backend"_.

6. **Install `Node Version Manager (nvm)` and `Node.js`**:
   - **Switch to superuser and install nvm:**

     ```
     sudo su - 💎
     ```

     ```
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     ```

   - **Activate nvm:**

     ```
     . ~/.nvm/nvm.sh
     ```

   - **Install the latest version of Node.js using nvm:**

     ```
     nvm install node
     ```

   - **Verify that Node.js and npm are installed:**

     ```
     node -v
     ```

     ```
     npm -v
     ```

7. Install Git
   - **Update the system and install Git:**

     ```
     sudo yum update -y
     ```

     ```
     sudo yum install git -y
     ```

   - **Check Git version:**

     ```
     git --version
     ```

   - **Clone your code repository from GitHub:**

     ```
     git clone [your-github-link] ‼️
     ```

   - **Navigate to the directory and install packages:**
     - ⚠️ Để thực hiện bước này thành công, mình cần đảm bảo **Repo Server Backend** đã test chạy thành công với `localhost` trong giai đoạn `DEV` với **Repo Client Frontend**.

       ```
       cd [your-name-repo] ‼️
       ```

       ```
       cd [../server/] ‼️
       ```

       ```
       npm i
       ```

       ```
       npm run dev 💎 (check)
       ```

     - ✅ Nếu server chạy thành công, kết quả có thể sẽ như sau:
       ```
       4:20:11 PM - Starting compilation in watch mode...
       [0]
       [0]
       [0] 4:20:16 PM - Found 0 errors. Watching for file changes.
       [1] [dotenv@17.2.2] injecting env (0) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
       [1] Server running on Port 3000
       ```
     - ⚠️ Chú ý **server** đang chạy với `Port 3000`, cấu hình này hiện tại khác hoàn toàn với `SG (Security Group)` của `EC2`:
     - `Inbound Rules`:
       - Port `443 (HTTPS)`
         - ➡️ cho phép client truy cập website qua HTTPS (mã hóa TLS/SSL).
         - ✅ thường mở 0.0.0.0/0 để client toàn cầu có thể vào web.
       - Port `22 (SSH)`
         - ➡️ cho phép kết nối SSH vào EC2 để quản trị (terminal).
         - ✅ thường chỉ nên mở từ IP của bạn, ❌ không nên mở 0.0.0.0/0 (ai cũng SSH được → dễ bị 💀 brute force).
       - Port `80 (HTTP)`
         - ➡️ cho phép client (trình duyệt) truy cập website qua HTTP (không mã hóa).
         - ✅ thường mở 0.0.0.0/0 (tất cả Internet).
     - ‼️ Bạn cần phải chuyển _"biến môi trường"_ trong **server** sang `80`.

   - **Create Env File and Port 80:**

     ```
     echo "PORT=80" > .env
     ```

   - **Start the application:**
     - ‼️ Nhập lệnh để kiểm tra đã đổi `Port` thành công chưa?

       ```
       npm run dev 💎 (double check)
       ```

     - ✅ Kết quả có thể sẽ như sau sẽ cho biết **server** đổi đúng `Port 80`:
       ```
       4:37:54 PM - Starting compilation in watch mode...
       [0]
       [0]
       [0] 4:37:59 PM - Found 0 errors. Watching for file changes.
       [1] [dotenv@17.2.2] injecting env (1) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
       [1] Server running on Port 80
       ```
     - Truy cập _"Instance"_ của `EC2`, tại mục `Public IPv4 address`:
       - Ví dụ: `23.115.222.60`
       - Trên trình duyệt của bạn nhập **(URL)**: `http://23.115.222.60/`
       - Nếu load ra trang có nội dung: _"This is Home Route"_ 🥳 bạn đã thiết lập server thành công

8. 💎 Install [`pm2`](https://pm2.keymetrics.io/) - Production Process Manager for Node.js
   - 🧐 What is `pm2`?
     - Đây là một _"process manager (trình quản lý tiến trình)"_ dành cho `Node.js` (và có thể dùng cho các `script` khác).
     - Nó giúp ứng dụng chạy ổn định, không bị dừng khi `Terminal` đóng hoặc `Server Restart`.
   - 1️⃣ **Install pm2 globally:**

     ```
     npm i pm2 -g
     ```

   - 2️⃣ **Create a pm2 ecosystem configuration file (inside server directory):**

     ```
     module.exports = { apps : [{ name: 'inventory-management', script: 'npm', args: 'run dev', env: { NODE_ENV: 'development', ENV_VAR1: 'environment-variable', } }], };
     ```

   - 3️⃣ **Modify the ecosystem file if necessary:**

     ```
     nano ecosystem.config.js
     ```

     - Example: `ecosystem.config.js`
       ```js
       module.exports = {
         apps: [
           {
             name: "project-management",
             script: "npm",
             args: "run dev",
             env: {
               NODE_ENV: "development",
             },
           },
         ],
       };
       ```

   - ‼️ **Set pm2 to restart automatically on system reboot:**

     ```
     sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
     ```

   - ✅ **Start the application using the pm2 ecosystem configuration:**

     ```
     pm2 start ecosystem.config.js
     ```

   - ✅ **Useful pm2 commands:**
     - **Stop all processes:**

       ```
       pm2 stop all
       ```

     - **Delete all processes:**

       ```
       pm2 delete all
       ```

     - **Check status of processes:**

       ```
       pm2 status
       ```

     - **Monitor processes:**
       ```
       pm2 monit
       ```

### Cấu hình RDS:

1. Vào `Aurora and RDS → Databases → Create Database`
2. Chọn các thiết lập sau:
   - ➡️ Choose a database creation method: `Standard create`
   - ➡️ Engine options: `PostgreSQL`
   - ➡️ Templates: `Free tier`
   - ➡️ Availability and durability: `Single-AZ DB instance deployment (1 instance)`
   - ➡️ Settings:
     - DB instance identifier: _"tfm-rds"_
     - Master username: _"postgres"_ ✅ (mặc định)
     - Credentials management: `Self managed`
     - Master password: ⚠️ (tùy bạn)
   - ➡️ Storage:
     - Storage autoscaling: ❌ `Enable storage autoscaling`
   - ➡️ Connectivity:
     - Compute resource: `Don’t connect to an EC2 compute resource`
     - Network type: `IPv4`
     - Virtual private cloud (VPC): _"tfm-vpc"_
     - DB subnet group: `Create new DB Subnet Group`
     - Public access: `No`
     - VPC security group (firewall): `Create new`
     - New VPC security group name: _"tfm-rds-sg"_
     - Availability Zone: _"...-1a"_
   - ➡️ Monitoring:
     - Performance Insights: ❌ `Enable Performance insights`
   - ➡️ Additional configuration:
     - Database options → Initial database name: _"taskflowmanager"_
     - Backup:
       - ❌ `Enable automated backups`
       - ❌ `Enable encryption`
     - Maintenance: ❌ `Enable auto minor version upgrade`
3. Create database
4. Thiết lập thêm **Rule Inbound** cho **Database**
   - Vào **DB** _"tfm-rds"_ chọn `Connectivity & security → Security → VPC security groups` chọn _"tfm-rds-sg"_
   - Chọn `Edit inbound rules → Add rule`:
     - Type: `PostgreSQL`
     - Source: _"tfm-ec2-sg"_ (Security Groups) ‼️
5. Thiết lập thêm **Rule Outbound** cho **Backend**
   - Vào `EC2` _"tfm-ec2-backend"_ chọn `Security → Security groups` chọn _"tfm-ec2-sg"_
   - Chọn `Edit outbound rules → Add rule`:
     - Type: `PostgreSQL`
     - Source: _"tfm-rds-sg"_ (Security Groups) ‼️
6. Nhập các lệnh sau trong **Terminal** của `EC2`:
   - Delete all processes (if having):
     ```
     pm2 delete all
     ```
   - Open Env File to edit:

     ```
     nano .env
     ```

   - Cập nhập thêm `DATABASE_URL` để **Server Backend** `(EC2)` - _"tfm-ec2-backend"_ kết nối được với Database `(RDS)` - _"tfm-rds"_, theo cấu trúc sau:

     ```
     PORT=[number_IANA]

     DATABASE_URL="postgresql://[user_name]:[pass]@[end_point]:[port]/[database_name]?schema=public"
     ```

   - Trong đó:
     - `[user_name]`: _"postgres"_
     - `[pass]`: ⚠️
     - `[end_point]`: ✅ thông tin trong `Aurora and RDS` → `Databases` → _"tfm-rds"_ → `Endpoint & port`
     - `[port]`: ✅
     - `[database_name]`: _"taskflowmanager"_
   - Bấm lần lượt các phím sau để lưu thay đổi file `(.env)`:
     - `Control+O` (Write Out)
     - `Control+C` (Cancel)
     - `Control+X` (Exit)
     - `Y` (Yes) ~ `N` (No)
   - Nhập lại `nano .env` (double check) 💎

7. Làm việc với **Prisma** để tạo dữ liệu cho **Database**.
   - Chạy **Generate Prisma Client** từ file `(schema.prisma)`:
     ```
     npx prisma generate
     ```
   - **Migrate Prisma Postgres Database** và đặt tên _"init"_ cho `Migrate` đầu tiên:
     ```
     npx prisma migrate dev --name init
     ```
   - Chạy `script` tạo data mẫu từ **JSON** vào **DB**:
     ```
     npm run seed
     ```
8. Cuối cùng check nhanh **{Server + DB}**:
   - 1️⃣ Chạy Server:
     ```
     pm2 start ecosystem.config.js
     ```
   - 2️⃣ Lấy **IP** của **Server** bằng cách truy cập `EC2 → Public IPv4 address`
   - 3️⃣ Nhập **(URL)** = `http://[Public IPv4 address]/` ➡️ nếu hiện dòng chữ _"This is Home Route"_ ✅ **Server** OK!
   - 4️⃣ Nhập **(URL)** = `http://[Public IPv4 address]/projects` ➡️ nếu nhận được **JSON** của các _"project"_ hiện có ✅ **Database** OK!

### Cấu hình Amplify

1. Truy cập `AWS Amplify → Deploy an app`
2. Choose source code provider: `GitHub`
3. Add repository and branch: ‼️ chọn repo
   - ✅ My app is a monorepo
     - Ví dụ, repo có cấu trúc tách riêng phần project **Frontend** và **Backend**
       ```
       ├── client
       ├── server
       ```
   - ⚠️ Monorepo root directory
     - Lúc này cần chỉ đúng đường dẫn thư mục project: _"client"_
4. App settings → Advanced settings:
   - Environment variables: thêm cặp `[Key-Value]`
     - **Key** = `NEXT_PUBLIC_API_BASE_URL` và **Value** = `http://[Public IPv4 address]`
   - Keep cookies in cache key: ✅ Enable
5. Kiểm tra các thông số cấu hình OK chưa? ➡️ Nhấn `Save and deploy`
6. Sau khi deploy thành công 🏆 Nhấn `Visit deployed URL`

⚠️ Chú ý quá trình **Deploy**:

- Trong giai đoạn phát triển, các package thường được tải về khi cần đến
  - Hiện project này đang dùng **React** bản `19`. Trong khi có 1 gói tên _"gantt-task-react"_ lại chỉ chấp nhận **React** bản `18`.
  - Nên gói này được đặt lệnh cài kèm thêm với cờ `--legacy-peer-deps`.
- Tuy nhiên khi **Deploy**:
  - Tất cả các gói sẽ được tải về theo lệnh `npm install` thông thường, chính vì vậy quá trình **Deploy** sẽ thất bại ❌
  - Tạm thời mình dùng _"gantt-task-react"_ không thấy có vấn đề gì với **React** bản `19`.
  - Cho nên trong `AWS Amplify → ... → task-flow-manager → Hosting: Build settings` chỉnh file (`amplify.yml`) đoạn **[npm install]** thành **[npm install --legacy-peer-deps]** ‼️
    ```
    version: 1
    applications:
      - frontend:
          phases:
            preBuild:
              commands:
                - npm install --legacy-peer-deps
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: .next
            files:
              - '**/*'
          cache:
            paths:
              - .next/cache/**/*
              - node_modules/**/*
        appRoot: client
    ```

### Cấu hình API Gateway

1. Vào `API Gateway → REST APIs`
   - Create REST API Info
     - API details: `New API`
     - API name: _"tfm-api-gateway"_
     - 👉🏻 Bấm nút `Create API`
2. Vào `Resources → Create resource`
   - Resource details: ✅ `Proxy resource`
   - Resource name: _"{proxy+}"_
   - Resource path: _"/"_
   - ✅ `CORS` (Cross Origin Resource Sharing)
   - 👉🏻 Bấm nút `Create resource`
3. Sau khi có **Proxy Route**, ta cần `Edit integration` cho `Method ANY`
   - Edit integration request
     - Method details
       - Integration type: `HTTP`
       - ✅ `HTTP proxy integration`
       - HTTP method: `ANY`
       - Endpoint URL: `http://[Public IPv4 address]/{proxy}`
   - 👉🏻 Bấm nút `Save`
4. Cho `Deploy API`
   - Stage: _"\*New stage\*"_
   - Stage name: _"prod"_
   - 👉🏻 Bấm nút `Deploy`
5. Vào `AWS Amplify` → _"task-flow-manager"_ → `Hosting: Environment variables`
   - Đổi biến môi trường có **Key** = `NEXT_PUBLIC_API_BASE_URL` từ **Value** = `http://[Public IPv4 address]` sang **Value** = `https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/{resource-path}`
   - Trong đó:
     - `{api-id}` → ID duy nhất của API Gateway (AWS tự cấp, dạng chuỗi ngẫu nhiên, ví dụ: abc123xyz9).
     - `execute-api` → domain mặc định mà AWS dùng cho API Gateway.
     - `{region}` → Region bạn deploy (ví dụ: us-east-1, ap-southeast-1).
     - `{stage}` → Môi trường bạn publish (ví dụ: dev, staging, prod).
     - `{resource-path}` → Đường dẫn API bạn định nghĩa (ví dụ: /users, /orders/123).

- 💎 Sau khi `Deploy` ta sẽ có `Invoke URL` để dùng <u>thay thế</u> cho `Public IP` của `EC2` là `[Public IPv4 address]` hiện đang dùng tạm cho **Frontend** đã _"deploy"_ trên `AWS Amplify`
  - ❌ Nhược điểm khi dùng **Public IP** trực tiếp:
    - IP thay đổi: Nếu bạn stop/start lại `EC2`, **Public IP** có thể thay đổi (trừ khi bạn mua `Elastic IP`).
    - Không bảo mật: Ai biết IP cũng có thể tấn công port 80/443/22.
    - Không có domain: User sẽ thấy http://[Public IPv4 address] rất xấu, không chuyên nghiệp.
    - Khó quản lý: Không có auth, rate limit, logs → không biết user nào gọi API.
    - Single point of failure: Một EC2 chết = cả hệ thống chết.
  - ✅ Giải pháp chuẩn:
    - 1️⃣ Dùng `Domain` + `Load Balancer` ➡️ `(ALB/NLB)`
      - Luồng: User → Domain (Route53) → Load Balancer (ALB) → EC2 instances.
        - Trỏ _"domain" (api.myapp.com)_ về `Application Load Balancer (ALB)`.
        - `ALB` phân phối request đến 1 hoặc nhiều `EC2` backend.
        - Có `SSL (HTTPS)` + scale dễ dàng.
    - 2️⃣ Hoặc dùng `Domain` + `API Gateway`
      - Luồng: User → Domain (Route53) → API Gateway → (Lambda / ECS / EC2).
        - **Domain** đẹp _(https://api.myapp.com)_.
        - Có Auth, rate limit, caching.
        - Backend có thể là `EC2`, `ECS`, hoặc `Lambda`.
        - Luôn chạy qua 👍 `HTTPS (port 443)` thay vì 👎🏻 `HTTP (port 80)`.
  - 📌 So sánh nhanh:
    | Tiêu chí | Domain + Load Balancer | Domain + API Gateway |
    | ------------------ | ----------------------------- | ------------------------------------------------- |
    | Quản lý traffic | Phân phối đến nhiều EC2 | Có thể route đến nhiều service (Lambda, EC2, ECS) |
    | Bảo mật/Auth | Tự cài (JWT middleware, etc.) | Built-in (IAM, Cognito, OAuth2) |
    | Logging/Monitoring | CloudWatch (phải config thêm) | CloudWatch tích hợp sẵn |
    | Caching | Không có sẵn | Có built-in caching |
    | Chi phí | Rẻ hơn nếu nhiều request | Tốn hơn nếu request nhiều |
    | Dễ dùng với API | Bình thường (backend lo hết) | Tối ưu cho API management |
  - 👉 Tóm gọn:
    - Nếu backend bạn **chỉ là EC2 app backend** → nên đi `Domain + Load Balancer`.
    - Nếu backend bạn là **API cho client/mobile, cần auth/rate limit/caching** → đi `Domain + API Gateway`.
