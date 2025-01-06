import React from "react";
import AvatarName from "../AvatarName";
import TimeAgo from "../TimeAgo";
import { GetPostCommentsResponse } from "@/services/post";

type BlogCommentsListProps = {
    comments: GetPostCommentsResponse[];
};

export default function BlogCommentsList({ comments }: BlogCommentsListProps) {
    return (
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
    );
}
