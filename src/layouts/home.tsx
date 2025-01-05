import Link from "next/link";
import React from "react";
import { Box, Typography, Button, Menu, MenuItem, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MAIN_MENU } from "@/configs/route";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import AvatarName from "@/components/AvatarName";
import { useLogoutMutation } from "@/services/auth";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoggedIn } = useCurrentUser();
    const [responseError, setResponseError] = React.useState<string | null>(null);
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            handleCloseMenu();
        } catch (error) {
            setResponseError(error as string);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleMenuClick(event);
        }
    };

    const renderTopNav = () => {
        return (
            <Box className="h-14 bg-[#2A3B2D] px-6 flex items-center justify-between">
                <Snackbar
                    open={!!responseError}
                    onClose={() => setResponseError(null)}
                    message={responseError}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
                <div className="flex items-center gap-4">
                    <Typography className="text-white italic">a Board</Typography>
                </div>
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <div
                                className={`flex items-center gap-2 ${isMobile ? "hidden" : ""}`}
                                onClick={handleMenuClick}
                                onMouseEnter={handleMenuClick}
                                onKeyDown={handleMenuKeyDown}
                                tabIndex={0}
                                role="button"
                                aria-haspopup="true"
                            >
                                <AvatarName name={user?.username || ""} />
                            </div>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button
                                variant="contained"
                                className="bg-[#6B9B7C] hover:bg-[#5a8369] text-white normal-case"
                            >
                                Sign In
                            </Button>
                        </Link>
                    )}
                    {isMobile && <MenuIcon className="text-white cursor-pointer" onClick={toggleSidebar} />}
                </div>
            </Box>
        );
    };

    const renderLeftSidebar = () => {
        if (isMobile && !isSidebarOpen) return null;

        return (
            <Box
                className={`${isMobile ? "fixed top-0 right-0 z-50 h-full w-3/4 bg-[#243831] text-[#BBC2C0]" : "w-64 bg-[#BBC2C0] text-[#243831]"}  p-6`}
            >
                <div className="flex flex-col gap-6">
                    {isMobile && (
                        <span
                            className="material-symbols-outlined text-2xl cursor-pointer"
                            onClick={toggleSidebar}
                            onMouseEnter={toggleSidebar}
                            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                                e.key === "Enter" && toggleSidebar(e.currentTarget)
                            }
                            tabIndex={0}
                            role="button"
                            aria-haspopup="true"
                        >
                            arrow_forward
                        </span>
                    )}
                    {MAIN_MENU.map(item => {
                        const { slug, title, url, icon } = item;
                        return (
                            <Link key={slug} href={url} className="flex items-center gap-3  hover:text-gray-900">
                                {icon && <span className="material-symbols-outlined text-2xl">{icon as string}</span>}
                                <Typography className="text-base">{title}</Typography>
                            </Link>
                        );
                    })}
                </div>
            </Box>
        );
    };

    const renderMainContent = () => {
        return <div className="flex flex-1 flex-col p-4">{children}</div>;
    };

    return (
        <Box className="flex flex-col min-h-screen">
            {renderTopNav()}
            <Box className="flex flex-row flex-1">
                {renderLeftSidebar()}
                {renderMainContent()}
            </Box>
        </Box>
    );
}
