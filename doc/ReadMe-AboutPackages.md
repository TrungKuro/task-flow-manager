# Package [Axios](https://axios-http.com/)

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
      },
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

# Pakage [Redux](https://redux.js.org/)

- 👉 `Redux` là thư viện _"quản lý state"_ cho **JavaScript apps** (phổ biến trong **React**).
  - 🏆 Ý tưởng: có <u>1 `Store` trung tâm</u> giữ toàn bộ `State` của **app**.
    - `State` <u>chỉ thay đổi</u> khi bạn _"điều phối hành động"_ `(Dispatch Action)`.
    - Logic thay đổi `State` được viết trong `Reducer`.
      - `Reducer` là một _"hàm thuần túy"_ `(pure function)`:
        - Hàm <u>nhận</u> vào `state` _"hiện tại"_ và một _"hành động"_ `(Action)`
        - Sau đó <u>trả về</u> một `state` _"mới"_ đã được cập nhật dựa trên _"hành động"_ `(Action)` đó
  - ⚡️ Lợi ích:
    - ✅ Dễ quản lý `state` khi app lớn, nhiều _"component lồng nhau"_.
    - ✅ Debug dễ (nhờ `Redux DevTools`, time-travel).
    - ✅ `State` nhất quán, có thể dự đoán được.

- 👀 Ví dụ mini:

  ```js
  // reducer
  function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case "increment":
        return { value: state.value + 1 };
      default:
        return state;
    }
  }

  // store
  import { createStore } from "redux";
  const store = createStore(counterReducer);

  // dispatch
  store.dispatch({ type: "increment" });
  console.log(store.getState()); // { value: 1 }
  ```

## Library "react-redux"

- 👉 Là thư viện giúp <u>kết nối `Redux` với `React`</u>:
  - Cho phép **React Component** truy cập `state` trong **Redux Store**.
  - Cung cấp **Component** có chức năng làm _"nhà cung cấp"_ `(Provider)` để truyền `store` xuống toàn bộ **app**.
  - Cung cấp **Hooks**:
    - `useSelector` → lấy `state` từ **Store**.
    - `useDispatch` → gửi `action` để thay đổi `state`.
- ✅ Kết quả: **Component** luôn <u>tự động re-render</u> khi `state` trong **Store** thay đổi.

- 👀 Ví dụ mini:

  ```jsx
  import { Provider, useSelector, useDispatch } from "react-redux";
  import { store } from "./store";

  function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
      <div>
        <p>{count}</p>
        <button onClick={() => dispatch({ type: "counter/increment" })}>
          +
        </button>
      </div>
    );
  }

  export default function App() {
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    );
  }
  ```

- 1️⃣ `Provider`
  - **Component** bọc toàn bộ **app**.
  - ✅ Truyền `Redux Store` xuống các _"component con"_ qua `React Context`.
  - ❌ Nếu không có `Provider`, các **Hook** `useSelector` và `useDispatch` sẽ không hoạt động.

  ```jsx
  <Provider store={store}>
    <App />
  </Provider>
  ```

- 2️⃣ `useDispatch`
  - **Hook** để lấy hàm `dispatch()`.
  - Dùng để gửi `action` tới `store`, nhằm thay đổi `state`.

  ```jsx
  const dispatch = useDispatch();
  dispatch(increment());
  ```

- 3️⃣ `useSelector` ➡️ `useAppSelector` **(TypeScript)**
  - **Hook** để đọc dữ liệu `state` từ `store`.
  - Tự động _"re-render"_ khi `state` thay đổi.

  ```jsx
  const count = useSelector((state) => state.counter.value);
  ```

- 4️⃣ `TypedUseSelectorHook` **(TypeScript)**
  - Là một _"generic type"_ để tạo ra một phiên bản `useSelector` có _"kiểu state"_ rõ ràng.
  - Tránh phải viết `(state: RootState)` lặp lại nhiều lần.
  - Sau đó dùng `useAppSelector` thay vì `useSelector` để có _"IntelliSense"_ và _"type safety"_.

  ```tsx
  import { TypedUseSelectorHook, useSelector } from "react-redux";
  import type { RootState } from "./store";

  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  ```

💎 Tóm lại:

- 1️⃣ `Provider`: truyền `store`.
- 2️⃣ `useDispatch`: gửi `action`.
- 3️⃣ `useSelector`: đọc `state`.
- 4️⃣ `TypedUseSelectorHook`: giúp `useSelector` có type chuẩn trong **TypeScript**.

## Redux ToolKit (RTK)

- 👉 Là bộ công cụ chính thức để dùng `Redux` dễ hơn.
- ⚡️ Chức năng chính:
  - `configureStore` - _"Cấu hình kho lưu trữ các trạng thái"_ → tạo **Redux Store** nhanh, tích hợp sẵn **DevTools** + **Middleware**.
  - `createSlice` - _"Tạo các lát cắt hành động cho từng trạng thái"_ → viết `Reducer + Action` gọn trong một chỗ.
  - `createAsyncThunk` - _""_ → xử lý `async (API call)` chuẩn hoá.
    - 🧐 Trong React, _"thunk"_ đề cập đến `Redux Thunk`:
      - ‼️ Một _"phần mềm trung gian"_ `(middleware)` cho `Redux`.
      - ✅ Cho phép <u>xử lý các _"tác vụ bất đồng bộ"_</u> như gọi `API` hoặc thực hiện <u>logic phức tạp</u> trước khi thực sự _"điều phối"_ `(Dispatch)` các _"hành động đồng bộ"_ `(Action)` khác để _"cập nhật trạng thái"_ `(State)` ứng dụng.
  - 💎 Tích hợp tốt với **TypeScript**.

- 👀 Ví dụ mini:

  ```js
  import { configureStore, createSlice } from "@reduxjs/toolkit";

  const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
    },
  });

  export const { increment, decrement } = counterSlice.actions;

  const store = configureStore({
    reducer: { counter: counterSlice.reducer },
  });

  store.dispatch(increment());
  console.log(store.getState()); // { counter: { value: 1 } }
  ```

### 🏆 Redux Toolkit Query

```ts
// api.ts

// File này cấu hình API slice sử dụng Redux Toolkit Query để quản lý các request tới backend.
// Sử dụng baseUrl lấy từ biến môi trường NEXT_PUBLIC_API_BASE_URL.
// Hiện tại chưa định nghĩa endpoint nào, chỉ là cấu hình cơ bản cho API slice.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: () => ({}),
});

export const {} = api;
```

## ⚖️ So sánh [Redux gốc] vs [Redux Toolkit]

| Tiêu chí          | **Redux gốc**                                                                      | **Redux Toolkit (RTK)**                                    |
| ----------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Cách viết**     | Dài dòng, nhiều boilerplate (action types, action creators, switch-case reducers). | Ngắn gọn, tất cả gói trong `createSlice`.                  |
| **Store setup**   | Tự viết `createStore`, middleware, DevTools.                                       | `configureStore` tích hợp sẵn DevTools + middleware.       |
| **Reducer**       | Pure function, phải clone state thủ công (`...state`).                             | Dùng Immer, cập nhật state trực tiếp (`state.value++`).    |
| **Async logic**   | Phải dùng thêm middleware như `redux-thunk` hoặc `redux-saga`.                     | Có sẵn `createAsyncThunk`.                                 |
| **TypeScript**    | Cấu hình phức tạp.                                                                 | Hỗ trợ TS tốt, type inference mạnh.                        |
| **Best practice** | Dễ viết sai pattern nếu không theo chuẩn.                                          | Chính thức khuyến nghị từ Redux Team, chuẩn nhất hiện nay. |

## Library "react-persist"

- 👉 Là thư viện giúp <u>lưu các _"trạng thái muốn giữ lại"_ `(persist) State`</u> của **Redux Store** vào `storage`.
- ⚡️ Chức năng:
  - ✅ Khi reload/trả lại app → `Redux` khôi phục `State` từ `storage` thay vì reset về mặc định.
  - Hữu ích cho: login session, giỏ hàng, cài đặt người dùng…
- 💎 `State` trong `Redux` sẽ <u>tự động lưu và khôi phục</u> khi bạn **F5 trang**.

- 👀 Ví dụ mini:

  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage"; // dùng localStorage cho web
  import counterReducer from "./counterSlice";

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, counterReducer);

  export const store = configureStore({
    reducer: { counter: persistedReducer },
  });

  export const persistor = persistStore(store);
  ```
