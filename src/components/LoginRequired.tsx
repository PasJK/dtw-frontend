import React from "react";
import { Button, Typography } from "@mui/material";

interface LoginRequiredProps {
    handleGoToLogin: () => void;
    handleClose: () => void;
}

export default function LoginRequired({ handleGoToLogin, handleClose }: LoginRequiredProps) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-[400px] bg-white shadow-2xl p-6 rounded-lg text-center">
            <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4">
                Login Required
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mb-6">
                Please login to your account to add a comment.
            </Typography>
            <div className="flex gap-3 justify-center">
                <Button variant="outlined" color="inherit" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" onClick={handleGoToLogin} className="text-white">
                    Login
                </Button>
            </div>
        </div>
    );
}
