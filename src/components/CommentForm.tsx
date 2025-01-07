import React from "react";
import { Button, IconButton } from "@mui/material";

interface CommentFormProps {
    handleChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCancelComment: () => void;
    handleSubmitComment: () => void;
    isMobile?: boolean;
}

export default function CommentForm({
    handleChangeComment,
    handleCancelComment,
    handleSubmitComment,
    isMobile,
}: CommentFormProps) {
    return !isMobile ? (
        <div className="w-full rounded-lg p-2 bg-white">
            <div className="w-full border rounded-lg mb-4">
                <textarea
                    rows={4}
                    placeholder="What's on your mind..."
                    className="w-full p-3 rounded-lg focus:outline-none"
                    onChange={handleChangeComment}
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outlined" color="success" onClick={handleCancelComment}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleSubmitComment} className="text-white">
                    Post
                </Button>
            </div>
        </div>
    ) : (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-11/12 bg-white rounded-xl p-6 relative">
                <IconButton onClick={handleCancelComment} className="absolute top-0 right-2 text-gray">
                    ×
                </IconButton>
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-medium">Add Comments</h3>
                </div>
                <textarea
                    rows={4}
                    placeholder="What's on your mind..."
                    className="w-full p-4 mb-6 rounded-2xl border border-gray-200 focus:outline-none"
                    onChange={handleChangeComment}
                />
                <div className="flex flex-col gap-3">
                    <Button
                        variant="outlined"
                        onClick={handleCancelComment}
                        className="w-full py-3 rounded-lg"
                        color="success"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitComment}
                        className="w-full py-3 rounded-lg text-white"
                        color="success"
                    >
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
}
