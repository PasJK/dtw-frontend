import React from "react";
import { Button } from "@mui/material";

interface PostsFormProps {
    textLine1: string;
    textLine2: string;
    textLine3: string;
    textLine4: string;
    handleCancel: () => void;
    handleConfirm: () => void;
    isMobile?: boolean;
}

export default function ConfirmDelete({
    textLine1,
    textLine2,
    textLine3,
    textLine4,
    handleCancel,
    handleConfirm,
    isMobile,
}: PostsFormProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full md:w-1/2 bg-white rounded-xl p-6 relative max-w-lg">
                <div className="flex flex-col gap-2 justify-center items-center text-center mb-4">
                    {textLine1 && <span className="text-xl font-medium text-center">{textLine1}</span>}
                    {textLine2 && <span className="text-xl font-medium text-center">{textLine2}</span>}
                    {textLine3 && <span className="text-base text-gray-600 text-center">{textLine3}</span>}
                    {textLine4 && <span className="text-base text-gray-600 text-center">{textLine4}</span>}
                </div>
                <div
                    className={`flex ${isMobile ? "flex-col gap-2" : "flex-row gap-6"} justify-center max-w-md mx-auto`}
                >
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        className={`${isMobile ? "w-full order-2" : "w-1/2"} rounded-lg py-3`}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        className={`${isMobile ? "w-full order-1" : "w-1/2"} rounded-lg py-3 bg-red-500 hover:bg-red-600`}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
