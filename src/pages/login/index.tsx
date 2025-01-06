import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import Validator from "@/utils/validator";
import { useLoginMutation } from "@/services/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Login() {
    const router = useRouter();
    const [login] = useLoginMutation();
    const { isLoggedIn } = useCurrentUser();
    const [username, setUsername] = useState<string>("");
    const [responseError, setResponseError] = useState<string>("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const validateLogin = (usernameInput: string) => {
        if (usernameInput.length < 3) {
            setResponseError("Username must be at least 3 characters.");
            return;
        }

        if (!Validator.username(usernameInput)) {
            setResponseError("Username must be only English and number.");
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponseError("");
        validateLogin(username);

        try {
            await login({ username }).unwrap();
        } catch (error: unknown) {
            setResponseError(error as string);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/blog");
        }
    }, [isLoggedIn]);

    return !isLoggedIn ? (
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

                        <div className="flex flex-col space-y-4">
                            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                                <TextField
                                    fullWidth
                                    placeholder="Username"
                                    variant="outlined"
                                    className="bg-white rounded"
                                    onChange={handleUsernameChange}
                                    value={username}
                                    error={!!responseError}
                                    helperText={responseError}
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="min-h-10 bg-[#49A569] hover:bg-[#3d7259] normal-case py-1 text-base"
                                >
                                    Sign In
                                </Button>
                            </form>
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
    ) : (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    );
}
