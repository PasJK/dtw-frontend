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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Blog } from "@/components/Blog";
import { GetAllPostsParams, GetAllPostsResponse, useGetAllPostsQuery } from "@/services/post";

const defaultCondition: GetAllPostsParams = {
    page: 1,
    perPage: 5,
    orderBy: "lastActivityAt",
    order: "desc",
    search: "",
    community: "",
};

export default function BlogPage() {
    const [condition, setCondition] = useState<GetAllPostsParams>(defaultCondition);
    const { data: postDataList } = useGetAllPostsQuery(condition);
    const meta = postDataList?.meta;
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [postList, setPostList] = useState<GetAllPostsResponse[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleCommunityChange = (community: string) => {
        setCondition({ ...condition, community: community !== "all" ? community : undefined });
    };

    const dropdownOptions = [
        { label: "Community", value: "all" },
        { label: "History", value: "history" },
        { label: "Food", value: "food" },
        { label: "Pets", value: "pets" },
        { label: "Health", value: "health" },
        { label: "Fashion", value: "fashion" },
        { label: "Exercise", value: "exercise" },
        { label: "Others", value: "others" },
    ];

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
        const text = event.target.value;

        if (text.length < 3) return;

        setCondition({ ...condition, search: text.trim() });
    };

    useEffect(() => {
        if (!postDataList) return;

        setPostList(postDataList.data);
    }, [postDataList]);

    return (
        <div className="w-11/12 sm:w-full mx-auto p-4">
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
                        defaultValue="all"
                        className="xs:max-w-full xs:flex-grow md:flex-grow-0"
                    >
                        {dropdownOptions.map(option => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                className={`hover:bg-[#D8E9E4] focus:bg-[#D8E9E4] ${
                                    condition.community === option.value ? "bg-[#D8E9E4]" : ""
                                }`}
                                onClick={() => handleCommunityChange(option.value)}
                            >
                                <span className="flex justify-between items-center">
                                    {option.label}
                                    {condition.community === option.value && <span className="ml-2">✓</span>}
                                </span>
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        className="bg-[#49A569] hover:bg-[#3d8a57] text-white normal-case flex items-center gap-2 whitespace-nowrap"
                    >
                        <span>Create</span>
                        <span className="text-xs">+</span>
                    </Button>
                </div>
            </div>

            <div>
                {postList.length > 0 ? (
                    postList.map((post, index) => (
                        <Blog
                            id={post.id}
                            author={post.author}
                            community={post.community}
                            title={post.title}
                            contents={post.contents}
                            totalComments={post.totalComments}
                            isFirst={index === 0}
                        />
                    ))
                ) : (
                    <div className="flex justify-center">
                        <Typography variant="h5">NOT FOUND</Typography>
                    </div>
                )}
            </div>

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
        </div>
    );
}
