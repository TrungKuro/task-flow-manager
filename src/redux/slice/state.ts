// File này định nghĩa các [Global Slice]
// - Sử dụng "Redux Toolkit" để quản lý [Global State] của ứng dụng
// - Cung cấp các "Action" để thay đổi các trạng thái này

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ------------------------------------------------------------------------- */
/*                                Global State                               */
/* ------------------------------------------------------------------------- */

// Hiện tại quản lý 2 trạng thái:
// 1. (isSidebarCollapsed) : mở rộng/thu gọn thanh SideBar
// 2. (isDarkMode)         : thiết lập chế độ sáng/tối của App

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

/* ------------------------------------------------------------------------- */
/*                          Slice (Reducer + Action)                         */
/* ------------------------------------------------------------------------- */

// SLICE
export const globalSlice = createSlice({
  name: "global", //!
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

/* ------------------------------------------------------------------------- */

// ACTION
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

// REDUCER
export default globalSlice.reducer;
