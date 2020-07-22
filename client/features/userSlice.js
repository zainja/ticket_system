import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: "user",
    initialState:{
        firstName: "",
        lastName: "",
        userName: "",
        longitude: 0,
        latitude: 0
    },
    reducers: {
        setName: (state, action) => {
            state = action.payload
        }
    }
})
export const {setName} = userSlice.actions
export const selectName = state => state.user
export default userSlice.reducer