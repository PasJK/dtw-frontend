import React from "react";
import { Chip } from "@mui/material";
import AvatarName from "./AvatarName";

type BlogProps = {
    title: string;
    community: string;
    author: string;
    contents: string;
    totalComments: number;
    searchValue: string;
    isFirst: boolean;
};

export const Blog = ({
    author,
    community,
    title,
    contents,
    totalComments,
    searchValue,
    isFirst,
}: BlogProps): React.JSX.Element => {
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
            className={`w-10/12 sm:w-full xs:w-full border-0 first:rounded-t-xl border-[#BBC2C0] p-4 bg-white mb-0.5 ${
                isFirst ? "rounded-t-xl" : ""
            }`}
        >
            <div className="flex items-center gap-3 mb-3">
                <AvatarName name={author || ""} />
                <span>{author}</span>
            </div>
            <Chip label={community} className="mb-2" />
            <h2 className="text-xl font-semibold mb-2">{highlightTitle()}</h2>
            <p className="text-gray-700 mb-3 line-clamp-3">{contents}</p>
            <div className="flex items-center text-[#939494] text-sm space-x-2">
                <span className="material-symbols-outlined">sms</span>
                <span>{totalComments} Comments</span>
            </div>
        </div>
    );
};
