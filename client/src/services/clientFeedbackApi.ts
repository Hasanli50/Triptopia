import { ClientFeedbackResponse, IClientFeedback } from "./../types/clientFeedback";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./endpoints/endpoint";

export const clientFeedbackApi = createApi({
  reducerPath: "clientFeedbackApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["ClientFeedbacks"],
  endpoints: (builder) => ({
    getClientFeedback: builder.query<ClientFeedbackResponse<IClientFeedback[]>, void>({
      query: () => ({
        url: "clientfeedbacks",
        method: "GET",
        invalidatesTags: ["ClientFeedbacks"],
      }),
    }),
    createClientFeedback: builder.mutation<
      IClientFeedback,
      { newClientFeedback: IClientFeedback }
    >({
      query: (newFeedback) => {
        return {
          url: "clientfeedbacks",
          method: "POST",
          body: newFeedback,
        };
      },
    }),
    updateClientFeedback: builder.mutation<
      IClientFeedback,
      Partial<IClientFeedback>
    >({
      query: ({ id, rating, review }) => ({
        url: `clientfeedbacks/${id}`,
        method: "PATCH",
        body: { rating, review },
      }),
    }),

    deleteClientFeedback: builder.mutation<IClientFeedback, { id: string }>({
      query: (id) => ({
        url: `clientfeedbacks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClientFeedbackQuery,
  useCreateClientFeedbackMutation,
  useUpdateClientFeedbackMutation,
  useDeleteClientFeedbackMutation,
} = clientFeedbackApi;
