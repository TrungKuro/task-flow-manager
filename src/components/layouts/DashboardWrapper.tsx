import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Side Bar */}
      <SideBar />

      {/* Content */}
      <main className="flex w-full flex-col bg-gray-50 md:pl-64 dark:bg-dark-bg">
        {/* Navigation Bar */}
        <NavBar />

        {/* Page */}
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
