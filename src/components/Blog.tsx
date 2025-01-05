import React from "react";
import AvatarName from "./AvatarName";

type BlogProps = {
    key: string;
    author: string;
    category: string;
    title: string;
    excerpt: string;
    commentCount: number;
};

export const Blog = ({ key, author, category, title, excerpt, commentCount }: BlogProps): React.JSX.Element => {
    return (
        <div key={key} className="border-b pb-6">
            <div className="flex items-center gap-3 mb-3">
                <AvatarName name={author || ""} />
                <span>{author}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">{category}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-3">{excerpt}</p>
            <div className="flex items-center text-gray-500 text-sm">
                <span>{commentCount} Comments</span>
            </div>
        </div>
    );
};
