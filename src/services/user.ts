import { createApi } from "@reduxjs/toolkit/query/react";
import { commonBaseQuery } from "@/utils/commonBaseQuery";

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: commonBaseQuery(),
    tagTypes: ["USER"],
    endpoints: (builder) => ({}),
});

export const {} = userService;
