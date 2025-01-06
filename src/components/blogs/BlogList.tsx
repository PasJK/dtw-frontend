import React from "react";
import { Typography } from "@mui/material";
import { GetAllPostsParams, GetPostsResponse } from "@/services/post";
import { BlogPost } from "./BlogPost";

type BlogListProps = {
    postList: GetPostsResponse[];
    condition: GetAllPostsParams;
    handlePostClick: (id: string) => void;
};

export default function BlogList({ postList, condition, handlePostClick }: BlogListProps) {
    return postList.length > 0 ? (
        postList.map((post, index) => (
            <BlogPost
                key={post.id}
                author={post.author}
                community={post.community}
                title={post.title}
                contents={post.contents}
                totalComments={post.totalComments}
                isFirst={index === 0}
                searchValue={condition.search || ""}
                onClick={() => handlePostClick(post.id)}
            />
        ))
    ) : (
        <div className="flex justify-center">
            <Typography variant="h5">NOT FOUND</Typography>
        </div>
    );
}
