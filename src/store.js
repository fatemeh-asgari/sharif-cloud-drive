import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./states/userSlice";
import libraryReducer from "./states/librarySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    library: libraryReducer,
  },
});
