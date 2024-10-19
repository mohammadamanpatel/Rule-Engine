import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

// Initial state
const initialState = {
  rule: "",
  ruleIds: ["", ""],
  operator: "AND",
  userData: {},
  result: null,
  recentRules: [], // To store the fetched recent rules
  loading: false,
  error: null,
};

// Rule slice
const ruleSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setRule(state, action) {
      state.rule = action.payload;
    },
    setRuleIds(state, action) {
      state.ruleIds = action.payload;
    },
    setOperator(state, action) {
      state.operator = action.payload;
    },
    setUserData(state, action) {
      state.userData = { ...state.userData, ...action.payload };
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setRecentRules(state, action) {
      state.recentRules = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setRule,
  setRuleIds,
  setOperator,
  setUserData,
  setResult,
  setRecentRules,
  setLoading,
  setError,
} = ruleSlice.actions;

export default ruleSlice.reducer;

// Async actions (without using createAsyncThunk)
export const createRule = (ruleAST) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance.post("/createRules", { ruleAST });
    alert("Rule created successfully!");
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Combine the two most recent rules and create a new combined rule
export const combineRecentRules = (operator) => async (dispatch) => {
  console.log("operator in combineRecentRules slice",operator)
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance.post("/combinedRules", {
      operator, // or any default value you want to set
    });

    console.log("response in combineRecentRules", response);
    alert("Rules combined successfully!");

    // Update recent rules in the state
    dispatch(setRecentRules(response.data.recentRules)); // Assuming response contains recent rules
    dispatch(setRuleIds(response.data.recentRules.map((rule) => rule._id))); // Update ruleIds with recent rule IDs
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Evaluate a rule
// Evaluate a rule (now sending ruleId in the request body)
// Evaluate a rule (only sending userData in the request body)
export const evaluateRecentRule = (userData) => async (dispatch) => {
  console.log("userData",userData)
  try {
    dispatch(setLoading(true));
    
    // Only sending userData in the request body
    const response = await axiosInstance.post(`/evaluateRules`, {
      userData,
    });

    dispatch(setResult(response.data.eligible ? "Eligible" : "Not Eligible"));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

