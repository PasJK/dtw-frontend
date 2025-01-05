import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiErrorResponse<T> {
    serviceMessage?: string;
    statusCode?: number;
    data?: T;
}

export const commonBaseQuery = () => {
    return fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
        prepareHeaders: (headers) => {
            return headers;
        },
    });
};


export const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error.data as ApiErrorResponse<string>;

        return apiError.serviceMessage || "Something went wrong";
    }
    return "Something went wrong";
};