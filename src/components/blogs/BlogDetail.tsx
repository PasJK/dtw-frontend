import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    IconButton,
    Modal,
    Pagination,
    Snackbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { BlogPost } from "./BlogPost";
import {
    GetPostCommentsParams,
    useCreateCommentMutation,
    useGetPostByIdQuery,
    useGetPostCommentsQuery,
} from "@/services/post";
import BlogCommentsList from "./BlogCommentList";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import CommentForm from "../CommentForm";
import LoginRequired from "../LoginRequired";

type BlogDetailProps = {
    postId: string;
    handleBack: () => void;
};

const defaultGetPostCommentsParams: GetPostCommentsParams = {
    page: 1,
    perPage: 10,
};

type CommentState = "none" | "add" | "mobile";

export const BlogDetail = ({ postId, handleBack }: BlogDetailProps): React.JSX.Element => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const { isLoggedIn } = useCurrentUser();
    const [commentState, setCommentState] = useState<CommentState>("none");
    const [params, setParams] = useState<GetPostCommentsParams>(defaultGetPostCommentsParams);
    const [createComment] = useCreateCommentMutation();
    const [responseError, setResponseError] = useState<string | null>(null);
    const [openAddCommentDialog, setOpenAddCommentDialog] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
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

    const handleAddComment = () => {
        if (!isLoggedIn) {
            setOpenAddCommentDialog(true);
            return;
        }

        setCommentState(isMobile ? "mobile" : "add");
    };

    const handleGoToLogin = () => {
        localStorage.setItem("lasted_active", postId);
        router.push("/login");
    };

    const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleCancelComment = () => {
        setCommentState("none");
    };

    const handleSubmitComment = async () => {
        try {
            await createComment({ postId, message: comment }).unwrap();
            setCommentState("none");
        } catch (error: unknown) {
            setResponseError("Error submitting comment, please try again later.");
        }
    };

    return (
        <div className="mx-auto py-4 md:py-12 px-4 md:px-20 bg-white min-h-screen">
            <Snackbar
                open={!!responseError}
                onClose={() => setResponseError(null)}
                message={responseError}
                autoHideDuration={3000}
            />
            <IconButton onClick={handleBack} className="mb-4 md:mb-6 bg-primary-100 hover:bg-gray-200" size="medium">
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
                <Modal open={commentState === "mobile"} onClose={() => setCommentState("none")}>
                    <CommentForm
                        handleChangeComment={handleChangeComment}
                        handleCancelComment={handleCancelComment}
                        handleSubmitComment={handleSubmitComment}
                        isMobile
                    />
                </Modal>
                {commentState === "add" ? (
                    <CommentForm
                        handleChangeComment={handleChangeComment}
                        handleCancelComment={handleCancelComment}
                        handleSubmitComment={handleSubmitComment}
                    />
                ) : (
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{ textTransform: "none" }}
                        onClick={handleAddComment}
                    >
                        Add Comments
                    </Button>
                )}

                {!isLoadingComments && comments && meta?.totalPage && meta?.totalPage > 0 ? (
                    <BlogCommentsList comments={comments} />
                ) : (
                    <div className="mt-6 text-center">
                        <Typography variant="body2" color="textSecondary">
                            No comments yet
                        </Typography>
                    </div>
                )}
            </div>

            <Modal
                open={openAddCommentDialog}
                onClose={() => setOpenAddCommentDialog(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <LoginRequired handleGoToLogin={handleGoToLogin} handleClose={() => setOpenAddCommentDialog(false)} />
            </Modal>

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
