import { createApi } from "@reduxjs/toolkit/query/react";
import { commonBaseQuery, getErrorMessage } from "@/utils/commonBaseQuery";
import { ServiceResponse } from "./types/serviceResponseType";
import { AuthLoginResponse } from "./types/authServiceType";

type LoginRequest = {
    username: string;
};

export const getAuthToken = () => {
    let authToken: string | null = "";
    if (typeof window !== "undefined") {
        authToken = localStorage.getItem("authToken");
    }
    return authToken;
};

export const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token);
    }
};

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: commonBaseQuery(),
    tagTypes: ["AUTH"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (initialPost: LoginRequest) => ({ url: "auth/login", method: "POST", body: initialPost }),
            transformResponse: (response: ServiceResponse<AuthLoginResponse>) => response.data,
            transformErrorResponse: (response) => {
                return getErrorMessage(response);
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({ url: "auth/logout", method: "POST" }),
            invalidatesTags: ["AUTH"],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authService;
