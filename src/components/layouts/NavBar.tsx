import Link from "next/link";

import React from "react";
import { cn } from "@/lib/utils";

import { Menu, Moon, Search, Settings, Sun } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/redux/slice/state";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search Bar */}
      <div className="flex items-center gap-8">
        {/* Btn SideBar */}
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}

        {/* Input Container */}
        <div className="relative flex h-min w-[200px]">
          {/* Icon */}
          <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />

          {/* Input */}
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Button Icons */}
      <div className="flex items-center">
        {/* Btn Theme */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={cn(
            "rounded p-2",
            isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100",
          )}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        {/* Btn Settings */}
        <Link
          href="/settings"
          className={cn(
            "h-min w-min rounded p-2",
            isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100",
          )}
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/* Line Separate */}
        <div className="mr-5 ml-2 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block" />
      </div>
    </div>
  );
};

export default NavBar;
