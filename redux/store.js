import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "redux-devtools-extension";

import { authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  devToolsEnhancer()
);
