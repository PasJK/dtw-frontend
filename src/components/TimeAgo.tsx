import React from "react";

export type StatusType = "active" | "inactive" | "pending";

interface TimeAgoProps {
    date: string;
    className?: string;
}

const timeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
        { unit: "year", seconds: 31536000 },
        { unit: "month", seconds: 2592000 },
        { unit: "week", seconds: 604800 },
        { unit: "day", seconds: 86400 },
        { unit: "hour", seconds: 3600 },
        { unit: "minute", seconds: 60 },
        { unit: "second", seconds: 1 },
    ];

    const match = intervals.find(interval => {
        const count = Math.floor(seconds / interval.seconds);
        return count >= 1;
    });

    if (match) {
        const count = Math.floor(seconds / match.seconds);
        return count === 1 ? `1 ${match.unit} ago` : `${count} ${match.unit}s ago`;
    }

    return "just now";
};

export default function TimeAgo({ date, className = "text-gray-500" }: TimeAgoProps) {
    if (!date) return <span className={className}>-</span>;
    const formattedTime = timeAgo(new Date(date));

    return <span className={className}>{formattedTime}</span>;
}
