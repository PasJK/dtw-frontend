import React, { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    MenuItem,
    Button,
    Pagination,
    Typography,
    useMediaQuery,
    useTheme,
    Modal,
    Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
    GetAllPostsParams,
    GetPostsResponse,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetAllOurPostsQuery,
    useGetCommunityListQuery,
    useUpdatePostMutation,
} from "@/services/post";
import { BlogDetail } from "@/components/blogs/BlogDetail";
import PostsForm, { PostsFormInput, ValidatePostsForm } from "@/components/PostsForm";
import { getErrorMessage } from "@/utils/commonBaseQuery";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BlogPost } from "@/components/blogs/BlogPost";
import ConfirmDelete from "@/components/ConfirmDelete";

const defaultCondition: GetAllPostsParams = {
    page: 1,
    perPage: 5,
    orderBy: "lastActivityAt",
    order: "desc",
    search: "",
    community: "",
    ourPost: true,
};

type ViewState = "list" | "detail";
type ModalState = null | "create" | "edit" | "delete";

export default function OurBlogPage() {
    const router = useRouter();
    const { isLoggedIn } = useCurrentUser();
    const [condition, setCondition] = useState<GetAllPostsParams>(defaultCondition);
    const { data: postDataList, error: postDataError } = useGetAllOurPostsQuery(condition, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    const meta = postDataList?.meta;
    const [createPost] = useCreatePostMutation();
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
    const [postList, setPostList] = useState<GetPostsResponse[]>([]);
    const { data: communityList } = useGetCommunityListQuery();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [viewState, setViewState] = useState<ViewState>("list");
    const [modalState, setModalState] = useState<ModalState>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [formInput, setFormInput] = useState<PostsFormInput>({
        community: "",
        title: "",
        contents: "",
    });
    const [inputError, setInputError] = useState<ValidatePostsForm>({
        community: false,
        title: false,
        contents: false,
    });
    const [postSelectedId, setPostSelectedId] = useState<string | null>(null);
    const handleCommunityChange = (community: string) => {
        setCondition({ ...condition, community: community !== "all" ? community : undefined });
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCondition({ ...condition, page: newPage });
    };

    const handleSearchClick = () => {
        if (isMobile) {
            setIsSearchExpanded(true);
        }
    };

    const handleSearchBlur = () => {
        setIsSearchExpanded(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value.trim();

        if (text.length === 0 || text.length >= 3) {
            setCondition({ ...condition, search: text });
        }
    };

    const handlePostClick = (id: string) => {
        setViewState("detail");
        setPostSelectedId(id);
        setCondition({ ...condition, search: "" });
    };
    const validateInput = (input: PostsFormInput): ValidatePostsForm => {
        const errors: ValidatePostsForm = {
            community: !input.community,
            title: !input.title,
            contents: !input.contents,
        };

        setInputError(errors);
        return errors;
    };

    const handleCreatePost = async () => {
        const errors = validateInput(formInput);
        const hasErrors = Object.values(errors).some(error => error);

        if (!hasErrors) {
            try {
                await createPost(formInput).unwrap();
                setModalState(null);
                setFormInput({
                    community: "",
                    title: "",
                    contents: "",
                });
            } catch (error) {
                setErrorMessage(getErrorMessage(error));
            }
        }
    };

    const handleUpdatePost = async () => {
        if (!postSelectedId) return;

        const errors = validateInput(formInput);
        const hasErrors = Object.values(errors).some(error => error);

        if (!hasErrors) {
            try {
                await updatePost({ id: postSelectedId, ...formInput }).unwrap();
                setModalState(null);
            } catch (error) {
                setErrorMessage(getErrorMessage(error));
            }
        }
    };

    const handleDeletePost = async () => {
        if (!postSelectedId) return;

        try {
            await deletePost(postSelectedId).unwrap();
            setModalState(null);
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        }
    };

    const handleOpenEditModal = (id: string) => {
        setPostSelectedId(id);
        setModalState("edit");
    };

    const handleOpenDeleteModal = (id: string) => {
        setPostSelectedId(id);
        setModalState("delete");
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/blog");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (postDataError) {
            setErrorMessage(getErrorMessage(postDataError));
        }
    }, [postDataError]);

    useEffect(() => {
        if (!postDataList) return;

        setPostList(postDataList.data);
    }, [postDataList]);

    useEffect(() => {
        if (modalState === "edit") {
            setFormInput({
                ...formInput,
                community: postDataList?.data.find(post => post.id === postSelectedId)?.community ?? "",
                title: postDataList?.data.find(post => post.id === postSelectedId)?.title ?? "",
                contents: postDataList?.data.find(post => post.id === postSelectedId)?.contents ?? "",
            });
        }
    }, [modalState, postDataList]);

    return (
        <div className={` sm:w-full mx-auto ${viewState === "detail" ? "h-screen w-full" : "w-11/12 p-4"}`}>
            <Snackbar
                open={!!errorMessage}
                message={errorMessage}
                onClose={() => setErrorMessage("")}
                autoHideDuration={6000}
            />
            {viewState === "list" ? (
                <>
                    <div className="flex flex-row gap-2 md:items-center md:gap-6 mb-6 w-10/12 xs:w-full sm:w-full">
                        <TextField
                            fullWidth
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onClick={handleSearchClick}
                            onBlur={handleSearchBlur}
                            onChange={handleSearchChange}
                            className={` xs:transition-all xs:duration-300
                        ${isSearchExpanded ? "sm:min-w-full xs:min-w-full" : "min-w-96 xs:min-w-12"}
                    `}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div
                            className={`
                    flex items-center gap-3
                    xs:transition-opacity xs:duration-300
                    ${isSearchExpanded ? "xs:invisible xs:h-0" : ""}
                `}
                        >
                            <TextField
                                select
                                size="small"
                                value={condition.community || "all"}
                                onChange={e => handleCommunityChange(e.target.value)}
                                className="xs:max-w-full xs:flex-grow md:flex-grow-0"
                            >
                                {communityList?.map(option => (
                                    <MenuItem
                                        key={option.key}
                                        value={option.key}
                                        className={`hover:bg-[#D8E9E4] focus:bg-[#D8E9E4] ${
                                            condition.community === option.key ? "bg-[#D8E9E4]" : ""
                                        }`}
                                    >
                                        <span className="flex justify-between w-full items-center">
                                            {option.name}
                                            {condition.community === option.key && <span className="ml-2">✓</span>}
                                        </span>
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                variant="contained"
                                className="bg-[#49A569] hover:bg-[#3d8a57] text-white normal-case flex items-center gap-2 whitespace-nowrap"
                                onClick={() => setModalState("create")}
                            >
                                <span>Create</span>
                                <span className="text-xs">+</span>
                            </Button>
                        </div>
                    </div>
                    {postList.length > 0 ? (
                        postList.map((post, index) => (
                            <BlogPost
                                key={post.id}
                                author={post.author}
                                community={post.community}
                                title={post.title}
                                contents={post.contents}
                                totalComments={post.totalComments}
                                isFirst={index === 0}
                                isLast={index === postList.length - 1}
                                searchValue={condition.search || ""}
                                onClick={() => handlePostClick(post.id)}
                                handleEdit={() => handleOpenEditModal(post.id)}
                                handleDelete={() => handleOpenDeleteModal(post.id)}
                                canEdit
                            />
                        ))
                    ) : (
                        <div className="flex justify-center">
                            <Typography variant="h5">NOT FOUND</Typography>
                        </div>
                    )}
                </>
            ) : (
                postSelectedId && <BlogDetail postId={postSelectedId} handleBack={() => setViewState("list")} />
            )}

            {modalState && ["create", "edit"].includes(modalState) && (
                <Modal open={!!modalState} onClose={() => setModalState(null)}>
                    <PostsForm
                        mode={modalState === "edit" ? "edit" : "create"}
                        handleCancelPost={() => setModalState(null)}
                        handleSubmitPost={modalState === "edit" ? handleUpdatePost : handleCreatePost}
                        onSelectCommunity={community => setFormInput({ ...formInput, community })}
                        onTitleChange={inputTitle => setFormInput({ ...formInput, title: inputTitle })}
                        onContentsChange={inputContents => setFormInput({ ...formInput, contents: inputContents })}
                        inputError={inputError}
                        isMobile={isMobile}
                        postId={modalState === "edit" ? postSelectedId : null}
                    />
                </Modal>
            )}

            {modalState === "delete" && (
                <Modal open={!!modalState} onClose={() => setModalState(null)}>
                    <ConfirmDelete
                        textLine1="Please confirm if you wish to"
                        textLine2="delete this post"
                        textLine3="Are you sure you want to delete this post?"
                        textLine4="Once deleted, it cannot be recovered."
                        handleCancel={() => setModalState(null)}
                        handleConfirm={handleDeletePost}
                        isMobile={isMobile}
                    />
                </Modal>
            )}

            {viewState === "list" && (
                <div className="fixed bottom-0 left-0 right-0 bg-white">
                    <div className="w-10/12 md:w-8/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 py-4 border-t px-4 md:px-0">
                        <Typography className="text-sm md:text-base">
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
            )}
        </div>
    );
}
