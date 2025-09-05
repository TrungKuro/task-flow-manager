"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/common/Header";
import TaskCard from "@/components/common/TaskCard";
import ProjectCard from "@/components/common/ProjectCard";
import UserCard from "@/components/common/UserCard";
import { debounce } from "lodash";

import { useSearchQuery } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                     URL (Path) "/search?query=[value]"                    */
/* ------------------------------------------------------------------------- */

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      {/* Header */}
      <Header name="Search" />

      {/* Search Container */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border bg-gray-100 p-3 placeholder-gray-500 shadow focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          onChange={handleSearch}
        />
      </div>

      {/* Show search progress and results */}
      <div className="p-5">
        {/* Show search process status */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}

        {/* List of Card, include [User|Project|Task] (if found) */}
        {!isLoading && !isError && searchResults && (
          <div className="flex flex-col gap-4">
            {/* List "Task" found (if have) */}
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2 className="font-bold dark:text-white">Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {/* List "Project" found (if have) */}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2 className="font-bold dark:text-white">Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* List "User" found (if have) */}
            {searchResults.users && searchResults.users?.length > 0 && (
              <h2 className="font-bold dark:text-white">Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
