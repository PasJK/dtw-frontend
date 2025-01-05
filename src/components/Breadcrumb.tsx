import React from "react";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";

export interface BreadcrumbItem {
    key: string;
    label: string;
    link?: string;
    onClick?: () => void;
}

interface BreadcrumbProps {
    data: BreadcrumbItem[];
}

export default function Breadcrumb({ data }: BreadcrumbProps) {
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="text-xs">
            {data?.map(item => {
                const { key, label, link, onClick } = item;
                if (link) {
                    return (
                        <Link
                            onClick={onClick ? onClick : () => {}}
                            href={link}
                            className="hover:underline"
                            key={`breadcrumb-link-${key}`}
                        >
                            {label || "-"}
                        </Link>
                    );
                }

                return (
                    <Typography
                        key={`breadcrumb-text-${key}`}
                        color="text.primary"
                        className={`${onClick ? "cursor-pointer" : ""} text-xs`}
                        onClick={onClick ? onClick : () => {}}
                    >
                        {label || "-"}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
}
