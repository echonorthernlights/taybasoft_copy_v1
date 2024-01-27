import { apiSlice } from "../apiSlice.js"
import { SUBSCRIBERS_URL } from "../constants.js"

export const subscribersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: () => ({
        url: `${SUBSCRIBERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSubscriberDetails: builder.query({
      query: (subscriberId) => ({
        url: `${SUBSCRIBERS_URL}/${subscriberId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSubscriber: builder.mutation({
      query: (newSubscriber) => ({
        url: `${SUBSCRIBERS_URL}`,
        method: "POST",
        body: newSubscriber,
      }),
    }),
    deleteSubscriber: builder.mutation({
      query: (subscriberId) => ({
        url: `${SUBSCRIBERS_URL}/${subscriberId}`,
        method: "DELETE",
      }),
    }),
    updateSubscriber: builder.mutation({
      query: (subscriber) => ({
        url: `${SUBSCRIBERS_URL}/${subscriber.id}`,
        method: "PUT",
        body: subscriber,
      }),
      invalidatesTags: ["Subscribers"],
    }),
  }),
})

export const {
  useGetSubscribersQuery,
  useGetSubscriberDetailsQuery,
  useCreateSubscriberMutation,
  useDeleteSubscriberMutation,
  useUpdateSubscriberMutation,
} = subscribersApiSlice
