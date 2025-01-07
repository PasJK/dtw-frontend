import React, { FC } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import { setAuthLogout, setSessionExpired } from "@/reducer/authSlice";

interface SessionExpiredModal {
    isExpired: boolean;
}

export const SessionExpiredModal: FC<SessionExpiredModal> = ({ isExpired }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(setSessionExpired(false));
        dispatch(setAuthLogout());
        router.push("/login");
    };

    return (
        <Modal open={isExpired} aria-labelledby="session-expired-modal" className="flex items-center justify-center">
            <Box className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
                <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
                    Session Expired
                </Typography>
                <Typography className="text-gray-600 mb-6">
                    Your session has expired. Please log in again to continue.
                </Typography>
                <div className="flex justify-end">
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        className="bg-[#49A569] hover:bg-[#3d7259] text-white"
                    >
                        Log In Again
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
