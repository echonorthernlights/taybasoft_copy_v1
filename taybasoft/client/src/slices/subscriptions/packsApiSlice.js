import { apiSlice } from "../apiSlice.js"
import { PACKS_URL } from "../constants.js"

export const packsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPacks: builder.query({
      query: () => ({
        url: `${PACKS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPackDetails: builder.query({
      query: (packId) => ({
        url: `${PACKS_URL}/${packId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPack: builder.mutation({
      query: (newPack) => ({
        url: `${PACKS_URL}`,
        method: "POST",
        body: newPack,
      }),
    }),
    deletePack: builder.mutation({
      query: (packId) => ({
        url: `${PACKS_URL}/${packId}`,
        method: "DELETE",
      }),
    }),
    updatePack: builder.mutation({
      query: (data) => ({
        url: `${PACKS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Packs"],
    }),
  }),
})

export const {
  useGetPacksQuery,
  useGetPackDetailsQuery,
  useCreatePackMutation,
  useDeletePackMutation,
  useUpdatePackMutation,
} = packsApiSlice
