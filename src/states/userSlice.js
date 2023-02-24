import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    id: null,
    username: null,
    email: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.id =null;
      state.username = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.token = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { register, logout } = userSlice.actions;

export default userSlice.reducer;
