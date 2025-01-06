import React, { useState } from "react";
import { Button, Chip, CircularProgress, IconButton, Pagination, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BlogPost } from "./BlogPost";
import { GetPostCommentsParams, useGetPostByIdQuery, useGetPostCommentsQuery } from "@/services/post";
import AvatarName from "../AvatarName";
import TimeAgo from "../TimeAgo";

type BlogDetailProps = {
    postId: string;
    handleBack: () => void;
};

const defaultGetPostCommentsParams: GetPostCommentsParams = {
    page: 1,
    perPage: 10,
};

export const BlogDetail = ({ postId, handleBack }: BlogDetailProps): React.JSX.Element => {
    const [params, setParams] = useState<GetPostCommentsParams>(defaultGetPostCommentsParams);
    const { data, isLoading } = useGetPostByIdQuery(postId, { skip: !postId });
    const { data: commentResponse, isLoading: isLoadingComments } = useGetPostCommentsQuery(
        { id: postId, params },
        { skip: !postId },
    );
    const comments = commentResponse?.data;
    const meta = commentResponse?.meta;

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setParams({ ...params, page });
    };

    return (
        <div className="mx-auto py-4 md:py-12 px-4 md:px-20 bg-white min-h-screen">
            <IconButton onClick={handleBack} className="mb-4 md:mb-6 bg-[#D8E9E4] hover:bg-gray-200" size="medium">
                <ArrowBackIcon />
            </IconButton>

            {!isLoading && data ? (
                <BlogPost
                    key={data.id}
                    author={data.author}
                    community={data.community}
                    title={data.title}
                    contents={data.contents}
                    totalComments={data.totalComments}
                    createdAt={data.createdAt}
                    fullContent
                />
            ) : (
                <div className="flex justify-center">
                    <CircularProgress color="success" />
                </div>
            )}

            <div className="mt-4 md:mt-6">
                <Button variant="outlined" color="success" sx={{ textTransform: "none" }}>
                    Add Comments
                </Button>

                {!isLoadingComments && comments && meta?.totalPage && meta?.totalPage > 0 ? (
                    <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="py-3 md:p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AvatarName name={comment.author} />
                                    <span className="text-sm">{comment.author}</span>
                                    <span className="text-gray-500 text-xs">
                                        <TimeAgo date={comment.createdAt} />
                                    </span>
                                </div>
                                <div className="pl-8 md:pl-10">
                                    <span className="text-[#191919] text-sm">{comment.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 text-center">
                        <Typography variant="body2" color="textSecondary">
                            No comments yet
                        </Typography>
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white">
                <div className="w-full md:w-8/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 py-3 md:py-4 border-t px-4">
                    <Typography className="text-xs md:text-base">
                        Page {meta?.page} of {meta?.totalPage}
                    </Typography>
                    <Pagination
                        count={meta?.totalPage ?? 1}
                        page={meta?.page ?? 1}
                        onChange={handleChangePage}
                        color="primary"
                        showFirstButton
                        showLastButton
                        size="small"
                        siblingCount={0}
                        className="scale-90 md:scale-100"
                    />
                </div>
            </div>
        </div>
    );
};
