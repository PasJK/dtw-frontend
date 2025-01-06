import React from "react";
import { Chip } from "@mui/material";
import AvatarName from "../AvatarName";
import TimeAgo from "../TimeAgo";

type BlogPostProps = {
    title: string;
    community: string;
    author: string;
    contents: string;
    totalComments: number;
    isFirst?: boolean;
    onClick?: () => void;
    searchValue?: string;
    fullContent?: boolean;
    createdAt?: string;
};

export const BlogPost = ({
    author,
    community,
    title,
    contents,
    totalComments,
    isFirst,
    onClick,
    searchValue,
    fullContent,
    createdAt,
}: BlogPostProps): React.JSX.Element => {
    const highlightTitle = () => {
        if (!searchValue) return title;
        const parts = title.split(new RegExp(`(${searchValue})`, "gi"));
        return parts.map(part =>
            part.toLowerCase() === searchValue.toLowerCase() ? (
                <span key={part} className="bg-[#C5A365]">
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    return (
        <div
            className={`w-10/12 sm:w-full xs:w-full border-0 first:rounded-t-xl border-[#BBC2C0] ${fullContent ? "px-1" : "p-4"} bg-white mb-0.5 ${
                isFirst ? "rounded-t-xl" : ""
            }`}
        >
            <div className="flex items-center gap-3 mb-3">
                <AvatarName name={author || ""} showStatus={fullContent} />
                <span>{author}</span>
                {createdAt && (
                    <span className="text-xs text-[#939494]">
                        <TimeAgo date={createdAt} />
                    </span>
                )}
            </div>
            <Chip label={community} className="mb-2" />
            <span
                className={`flex items-center text-xl font-semibold mb-2 ${fullContent ? "cursor-default" : "cursor-pointer hover:underline hover:text-[#C5A365]"} `}
                onClick={!fullContent ? onClick : undefined}
                onKeyDown={!fullContent ? onClick : undefined}
            >
                {highlightTitle()}
            </span>
            <p className={`text-gray-700 mb-6 ${fullContent ? "" : "line-clamp-3"}`}>{contents}</p>
            <div
                className={`flex items-center text-[#939494] text-sm space-x-2 ${fullContent ? "cursor-default" : "cursor-pointer hover:text-[#C5A365]"}`}
                onClick={!fullContent ? onClick : undefined}
                onKeyDown={!fullContent ? onClick : undefined}
            >
                <span className="material-symbols-outlined">sms</span>
                <span>{totalComments} Comments</span>
            </div>
        </div>
    );
};
