import { ApiResponse } from "./../../types/Index.d";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Endpoints } from "../endpoints/endpoint";
import { IUser } from "../../types/user";
import { baseQuery } from "./baseApi";
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
  data: IUser;
  token: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"], // Helps auto-refetch after mutations

  endpoints: (build) => ({
    getAllNotDeletedUsers: build.query<IUser[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getById: build.query<IUser, { id: string }>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    getByToken: build.query<ApiResponse<IUser>, void>({
      query: () => "/users/get-by-token",
      providesTags: ["Users"],
    }),

    getUserByTokenFromParams: build.query<
      ApiResponse<IUser>,
      { token: string }
    >({
      query: ({ token }) => ({
        url: `/users/get-by-token/${token}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    userRegister: build.mutation<UserRegisterResponse, Partial<IUser>>({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    hostRegister: build.mutation<IUser, Partial<IUser>>({
      query: (newHost) => ({
        url: `/users/${Endpoints.HOST}`,
        method: "POST",
        body: newHost,
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    verifyAccount: build.mutation<
      IUser,
      { verificationCode: string; token: string }
    >({
      query: ({ verificationCode, token }) => ({
        url: `/users/${Endpoints.VERIFY_ACCOUNT}/${token}`,
        method: "POST",
        body: { verificationCode },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    resendOtp: build.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/resend-otp/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    verifyHostAccount: build.mutation<
      IUser,
      { code: Partial<IUser>; id: string }
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

    addToWishlist: build.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${Endpoints.ADD_TO_WISHLIST}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    removeFromWishlist: build.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${Endpoints.ADD_TO_WISHLIST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    freezeAccount: build.mutation<IUser, Partial<IUser>>({
      query: (id) => ({
        url: `/users/${Endpoints.FREEZE_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isFrozen: true },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    unFreezeAccount: build.mutation<IUser, Partial<IUser>>({
      query: (id) => ({
        url: `/users/${Endpoints.UNFREEZE_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isFrozen: false },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    banAccount: build.mutation<IUser, { id: string; duration: number }>({
      query: ({ id, duration }) => ({
        url: `/users/${Endpoints.BANNED_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { duration },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    unBanAccount: build.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${Endpoints.UNBANNED_ACCOUNT}/${id}`,
        method: "PATCH",
        body: { isBanned: false, banExpiresAt: null },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    deleteAccount: build.mutation<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `users/${Endpoints.DELETE_ACCOUNT}/${id}`,
        method: "DELETE",
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
      IUser,
      { token: string; password: string; confirmPass: string }
    >({
      query: ({ token, password, confirmPass }) => ({
        url: `/users/${Endpoints.RESET_PASSWORD}/${token}`,
        method: "POST",
        body: { password, confirmPass },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    updateUserInfo: build.mutation<
      IUser,
      { id: string; username: string; email: string; phone_number: string }
    >({
      query: ({ id, username, email, phone_number }) => ({
        url: `/users/${Endpoints.USER_INFO}/${id}`,
        method: "PATCH",
        body: { username, email, phone_number },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    updatePassword: build.mutation<
      IUser,
      { id: string; password: string; confirmPass: string }
    >({
      query: ({ id, password, confirmPass }) => ({
        url: `/users/${Endpoints.UPDATE_PASSWORD}/${id}`,
        method: "PATCH",
        body: { password, confirmPass },
      }),
      invalidatesTags: [{ type: "Users" }],
    }),

    saveFcmToken: build.mutation<IUser, { token: string }>({
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
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
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
