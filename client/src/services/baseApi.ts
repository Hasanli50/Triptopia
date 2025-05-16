/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken, saveToken, removeToken } from "../utils/localeStorage";
import { BASE_URL } from "./endpoints/endpoint";

let authToken: string | null = getToken();

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    saveToken(token);
  } else {
    removeToken();
    window.location.href = "/login";
  }
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // sends cookies like refreshToken
  prepareHeaders: (headers) => {
    if (authToken) {
      headers.set("Authorization", `Bearer ${authToken}`);
    }
    return headers;
  },
});

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn("Access token expired. Trying to refresh...");

    const refreshResult = await rawBaseQuery(
      { url: "users/refresh", method: "POST" },
      api,
      extraOptions
    );

    const newToken = (refreshResult?.data as { token?: string })?.token;
    if (newToken) {
      setAuthToken(newToken);
      // Retry original request with new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      setAuthToken(null);
    }
  }

  return result;
};
