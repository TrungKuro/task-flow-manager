// File này cấu hình các [API Slice]
// - Sử dụng "Redux Toolkit Query" để quản lý các "request" tới Backend
// - Sử dụng "baseUrl" lấy từ biến môi trường [NEXT_PUBLIC_API_BASE_URL]

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ------------------------------------------------------------------------- */
/*                              API (AsyncThunk)                             */
/* ------------------------------------------------------------------------- */

// Hiện tại chưa định nghĩa "endpoint" nào, chỉ là cấu hình cơ bản cho [API Slice]
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api", //!
  tagTypes: [],
  endpoints: () => ({}),
});

export const {} = api;
