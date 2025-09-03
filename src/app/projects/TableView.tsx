import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/common/Header";

import { useGetTasksQuery } from "@/redux/slice/api";
import { useAppSelector } from "@/redux/store";

/* ------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                              */
/* ------------------------------------------------------------------------- */

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
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.assignee || "Unassigned",
  },
];

/* ------------------------------------------------------------------------- */

type TableViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

/* ------------------------------------------------------------------------- */

const TableView = ({ id, setIsModalNewTaskOpen }: TableViewProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <div className="w-full px-4 pb-8 xl:px-6">
      {/* Header & Button Add */}
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      {/* Table of Tasks */}
      <div className="h-fit w-full">
        <ThemeProvider theme={theme}>
          <DataGrid rows={tasks || []} columns={columns} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default TableView;
