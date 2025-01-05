import React from "react";
import { TextField, Button } from "@mui/material";

export default function Login() {
    return (
        <div className="min-h-screen bg-[#1e3a2d] flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full">
                    <div className="bg-[#2d4d3c] h-[50vh] rounded-b-3xl p-4 lg:p-6 mb-6 lg:hidden">
                        <div className="text-center">
                            <div className="mx-auto mt-20 mb-4 w-1/2">
                                <img
                                    src="/assets/icons/logo.png"
                                    alt="Board Icon"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-white italic ">a Board</p>
                        </div>
                    </div>
                    <div className="flex flex-col mx-auto lg:w-1/2 space-y-4 lg:p-2 p-4">
                        <h2 className="text-2xl font-medium text-white text-left">Sign in</h2>

                        <div className="flex flex-col space-y-4 lg:items-center justify-center ">
                            <TextField
                                fullWidth
                                placeholder="Username"
                                variant="outlined"
                                className="bg-white rounded"
                                size="small"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                className="min-h-10 bg-[#49A569] hover:bg-[#3d7259] normal-case py-1 text-base"
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#2d4d3c] rounded-l-[48px]">
                <div className="text-center">
                    <div className="mx-auto w-48 h-48 mb-4">
                        <img src="/assets/icons/logo.png" alt="Board Icon" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-white italic text-xl">a Board</p>
                </div>
            </div>
        </div>
    );
}
