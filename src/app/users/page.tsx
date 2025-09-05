"use client";

import Image from "next/image";
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
import { useGetUsersQuery } from "@/redux/slice/api";

/* ------------------------------------------------------------------------- */
/*                            URL (Path) "/users"                            */
/* ------------------------------------------------------------------------- */

const CustomToolbar = () => (
  <Toolbar className="toolbar flex gap-2">
    <FilterPanelTrigger />
    <ExportPrint />
  </Toolbar>
);

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------------- */

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <div className="flex w-full flex-col p-8">
      {/* Header */}
      <Header name="Users" />

      {/* Table of Users */}
      <div className="h-fit w-full">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={users || []}
            columns={columns}
            getRowId={(row) => row.userId}
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

export default UsersPage;
