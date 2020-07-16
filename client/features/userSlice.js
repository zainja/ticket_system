import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: "user",
    initialState:{
        firstName: "",
        lastName: "",
        userName: ""
    },
    reducers: {
        setName: (state, action) => {
            state.value = action.payload
        }
    }
})
export const {setName} = userSlice.actions
export const selectName = state => state.name
export default userSlice.reducer