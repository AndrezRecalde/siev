import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { statesSlice } from "./states/statesSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        states: statesSlice.reducer,
    }
});
