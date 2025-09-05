// File này cấu hình các [API Slice]
// - Sử dụng "Redux Toolkit Query" để quản lý các "request" tới Backend
// - Sử dụng "baseUrl" lấy từ biến môi trường [NEXT_PUBLIC_API_BASE_URL]

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ------------------------------------------------------------------------- */
/*                            Interface of Models                            */
/* ------------------------------------------------------------------------- */

export interface Project {
  id: number;

  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

/* ------------------------------------------------------------------------- */

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface Task {
  id: number;

  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

/* ------------------------------------------------------------------------- */

export interface User {
  userId?: number;

  username: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;

  email: string; //!
}

/* ------------------------------------------------------------------------- */

export interface Attachment {
  id: number;

  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

/* ------------------------------------------------------------------------- */

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

/* ------------------------------------------------------------------------- */
/*                              API (AsyncThunk)                             */
/* ------------------------------------------------------------------------- */

// Hiện tại chưa định nghĩa "endpoint" nào, chỉ là cấu hình cơ bản cho [API Slice]
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api", //!
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    /* -------------------------- Route "Project" -------------------------- */

    // READ - (GET): /projects
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    // CREATE - (POST): /projects + JSON
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    /* ---------------------------- Route "Task" --------------------------- */

    // READ - (GET): /tasks?projectId=[id]
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    // CREATE - (POST): /tasks + JSON
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // UPDATE - (PATCH): /tasks/[id]/status + JSON
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    /* --------------------------- Route "Search" -------------------------- */

    // READ - (GET): /search?query=[value]
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),

    /* --------------------------------------------------------------------- */
  }),
});

/* ------------------------------------------------------------------------- */
/*             URL = protocol://hostname:port/path?query#fragment            */
/* ------------------------------------------------------------------------- */

export const {
  // API "Project"
  useGetProjectsQuery, //? GET: /projects
  useCreateProjectMutation, //? POST: /projects + JSON

  // API "Task"
  useGetTasksQuery, //? GET: /tasks?projectId=[id]
  useCreateTaskMutation, //? POST: /tasks + JSON
  useUpdateTaskStatusMutation, //? PATCH: /tasks/[id]/status + JSON

  // API "Search"
  useSearchQuery, //? GET: /search?query=[value]
} = api;
