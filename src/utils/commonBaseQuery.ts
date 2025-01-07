import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiErrorResponse<T> {
    serviceMessage?: string;
    statusCode?: number;
    data?: T;
    serviceCode?: string;
}

export const commonBaseQuery = () => {
    return fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
        prepareHeaders: headers => {
            return headers;
        },
    });
};
export const getErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== "object" || !("data" in error)) {
        return "Something went wrong";
    }

    const apiError = error.data as ApiErrorResponse<string | Record<string, string>>;

    if (apiError?.serviceCode === "E401") {
        return "Session expired";
    }

    if (apiError?.data) {
        if (typeof apiError.data === "string") {
            return apiError.data;
        }

        if (typeof apiError.data === "object") {
            const firstErrorMessage = Object.values(apiError.data)[0];
            return firstErrorMessage || "Something went wrong";
        }
    }

    return apiError.serviceMessage || "Something went wrong";
};
