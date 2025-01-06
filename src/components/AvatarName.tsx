import React from "react";

interface AvatarNameProps {
    name: string;
    bgColor?: string;
    textColor?: string;
}

export default function AvatarName({ name, bgColor = "bg-[#6B9B7C]", textColor = "text-white" }: AvatarNameProps) {
    return (
        <div className={`w-10 h-10 ${bgColor} ${textColor} rounded-full justify-center items-center flex text-lg`}>
            {name.slice(0, 2).toUpperCase()}
        </div>
    );
}
