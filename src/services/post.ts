import { createApi } from "@reduxjs/toolkit/query/react";
import { commonBaseQuery } from "@/utils/commonBaseQuery";
import { ServiceResponse, ServiceResponseWithMeta } from "./types/serviceResponseType";

export type GetPostsResponse = {
    id: string;
    title: string;
    contents: string;
    author: string;
    community: string;
    totalComments: number;
    createdAt: string;
};

export type GetAllPostsParams = {
    page?: number;
    perPage?: number;
    orderBy?: string;
    order?: string;
    search?: string;
    community?: string;
};

export type GetPostCommentsParams = {
    page?: number;
    perPage?: number;
};

export type GetPostCommentsResponse = {
    id: string;
    message: string;
    author: string;
    createdAt: string;
};

export type CreateCommentParams = {
    postId: string;
    message: string;
};

export type GetCommunityListResponse = {
    name: string;
    key: string;
};

export type CreatePostParams = {
    community: string;
    title: string;
    contents: string;
};

export const postService = createApi({
    reducerPath: "postService",
    baseQuery: commonBaseQuery(),
    tagTypes: ["POSTS"],
    endpoints: builder => ({
        createPost: builder.mutation<ServiceResponse<GetPostsResponse>, CreatePostParams>({
            query: ({ community, title, contents }) => ({
                url: "/posts",
                method: "POST",
                body: { community, title, contents },
            }),
            invalidatesTags: () => [{ type: "POSTS", id: "CREATE_POST" }],
        }),
        getAllPosts: builder.query<ServiceResponseWithMeta<GetPostsResponse[]>, GetAllPostsParams>({
            query: ({ page, perPage, orderBy, order, search, community }) => {
                const queryParams = new URLSearchParams();
                if (page) queryParams.set("page", page.toString());
                if (perPage) queryParams.set("perPage", perPage.toString());
                if (orderBy) queryParams.set("orderBy", orderBy);
                if (order) queryParams.set("order", order);
                if (order) {
                    queryParams.set("order", order === "asc" ? "ASC" : "DESC");
                    queryParams.set("orderBy", orderBy || "createdAt");
                }

                if (search) queryParams.set("search", search);
                if (community) queryParams.set("community", community);

                return {
                    url: `/posts?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            transformResponse: (response: ServiceResponseWithMeta<GetPostsResponse[]>) => ({
                data: response.data,
                meta: response.meta,
            }),
            providesTags: [
                { type: "POSTS", id: "CREATE_COMMENT" },
                { type: "POSTS", id: "GET_COMMENTS" },
            ],
        }),
        getPostById: builder.query<GetPostsResponse, string>({
            query: id => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
            transformResponse: (response: ServiceResponse<GetPostsResponse>) => response.data,
            providesTags: [
                { type: "POSTS", id: "CREATE_COMMENT" },
                { type: "POSTS", id: "GET_COMMENTS" },
            ],
        }),
        getPostComments: builder.query<
            ServiceResponseWithMeta<GetPostCommentsResponse[]>,
            { id: string; params: GetPostCommentsParams }
        >({
            query: ({ id, params }) => {
                const queryParams = new URLSearchParams();
                if (params.page) queryParams.set("page", params.page.toString());
                if (params.perPage) queryParams.set("perPage", params.perPage.toString());

                return {
                    url: `/posts/${id}/comments?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            transformResponse: (response: ServiceResponseWithMeta<GetPostCommentsResponse[]>) => ({
                data: response.data,
                meta: response.meta,
            }),
            providesTags: [
                { type: "POSTS", id: "CREATE_COMMENT" },
                { type: "POSTS", id: "GET_COMMENTS" },
            ],
        }),
        createComment: builder.mutation<ServiceResponse<GetPostCommentsResponse>, CreateCommentParams>({
            query: ({ postId, message }) => ({
                url: `/posts/${postId}/comment`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: () => [{ type: "POSTS", id: "CREATE_COMMENT" }],
        }),
        getCommunityList: builder.query<GetCommunityListResponse[], void>({
            query: () => ({
                url: "/posts/communities/dropdown",
                method: "GET",
            }),
            transformResponse: (response: ServiceResponse<GetCommunityListResponse[]>) => response.data,
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useGetPostCommentsQuery,
    useCreateCommentMutation,
    useGetCommunityListQuery,
    useCreatePostMutation,
} = postService;
