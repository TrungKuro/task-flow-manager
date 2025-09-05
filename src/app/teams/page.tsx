"use client";

import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  GridColDef,
  Toolbar,
  FilterPanelTrigger,
  ExportPrint,
  DataGrid,
} from "@mui/x-data-grid";
import Header from "@/components/common/Header";

import { useAppSelector } from "@/redux/store";
import { useGetTeamsQuery } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                            URL (Path) "/teams"                            */
/* ------------------------------------------------------------------------- */

const CustomToolbar = () => (
  <Toolbar className="toolbar flex gap-2">
    <FilterPanelTrigger />
    <ExportPrint />
  </Toolbar>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

/* ------------------------------------------------------------------------- */

const TeamsPage = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      {/* Header */}
      <Header name="Teams" />

      {/* Table of Teams */}
      <div className="h-fit w-full">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={teams || []}
            columns={columns}
            pagination
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default TeamsPage;
