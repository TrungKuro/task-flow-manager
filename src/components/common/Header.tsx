/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

type HeaderProps = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

/* ------------------------------------------------------------------------- */

const Header = ({ name, buttonComponent, isSmallText = false }: HeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={cn(
          isSmallText ? "text-lg" : "text-2xl",
          "font-semibold dark:text-white",
        )}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
