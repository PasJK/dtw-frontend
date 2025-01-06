import React from "react";

interface AvatarNameProps {
    name: string;
    bgColor?: string;
    textColor?: string;
    showStatus?: boolean;
}

export default function AvatarName({
    name,
    bgColor = "bg-[#6B9B7C]",
    textColor = "text-white",
    showStatus = false,
}: AvatarNameProps) {
    return (
        <div className="relative">
            <div className={`w-10 h-10 ${bgColor} ${textColor} rounded-full justify-center items-center flex text-lg`}>
                {name.slice(0, 2).toUpperCase()}
            </div>
            {showStatus && (
                <div className="absolute bottom-0 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
        </div>
    );
}
