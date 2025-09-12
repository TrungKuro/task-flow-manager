"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import Header from "@/components/common/Header";
import ModalNewTask from "@/components/common/ModalNewTask";
import TaskCard from "@/components/common/TaskCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAppSelector } from "@/redux/store";
import { Priority, Task, useGetTasksByUserQuery } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                   URL (Path) "/priority/[type_priority]"                  */
/* ------------------------------------------------------------------------- */

type ReusablePriorityPageProps = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

/* ------------------------------------------------------------------------- */

const ReusablePriorityPage = ({ priority }: ReusablePriorityPageProps) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1; //! Temporary fake ID
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      {/* Popup Modal "New Task" */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />

      {/* Header & Button Add */}
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />

      {/* Select view mode */}
      <div className="mb-4 flex justify-start">
        {/* List View */}
        <button
          className={cn(
            "rounded-l px-4 py-2",
            view === "list" ? "bg-gray-300" : "bg-white",
          )}
          onClick={() => setView("list")}
        >
          List
        </button>

        {/* Table view */}
        <button
          className={cn(
            "rounded-l px-4 py-2",
            view === "table" ? "bg-gray-300" : "bg-white",
          )}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {/* Display content in the mode you choose */}
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        // Show List
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          // Show Table
          <div className="z-0 h-fit w-full">
            <ThemeProvider theme={theme}>
              <DataGrid
                rows={filteredTasks}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
              />
            </ThemeProvider>
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
