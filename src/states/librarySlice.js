import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
  name: "library",
  initialState: {
    count: 0,
    libraries: null,
  },
  reducers: {
    saveLibraries: (state, action) => {
      state.count = action.payload.count;
      state.libraries = action.payload.results;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLibraries } = librarySlice.actions;

export default librarySlice.reducer;
