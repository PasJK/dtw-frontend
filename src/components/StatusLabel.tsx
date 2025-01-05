import React from "react";

export type StatusType = "active" | "inactive" | "pending";

interface StatusLabelProps {
    status: StatusType;
}

const statusColor = {
    active: "bg-green-100 text-green-600",
    inactive: "bg-red-100 text-red-500",
    pending: "bg-orange-50 text-orange-600",
};

export default function StatusLabel({ status }: StatusLabelProps) {
    return <div className={`px-3 py-1 text-sm rounded-md capitalize ${statusColor[status]}`}>{status}</div>;
}
