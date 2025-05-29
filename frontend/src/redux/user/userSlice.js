import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true
        },
        removeUser: (state, action) => {
            state.user = {};
            state.isLoggedIn = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser} = userSlice.actions

export default userSlice.reducer