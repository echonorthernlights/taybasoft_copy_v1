import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import userAuthReducer from "./slices/users/userAuthSlice"

const store = configureStore({
	reducer: {
		// we don't add productsApiSlice and usersApiSlice, because they are children of apiSlice
		[apiSlice.reducerPath]: apiSlice.reducer,
		userAuth: userAuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
