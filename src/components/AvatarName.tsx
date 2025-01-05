import React from "react";

interface AvatarNameProps {
    name: string;
    bgColor?: string;
    textColor?: string;
}

export default function AvatarName({ name, bgColor = "bg-gray-300", textColor = "text-lg" }: AvatarNameProps) {
    return (
        <div className={`w-10 h-10 ${bgColor} ${textColor} rounded-md justify-center items-center flex`}>
            {name.charAt(0).toUpperCase()}
        </div>
    );
}
