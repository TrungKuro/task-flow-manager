# Package [Axios]

- 🏆 Chức năng chính:

  - 1️⃣ Các phương thức HTTP **(HTTP Methods)**:

    ```js
    // GET request
    const response = await axios.get("/api/users");

    // POST request
    await axios.post("/api/users", {
      name: "John",
      email: "john@example.com",
    });

    // PUT/PATCH/DELETE
    await axios.put("/api/users/1", userData);
    await axios.patch("/api/users/1", { name: "Jane" });
    await axios.delete("/api/users/1");
    ```

  - 2️⃣ Bộ chặn các "yêu cầu/phản hồi" **(Request/Response Interceptors)**:

    ```js
    // Request interceptor
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          // Redirect to login
        }
        return Promise.reject(error);
      }
    );
    ```

  - 3️⃣ Cấu hình cơ bản **(Base Configuration)**:

    ```js
    const api = axios.create({
      baseURL: "https://api.example.com",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    ```

  - 4️⃣ Xử lý lỗi **(Error Handling)**:

    ```js
    try {
      const response = await axios.get("/api/data");
    } catch (error) {
      if (error.response) {
        // Server response with error status
        console.log(error.response.status);
      } else if (error.request) {
        // Request made but no response
      } else {
        // Other errors
      }
    }
    ```

- ✅ Ưu điểm so với `fetch()`:

  - Tự động phân tích `JSON` - **(Built-in JSON parsing)**
    - 👉🏻 Tự động chuyển _"response"_ (dạng <u>chuỗi JSON</u>) thành `Object JavaScript`
  - Bộ chặn `Request/Response` - **(Request/Response interceptors)**
    - 👉🏻 Cho phép <u>xử lý tự động</u> trước khi _"gửi yêu cầu"_ hoặc _"nhận phản hồi"_
  - Tự động biến đổi dữ liệu - **(Automatic request/response transformation)**
    - 👉🏻 Tự động `stringify object` (chuỗi hóa đối tượng) thành `JSON` khi <u>gửi</u> | **{ Object ➡️ JSON }**
    - 👉🏻 Tự động `parse JSON` (phân tích JSON) khi <u>nhận</u> | **{ JSON ➡️ Object }**
    - 👉🏻 Xử lý các _"định dạng" (format)_ khác nhau
  - Hỗ trợ trình duyệt cũ - **(Wide browser support)**
    - 👉🏻 Hoạt động trên **Internet Explorer 11+**
    - 👉🏻 `fetch()` cần `polyfill` cho <u>trình duyệt cũ</u>
  - Đặt giới hạn thời gian cho `Request/Response` - **(Request/Response timeout)**
    - 👉🏻 Tự động hủy _"yêu cầu/phản hồi"_ sau khoảng thời gian
  - Hủy yêu cầu - **(Request cancellation)**
  - Bảo vệ chống `CSRF` - **(Protection against CSRF)**
    - 👉🏻 Tự động gửi `CSRF Token` nếu có
    - 👉🏻 Kiểm tra origin của request
    - 👉🏻 Bảo vệ ứng dụng khỏi các tấn công `cross-site` 🐞

- 💎 Những trường hợp sử dụng phổ biến:
  - `API calls` trong **React apps**
  - **Node.js backend** requests
  - `File` uploads/downloads
  - `Authentication` workflows

## HTTP Methods

?!
