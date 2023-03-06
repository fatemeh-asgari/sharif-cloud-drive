import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
  name: "library",
  initialState: {
    count: 0,
    // libraries: [
    //   {
    //     id: 1,
    //     type: "book",
    //     name: "novels",
    //     description: "Classics by Jane Austen",
    //   },
    //   {
    //     id: 2,
    //     type: "picture",
    //     name: "nature",
    //     description: "Pictures of nature",
    //   },
    // ],
    libraries: null,
    selectedLibrary: null,
    libraryFiles: null,
    // libraryFiles: [
    //   {
    //     id: 1,
    //     library: 1,
    //     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
    //     description: "A PDF file",
    //     attributes: null,
    //     attachment_fields: null,
    //     file_name: "Sprint2_Review_oz55B5a.pdf",
    //     attachments: [
    //       {
    //         id: 1,
    //         field: "subtitle",
    //         file: "http://127.0.0.1:8000/files/library/files/pselecture17_aSRLPib.pdf",
    //         file_name: "pselecture17_aSRLPib.pdf",
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     library: 1,
    //     file: "http://127.0.0.1:8000/files/library/files/Sprint2_Review_oz55B5a.pdf",
    //     description: "A PDF file",
    //     attributes: null,
    //     attachment_fields: null,
    //     file_name: "Sprint2_Review_oz55B5a.pdf",
    //     attachments: [
    //       {
    //         id: 1,
    //         field: "subtitle",
    //         file: "http://127.0.0.1:8000/files/library/files/pselecture17_aSRLPib.pdf",
    //         file_name: "pselecture17_aSRLPib.pdf",
    //       },
    //     ],
    //   },
    // ],
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
