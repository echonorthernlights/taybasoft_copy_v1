import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HOST_URL } from "./constants"

const baseQuery = fetchBaseQuery({
	baseUrl: HOST_URL,
	prepareHeaders(headers) {
		return headers
	},
	credentials: "include",
})

export const apiSlice = createApi({
	baseQuery,
	//tagTypes => used to define the types of data will be fetching from the API
	tagTypes: ["Packs", "Subscriptions", "Subscribers", "Users"],
	endpoints: (builder) => ({}),
	middleware: (baseQuery) => (fetchArgs, api, extraOptions) => {
		if (extraOptions.signal) {
			fetchArgs.signal = extraOptions.signal
		}
		// Include credentials: 'include'
		fetchArgs.credentials = "include"
		return baseQuery(fetchArgs, api, extraOptions)
	},
})
