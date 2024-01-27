import { apiSlice } from "../apiSlice.js"
import { USERS_URL } from "../constants.js"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBySubscriberId: builder.query({
      query: (subscriberId) => ({
        url: `${USERS_URL}/subscriber/${subscriberId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // getSubscriberDetails: builder.query({
    //   query: (subscriberId) => ({
    //     url: `${SUBSCRIBERS_URL}/${subscriberId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    // createSubscriber: builder.mutation({
    //   query: (newSubscriber) => ({
    //     url: `${SUBSCRIBERS_URL}`,
    //     method: "POST",
    //     body: newSubscriber,
    //   }),
    // }),
    // deleteSubscriber: builder.mutation({
    //   query: (subscriberId) => ({
    //     url: `${SUBSCRIBERS_URL}/${subscriberId}`,
    //     method: "DELETE",
    //   }),
    // }),
    // updateSubscriber: builder.mutation({
    //   query: (subscriber) => ({
    //     url: `${SUBSCRIBERS_URL}/${subscriber.id}`,
    //     method: "PUT",
    //     body: subscriber,
    //   }),
    //   invalidatesTags: ["Subscribers"],
    // }),
  }),
})

export const { useGetUserBySubscriberIdQuery } = usersApiSlice
