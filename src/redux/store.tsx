"use client";

// File này cấu hình [Redux Store] cho toàn bộ ứng dụng Next.js
// - Sử dụng "Redux Toolkit" để quản lý các [Global State] từ file { state.ts }
// - Sử dụng "Redux Toolkit Query" để xử lý các [API Call] từ file { api.ts }
//
// Được thiết kế theo "pattern" Client Component của Next.js 13+

import { useRef } from "react";

import {
  Provider, // Component bọc ứng dụng để cung cấp Store
  useDispatch, // Hook để Dispatch Actions
  useSelector, // Hook để lấy các State từ Store
  TypedUseSelectorHook, // Type helper cho useSelector() với TypeScript
} from "react-redux";

import {
  combineReducers, // Kết hợp nhiều Reducer thành một [Root Reducer]
  configureStore, // Tạo [Redux Store] với cấu hình tối ưu
} from "@reduxjs/toolkit";

import globalReducer from "@/redux/slice/state"; // Reducer quản lý [Global State]
import { api } from "@/redux/slice/api"; // [API Slice] sử dụng RTK Query

import { setupListeners } from "@reduxjs/toolkit/query"; // Listener để tự động "refetch" khi "focus"/"reconnect"

/* ------------------------------------------------------------------------- */
/*                                REDUX STORE                                */
/* ------------------------------------------------------------------------- */

// Kết hợp tất cả các Reducer thành một [Root Reducer] duy nhất
const rootReducer = combineReducers({
  global: globalReducer, // từ file { state.ts }
  [api.reducerPath]: api.reducer, // từ file { api.ts }
});

// FACTORY FUNCTION tạo [Redux Store]
// Tách riêng thành function để tương thích với Next.js SSR
export const makeStore = () => {
  return configureStore({
    // Sử dụng [Root Reducer] đã tạo ở trên
    reducer: rootReducer,

    // Thêm RTK Query "middleware" vào "default middleware" CHAIN
    // - Default middleware bao gồm: thunk, serializable check, immutable check
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

/* ------------------------------------------------------------------------- */
/*                                REDUX TYPES                                */
/* ------------------------------------------------------------------------- */

// Type definitions cho TypeScript support
export type AppStore = ReturnType<typeof makeStore>; // Type của Store Instance
export type RootState = ReturnType<AppStore["getState"]>; // Type của Root State
export type AppDispatch = AppStore["dispatch"]; // Type của Dispatch Function

// Typed hooks để sử dụng trong Components với full TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Hook Dispatch có type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Hook Selector có type

/* ------------------------------------------------------------------------- */
/*                                  PROVIDER                                 */
/* ------------------------------------------------------------------------- */

// Provider component bọc toàn bộ ứng dụng để cung cấp [Redux Store]
// Sử dụng useRef() để tránh tạo lại Store mỗi lần "re-render"
// Pattern này đảm bảo Store chỉ được tạo một lần trong "client-side"
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);

  // Chỉ tạo Store một lần khi Component MOUNT
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Setup Listeners để tự động "refetch" data khi:
    // - Browser tab được "focus" lại
    // - Kết nối mạng được "reconnect" lại
    setupListeners(storeRef.current.dispatch);
  }

  // Cung cấp Store cho toàn bộ Component TREE
  return <Provider store={storeRef.current}>{children}</Provider>;
}
