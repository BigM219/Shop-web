import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    oderCreate: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/orders",
      }),
    }),
    getUserOrder: builder.query({
      query: (userId) => ({
        url: `/orders/user/${userId}`,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}/status`,
        method: "PUT",
        body: data,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const result = dispatch(
      //     orderApi.util.updateQueryData("getAllOrder", undefined, (draft) => {
      //       const orderIndex = draft?.findIndex(
      //         (order) => order._id === arg.orderId
      //       );
      //       draft[orderIndex].orderStatus = arg.data.status;
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (err) {
      //     result.undo();
      //   }
      // },
    }),
  }),
});

export const { 
  useOderCreateMutation,
  useGetAllOrderQuery,
  useGetUserOrderQuery, 
  useUpdateOrderStatusMutation, 
} = orderApi;
