"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

import NavBar from "./NavBar";
import SideBar from "./SideBar";

import StoreProvider, { useAppSelector } from "@/redux/store";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

// Cung cấp component (Provider) của Redux bọc toàn bộ App Web
// Giúp truyền (Redux Store) xuống các component con
// - Provider    : <StoreProvider>
// - Redux Store : <AppStore>
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;

/* ------------------------------------------------------------------------- */
/*                              CHILD COMPONENT                              */
/* ------------------------------------------------------------------------- */

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Truy cập các "state" trong Redux Store có tên <AppStore>
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Thiết lập chế độ Theme khi mới load trang dựa vào trạng thái [isDarkMode]
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Side Bar */}
      <SideBar />

      {/* Content */}
      <main
        className={cn(
          "flex w-full flex-col bg-gray-50 dark:bg-dark-bg",
          // Mở rộng/Thu gọn thanh SideBar dựa vào trạng thái [isSidebarCollapsed]
          isSidebarCollapsed ? "" : "md:pl-64",
        )}
      >
        {/* Navigation Bar */}
        <NavBar />

        {/* Page */}
        {children}
      </main>
    </div>
  );
};
