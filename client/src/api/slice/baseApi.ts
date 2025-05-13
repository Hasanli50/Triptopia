import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken, removeToken, saveToken } from "../../utils/localeStorage";
import { BASE_URL } from "../endpoints/endpoint";

let authToken: string | null = getToken();

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    saveToken(token);
  } else {
    window.location.href = "/login";
    removeToken();
  }
};


export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (authToken) {
      headers.set("Authorization", `Bearer ${authToken}`);
    }
    return headers;
  },
});
