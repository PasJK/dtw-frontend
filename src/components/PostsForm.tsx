import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField, MenuItem } from "@mui/material";
import { useGetCommunityListQuery, useGetPostByIdQuery } from "@/services/post";

export interface PostsFormInput {
    community: string;
    title: string;
    contents: string;
}

export interface ValidatePostsForm {
    community: boolean;
    title: boolean;
    contents: boolean;
}

interface PostsFormProps {
    mode?: "create" | "edit";
    handleCancelPost: () => void;
    handleSubmitPost: () => void;
    inputError: ValidatePostsForm;
    onSelectCommunity: (community: string) => void;
    onTitleChange: (title: string) => void;
    onContentsChange: (contents: string) => void;
    isMobile?: boolean;
    postId?: string | null;
}

export default function PostsForm({
    mode,
    handleCancelPost,
    handleSubmitPost,
    inputError,
    onSelectCommunity,
    onTitleChange,
    onContentsChange,
    isMobile,
    postId,
}: PostsFormProps) {
    const { data: postData } = useGetPostByIdQuery(postId as string, {
        skip: mode !== "edit" || !postId,
    });
    const { data: communityList } = useGetCommunityListQuery();
    const [selectedCommunity, setSelectedCommunity] = useState("");
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        if (mode !== "edit" || !postData) return;

        setSelectedCommunity(postData?.community ?? "");
        setTitle(postData?.title ?? "");
        setContents(postData?.contents ?? "");
    }, [mode, postData]);

    const disabledUpdate =
        postData?.community === selectedCommunity && postData?.title === title && postData?.contents === contents;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full md:w-1/2 bg-white rounded-xl p-4 md:p-6 relative max-w-lg">
                <IconButton onClick={handleCancelPost} className="absolute top-0 right-2 text-gray">
                    ×
                </IconButton>
                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <h3 className="text-xl font-medium">{mode === "create" ? "Create Post" : "Edit Post"}</h3>
                </div>

                <TextField
                    select
                    size="small"
                    defaultValue=""
                    value={selectedCommunity}
                    onChange={e => {
                        setSelectedCommunity(e.target.value);
                        onSelectCommunity(e.target.value);
                    }}
                    className={`mb-4 ${isMobile ? "w-full" : "w-2/4"} rounded-lg`}
                    label="Choose a community"
                    color="success"
                    variant="outlined"
                    error={inputError.community}
                    helperText={inputError.community ? "Please select a community" : ""}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": {
                                borderColor: "#49A569",
                                fontWeight: "bold",
                                color: "#49A569",
                            },
                        },
                    }}
                >
                    {communityList
                        ?.filter(community => community.key !== "all")
                        .map(community => (
                            <MenuItem key={community.key} value={community.key}>
                                <span className="flex justify-between w-full items-center" key={community.key}>
                                    {community.name}
                                    {selectedCommunity === community.key && <span>✓</span>}
                                </span>
                            </MenuItem>
                        ))}
                </TextField>

                <TextField
                    size="small"
                    placeholder="Title"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                        onTitleChange(e.target.value);
                    }}
                    className="mb-4 w-full"
                    color="success"
                    variant="outlined"
                    error={inputError.title}
                    helperText={inputError.title ? "Please enter a title" : ""}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": {
                                borderColor: "#DADADA",
                            },
                        },
                    }}
                />
                <TextField
                    multiline
                    rows={4}
                    placeholder="What's on your mind..."
                    value={contents}
                    onChange={e => {
                        setContents(e.target.value);
                        onContentsChange(e.target.value);
                    }}
                    className="mb-6 w-full"
                    color="success"
                    variant="outlined"
                    error={inputError.contents}
                    helperText={inputError.contents ? "Please enter a contents" : ""}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": {
                                borderColor: "#DADADA",
                            },
                        },
                    }}
                />
                <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3 justify-end`}>
                    <Button
                        variant="outlined"
                        onClick={handleCancelPost}
                        className={`${isMobile ? "w-full" : "w-1/3 md:w-1/6"} rounded-lg`}
                        color="success"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitPost}
                        className={`${isMobile ? "w-full" : "w-1/3 md:w-1/6"} rounded-lg text-white`}
                        color="success"
                        disabled={mode === "edit" && disabledUpdate}
                    >
                        {mode === "edit" ? "Confirm" : "Post"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
