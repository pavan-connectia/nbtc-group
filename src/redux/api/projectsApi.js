import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({ url: "/projects", params: { display: true } }),
    }),
    getProjectsById: builder.query({
      query: (id) => ({ url: `/projects/${id}` }),
    }),
    getProjectsByDepartment: builder.query({
      query: (name) => ({
        url: `/projects/department-name/${name}`,
        params: { display: true },
      }),
    }),
  }),
});
export const {
  useGetProjectsQuery,
  useGetProjectsByIdQuery,
  useGetProjectsByDepartmentQuery,
} = projectsApi;
