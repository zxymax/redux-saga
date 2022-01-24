import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    getUser() {

    },
    setUser(state, action) {
      const userData = action.payload
      return { ...state, ...userData }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUser, setUser } = userSlice.actions

export default userSlice.reducer
