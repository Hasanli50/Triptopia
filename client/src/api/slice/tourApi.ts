import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../endpoints/endpoint";
import { ITour } from "../../types/tour.d";
import { ApiResponse } from "../../types/Index.d";

export const tourApi = createApi({
  reducerPath: "tourApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Tours"],
  endpoints: (build) => ({
    getAllTours: build.query<ApiResponse<ITour[]>, void>({
      query: () => "/tours",
      providesTags: ["Tours"],
    }),

    getTourByValues: build.query<ApiResponse<ITour[]>, Record<string, string>>({
      query: (params) => {
        const searchParams = new URLSearchParams(params).toString();
        return `/tours/search?${searchParams}`;
      },
      providesTags: ["Tours"],
    }),

    getTourById: build.query<ApiResponse<ITour>, { id: string }>({
      query: (id) => `/tours/${id}`,
      providesTags: ["Tours"],
    }),

    getTourRating: build.query<ApiResponse<ITour>, { id : string}>({
      query: (id) => `/tours/rating/${id}`,
      providesTags: ["Tours"],
    }),

    createTour: build.mutation<ITour, Partial<ITour>>({
      query: (newTour) => ({
        url: "/tours",
        method: "POST",
        body: newTour,
      }),
      invalidatesTags: ["Tours"],
    }),

    updateTour: build.mutation<
      ApiResponse<ITour>,
      { id: string; updatedTour: Partial<ITour> }
    >({
      query: ({ id, ...updatedTour }) => ({
        url: `/tours/${id}`,
        method: "PATCH",
        body: updatedTour,
      }),
      invalidatesTags: ["Tours"],
    }),

    deleteTour: build.mutation<ITour, { id: string }>({
      query: (id) => ({
        url: `/tours/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tours"],
    }),
  }),
});

export const {
  useGetAllToursQuery,
  useGetTourByValuesQuery,
  useGetTourByIdQuery,
  useGetTourRatingQuery,
  useCreateTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation,
} = tourApi;
