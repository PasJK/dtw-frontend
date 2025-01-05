import Link from "next/link";
import React from "react";
import { Box, Typography } from "@mui/material";
import { MAIN_MENU } from "@/configs/route";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const renderLeftSidebar = () => {
        return (
            <Box className="w-20 p-4 min-h-screen bg-white border-r shadow-sm">
                <div className="flex flex-col gap-4 items-center">
                    {MAIN_MENU.map((item) => {
                        const { slug, key, url, icon } = item;
                        return (
                            <Link key={slug} href={url} className="flex flex-col items-center gap-2">
                                {icon && <span className="material-symbols-outlined">{icon as string}</span>}
                                <Typography variant="caption" className="text-xs text-center">
                                    {key}
                                </Typography>
                            </Link>
                        );
                    })}
                </div>
            </Box>
        );
    };

    const renderMainContent = () => {
        return <div className="flex flex-1 flex-col">{children}</div>;
    };

    return (
        <Box className="bg-blue-50 flex flex-row">
            {renderLeftSidebar()}
            {renderMainContent()}
        </Box>
    );
}
