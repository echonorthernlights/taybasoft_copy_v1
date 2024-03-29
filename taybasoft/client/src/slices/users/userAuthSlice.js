// userAuthSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { HOST_URL, ROLES_URL } from "../constants"

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const initialState = {
	user: userInfo ? { ...userInfo, userRole: null } : null,
	isAuthenticated: false,
	loading: false,
}

export const fetchRole = createAsyncThunk(
	"userAuth/fetchRole",
	async (roleId) => {
		try {
			const response = await fetch(`${HOST_URL}${ROLES_URL}/${roleId}`)
			const data = await response.json()
			return data
		} catch (error) {
			localStorage.removeItem("userInfo")
			throw error
		}
	}
)

const userAuthSlice = createSlice({
	name: "userAuth",
	initialState,
	reducers: {
		// Action to set user information after successful login
		setUserAuth: (state, action) => {
			const user = action.payload
			state.user = { ...user, userRole: null }
		},
		// Action to clear user information after logout
		clearUserAuth: (state) => {
			state.user = null
			state.isAuthenticated = false
		},
	},
	extraReducers: (builder) => {
		// Handle actions generated by createAsyncThunk
		builder
			.addCase(fetchRole.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchRole.fulfilled, (state, action) => {
				const { role } = action.payload
				state.loading = false
				state.user = { ...state.user, userRole: role }
				state.isAuthenticated = true
			})
			.addCase(fetchRole.rejected, (state) => {
				state.loading = false
				state.user = null
				state.isAuthenticated = false
			})
	},
})

// Export action creators and async thunk
export const { setUserAuth, clearUserAuth } = userAuthSlice.actions

// Export the reducer
export default userAuthSlice.reducer
