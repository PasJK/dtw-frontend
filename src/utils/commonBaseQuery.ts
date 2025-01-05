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
