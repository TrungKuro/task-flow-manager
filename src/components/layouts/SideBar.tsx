"use client";

import { LockIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const SideBar = () => {
  return (
    <div className="fixed z-40 flex h-full w-64 flex-col justify-between overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black">
      <div className="flex h-full w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
        </div>

        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          {/* Logo */}
          <Image src="/logo.png" alt="Logo" width={40} height={40} />

          {/* Information */}
          <div>
            {/* Name */}
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              EDROH TEAM
            </h3>

            {/* Status */}
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
