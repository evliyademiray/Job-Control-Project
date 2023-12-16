import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./slice/jobSlice";

export default configureStore({
  reducer: {jobSlice},
});
