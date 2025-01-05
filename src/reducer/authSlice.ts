import { persistReducer } from "redux-persist";
import { jwtDecode } from "jwt-decode";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
import { authService } from "@/services/auth";
import { GetAuthResponse } from "@/services/types/authServiceType";

export type AuthState = {
    user: GetAuthResponse | null;
    isLoggedIn: boolean;
};
export type RootAuthState = {
    auth: AuthState;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLogout: state => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setAuthUser: (state, { payload }) => {
            state.user = payload;
            state.isLoggedIn = true;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = jwtDecode(payload);
            state.isLoggedIn = true;
        });
    
        builder.addMatcher(authService.endpoints.logout.matchFulfilled, state => {
            state.user = null;
            state.isLoggedIn = false;
        });
    },
});

export const { setAuthLogout, setAuthUser } = authSlice.actions;

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "isLoggedIn"],
};

export default persistReducer(persistConfig, authSlice.reducer);
