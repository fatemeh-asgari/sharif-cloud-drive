import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
  name: "library",
  initialState: {
    count: 0,
    libraries: null,
    selectedLibrary: null,
    libraryFiles: null,
  },
  reducers: {
    saveLibraries: (state, action) => {
      state.count = action.payload.count;
      state.libraries = action.payload.results;
    },
    selectLibrary: (state, action) => {
      state.selectedLibrary = action.payload;
    },
    cancelSelectLibrary: (state) => {
      state.selectedLibrary = null;
    },
    saveFiles: (state, action) => {
      state.libraryFiles = action.payload.results;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveLibraries, selectLibrary, cancelSelectLibrary, saveFiles } =
  librarySlice.actions;

export default librarySlice.reducer;
