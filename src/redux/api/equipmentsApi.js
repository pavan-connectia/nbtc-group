import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const equipmentsApi = createApi({
  reducerPath: "equipments",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getEquipmentsById: builder.query({
      query: (id) => ({ url: `/category/${id}`, params: { display: true } }),
    }),
    getEquipmentsByDepartment: builder.query({
      query: (name) => ({
        url: "/category/name",
        params: { display: true, name: name },
      }),
    }),
    getEquipmentsByFeaturedPopular: builder.query({
      query: (name) => ({
        url: "/category/name",
        params: { name: name },
      }),
    }),
    getEquipmentsByCategory: builder.query({
      query: (category) => ({
        url: "/category/category",
        params: { category: category, display: true },
      }),
    }),
    getEquipmentsBySubCategory: builder.query({
      query: (subcategory) => ({
        url: "/category/sub-category",
        params: { subcategory: subcategory, display: true },
      }),
    }),
  }),
});
export const {
  useGetEquipmentsByIdQuery,
  useGetEquipmentsByDepartmentQuery,
  useGetEquipmentsByFeaturedPopularQuery,
  useGetEquipmentsByCategoryQuery,
  useGetEquipmentsBySubCategoryQuery,
} = equipmentsApi;
