import { apiSlice } from "../apiSlice.js"
import { SUBSCIPTIONS_URL } from "../constants.js"

export const subscriptionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: `${SUBSCIPTIONS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSubscriptionDetails: builder.query({
      query: (subscriptionId) => ({
        url: `${SUBSCIPTIONS_URL}/${subscriptionId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSubscriptionsBySubscriber: builder.query({
      query: (subscriberId) => ({
        url: `${SUBSCIPTIONS_URL}/subscribers/${subscriberId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createSubscription: builder.mutation({
      query: (newSubscription) => ({
        url: `${SUBSCIPTIONS_URL}`,
        method: "POST",
        body: newSubscription,
      }),
    }),
    deleteSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: `${SUBSCIPTIONS_URL}/${subscriptionId}`,
        method: "DELETE",
      }),
    }),
    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `${SUBSCIPTIONS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
  }),
})

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionDetailsQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetSubscriptionsBySubscriberQuery,
} = subscriptionsApiSlice
