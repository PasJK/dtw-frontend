import { persistReducer } from "redux-persist";
import { jwtDecode } from "jwt-decode";
import storage from "redux-persist/lib/storage";
import { createSlice, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { authService } from "@/services/auth";
import { GetAuthResponse } from "@/services/types/authServiceType";
import { HttpStatusCode } from "@/utils/enums/httpStatusCode";

export type AuthState = {
    user: GetAuthResponse | null;
    isLoggedIn: boolean;
    sessionExpired: boolean;
};
export type RootAuthState = {
    auth: AuthState;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    sessionExpired: false,
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
            state.sessionExpired = false;
        },
        setSessionExpired: (state, { payload }) => {
            state.sessionExpired = payload;
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
        builder.addMatcher(authService.endpoints.logout.matchRejected, (state, { payload }) => {
            if (payload?.status === HttpStatusCode.UNAUTHORIZED) {
                state.sessionExpired = true;
            }

            state.user = null;
            state.isLoggedIn = false;
        });
        builder.addMatcher(
            action => action.type.startsWith("postService") && isRejected(action),
            (state, { payload: error }: PayloadAction<FetchBaseQueryError>) => {
                if (error?.status === HttpStatusCode.UNAUTHORIZED) {
                    state.sessionExpired = true;
                }
            },
        );
    },
});

export const { setAuthLogout, setAuthUser, setSessionExpired } = authSlice.actions;

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "isLoggedIn"],
};

export default persistReducer(persistConfig, authSlice.reducer);
