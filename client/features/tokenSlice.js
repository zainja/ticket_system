import { createSlice } from '@reduxjs/toolkit'
export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: ""
    },
    reducers: {
        addToken: (state, action) => {
            state.value = action.payload
        },
        removeToken: state => state.value = ""
    }
})

export const {addToken, removeToken} = tokenSlice.actions

export const selectToken = state => state.token
export default tokenSlice.reducer