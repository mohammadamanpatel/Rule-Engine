import { configureStore } from "@reduxjs/toolkit";
import ruleReducer from "./Rule-slice.js"; // Assuming ruleSlice is where you have your slice logic

// Configure the store
const store = configureStore({
  reducer: {
    rules: ruleReducer, // Adding the ruleReducer to the store
  },
});

export default store;
