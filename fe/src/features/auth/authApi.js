import { apiSlice } from "../api/apiSlice";
import { adminLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "users/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "adminAuth",
            JSON.stringify({
              accessToken: result.data.access_token,
              admin: result.data.admin,
            })
          );
          dispatch(
            adminLoggedIn({
              accessToken: result.data.access_token,
              admin: result.data.admin,
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
