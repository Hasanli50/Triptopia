import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, Endpoints } from "../endpoints/endpoint";
import { ApiResponse, User } from "../../types/user";
import { getToken } from "../../utils/localeStorage";

interface UserResponse {
  token: string;
  message: string;
  status: string;
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

type TokenType = {
  token: string;
};

type UserRegisterResponse = {
  message: string;
  status: string;
  data: User;
  token: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"], // Helps auto-refetch after mutations

  endpoints: (build) => ({
    getAllNotDeletedUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getById: build.query<User, { id: string }>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    getByToken: build.query<User, { token: string }>({
      query: ({ token }) => ({
        url: `/users/${token}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      providesTags: ["Users"],
    }),

    getUserByTokenFromParams: build.query<ApiResponse<User>, { token: string }>({
      query: ({ token }) => ({
        url: `/users/get-by-token/${token}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Users"],
    }),

    userRegister: build.mutation<UserRegisterResponse, Partial<User>>({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    hostRegister: build.mutation<User, Partial<User>>({
      query: (newHost) => ({
        url: `/users/${Endpoints.HOST}`,
        method: "POST",
        body: newHost,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    verifyAccount: build.mutation<
      User,
      { verificationCode: string; token: string }
    >({
      query: ({ verificationCode, token }) => ({
        url: `/users/${Endpoints.VERIFY_ACCOUNT}/${token}`,
        method: "POST",
        body: { verificationCode },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    resendOtp: build.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `/users/resend-otp/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    verifyHostAccount: build.mutation<
      User,
      { code: Partial<User>; id: string }
    >({
      query: ({ code, id }) => ({
        url: `/users/${Endpoints.VERIFY_ACCOUNT_HOST}/${id}`,
        method: "PATCH",
        body: code,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    userLogin: build.mutation<
      UserResponse,
      { email: string; password: string }
    >({
      query: (user) => ({
        url: `/users/${Endpoints.USER_LOGIN}`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    freezeAccount: build.mutation<User, Partial<User>>({
      query: (id) => ({
        url: `/users/${Endpoints.FREEZE_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isFrozen: true },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    unFreezeAccount: build.mutation<User, Partial<User>>({
      query: (id) => ({
        url: `/users/${Endpoints.UNFREEZE_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isFrozen: false },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    banAccount: build.mutation<User, { id: string; duration: number }>({
      query: ({ id, duration }) => ({
        url: `/users/${Endpoints.BANNED_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { duration },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    unBanAccount: build.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${Endpoints.UNBANNED_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isBanned: false, banExpiresAt: null },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    deleteAccount: build.mutation<User, { id: string }>({
      query: ({ id }) => ({
        url: `users/${Endpoints.DELETE_ACCOUNT}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    forgotPassword: build.mutation<TokenType, { email: string }>({
      query: (email) => ({
        url: `/users/${Endpoints.FORGOT_PASSWORD}`,
        method: "POST",
        body: email,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    resetPassword: build.mutation<
      User,
      { token: string; password: string; confirmPass: string }
    >({
      query: ({ token, password, confirmPass }) => ({
        url: `/users/${Endpoints.RESET_PASSWORD}/${token}`,
        method: "POST",
        body: { password, confirmPass },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    updateUserInfo: build.mutation<
      User,
      { id: string; username: string; email: string; phone_number: string }
    >({
      query: ({ id, username, email, phone_number }) => ({
        url: `/users/${Endpoints.USER_INFO}/${id}`,
        method: "PATCH",
        body: { username, email, phone_number },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    updatePassword: build.mutation<
      User,
      { id: string; password: string; confirmPass: string }
    >({
      query: ({ id, password, confirmPass }) => ({
        url: `/users/${Endpoints.UPDATE_PASSWORD}/${id}`,
        method: "PATCH",
        body: { password, confirmPass },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    saveFcmToken: build.mutation<User, { token: string }>({
      query: ({ token }) => ({
        url: `/users/${Endpoints.SAVE_FCM_TOKEN}`,
        method: "POST",
        body: { token },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),
  }),
});

export const {
  useGetAllNotDeletedUsersQuery,
  useGetByIdQuery,
  useGetByTokenQuery,
  useGetUserByTokenFromParamsQuery,
  useUserRegisterMutation,
  useHostRegisterMutation,
  useVerifyAccountMutation,
  useResendOtpMutation,
  useVerifyHostAccountMutation,
  useUserLoginMutation,
  useFreezeAccountMutation,
  useUnFreezeAccountMutation,
  useBanAccountMutation,
  useUnBanAccountMutation,
  useDeleteAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  useSaveFcmTokenMutation,
} = userApi;
