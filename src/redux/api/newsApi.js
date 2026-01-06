import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCsr: builder.query({
      query: () => ({
        url: "/news/csr",
        params: { display: true },
      }),
    }),
    getImgGallery: builder.query({
      query: () => ({
        url: "/news/image-gallery",
        params: {
          display: true,
          showInMain: true,
        },
      }),
    }),
    getLatestNews: builder.query({
      query: () => ({
        url: "/news/news",
        params: { display: true, showInMain: true },
      }),
    }),
    getLatestNewsById: builder.query({
      query: (id) => `/news/news/${id}`,
    }),
    getVideoGallery: builder.query({
      query: () => ({
        url: "/news/video-gallery",
        params: { display: true, showInMain: true },
      }),
    }),
    getPublication: builder.query({
      query: () => ({
        url: "/news/publication",
        params: { display: true, showInMain: true },
      }),
    }),
  }),
});
export const {
  useGetCsrQuery,
  useGetImgGalleryQuery,
  useGetLatestNewsQuery,
  useGetPublicationQuery,
  useGetLatestNewsByIdQuery,
  useGetVideoGalleryQuery,
} = newsApi;
