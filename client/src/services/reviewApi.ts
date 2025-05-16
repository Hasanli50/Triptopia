import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./endpoints/endpoint";
import { IReview } from "../types/review";
import { ApiResponse } from "../types/Index.d";
import { createApi } from "@reduxjs/toolkit/query/react";
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Reviews"],
  endpoints: (build) => ({
    getAllReviews: build.query<ApiResponse<IReview[]>, void>({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    getReviewById: build.query<ApiResponse<IReview>, { id: string }>({
      query: (id) => `/reviews/${id}`,
      providesTags: ["Reviews"],
    }),
    createReview: build.mutation<IReview, Partial<IReview>>({
      query: (newReview) => ({
        url: "/reviews",
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: build.mutation<ApiResponse<IReview>, Partial<IReview>>({
      query: ({ id, ...updatedReview }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: updatedReview,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: build.mutation<IReview, { id: string }>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
