import { apiSlice } from "../apiSlice.js"
import {
  AUTH_URL,
  LOGOUT_URL,
  VERIFY_AUTHENTICATION_URL,
  ROLES_URL,
} from "../constants.js"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${LOGOUT_URL}`,
        method: "POST",
      }),
    }),
    verifyAuthentication: builder.query({
      query: () => ({
        url: `${VERIFY_AUTHENTICATION_URL}`,
        method: "GET",
      }),
    }),
    getUserRole: builder.query({
      query: (roleId) => ({
        url: `${ROLES_URL}/${roleId}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyAuthenticationQuery,
  useGetUserRoleQuery,
} = authApiSlice
