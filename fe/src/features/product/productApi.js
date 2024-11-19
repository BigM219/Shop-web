import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/products/?skip=0&limit=4`,
      }),
    }),
    getMoreProducts: builder.query({
      query: (page) => ({
        url: `/products/?skip=0&limit=1000`,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft.data = [...draft.data, ...data.data];
              draft.totalItems = data.totalItems;
              return draft;
            })
          );
        } catch (err) {}
      },
    }),
    // getFeatureProducts: builder.query({
    //   query: () => ({
    //     url: "/product/featue-products",
    //   }),
    // }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
    getProductByCategory: builder.query({
      query: (categoryId) => ({
        url: `/products/${categoryId}`,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft?.data.push(data);
            })
          );
        } catch (err) {}
      },
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // pessimistic updates getProducts cache
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const productIndex = draft?.data.findIndex(
                (product) => product?.product_id === data.product_id
              );
              draft.data[productIndex] = data;
            })
          );

          // pessimistic updates getBrand cache
          dispatch(
            apiSlice.util.updateQueryData(
              "getProduct",
              arg.productId,
              (draft) => {
                // console.log(JSON.stringify(draft));
              }
            )
          );
        } catch (err) {}
      },
    }),
    updateProductStatus: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/update-product-status/${productId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            const productIndex = draft?.data.findIndex(
              (product) => product.product_id === arg.productId
            );
            draft.data[productIndex].status = arg.data.status;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const result = dispatch(
      //     apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
      //       const products = draft?.data.filter(
      //         (product) => product.product_id !== arg
      //       );
      //       draft.data = products;
      //       return draft;
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (err) {
      //     result.undo();
      //   }
      // },
    }),
    searchProduct: builder.query({
      query: (data) => ({
        url: `/product/search?search=${data}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMoreProductsQuery,
  useGetFeatureProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
  useSearchProductQuery,
} = productApi;
