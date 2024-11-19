import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userAuthSlice";

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data.access_token);
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              accessToken: result.data.access_token,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.access_token,
              user: result.data.user,
            })
          );
        } catch (err) {}
      },
    }),

    userUpdate: builder.mutation({
      query: (data) => ({
        url: "users/me",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result.data.access_token);
          localStorage.setItem(
            "userAuth",
            JSON.stringify({
              accessToken: result.data.access_token,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.access_token,
              user: result.data.user,
            })
          );
        } catch (err) {}
      },
    }),

    userLoggedIn: builder.query({
      query: () => ({
        url: "users/me",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("userAuth")?.access_Token
          }`,
        },
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserUpdateMutation,
  useUserLoggedInQuery,
} = userAuthApi;
