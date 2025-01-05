import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "./TextInput";

interface LoginFormProps {
    loginBody: {
        email: {
            value: string;
            isError: boolean;
            helperText: string;
        };
        password: {
            value: string;
            isError: boolean;
            helperText: string;
        };
    };
    errorMessage: string;
    onInputChange: (value: string, type: "email" | "password") => void;
    onLoginViaEmailSubmit: (e: React.FormEvent) => void;
    onForgotPassword: () => void;
    onLoginViaGoogle?: () => void;
    onLoginViaMicrosoft?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    loginBody,
    errorMessage,
    onInputChange,
    onLoginViaEmailSubmit,
    onForgotPassword,
    onLoginViaGoogle,
    onLoginViaMicrosoft,
}) => {
    const withThirdPartyLogin = onLoginViaGoogle || onLoginViaMicrosoft;

    return (
        <Box className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-0">
            <Box className="w-full max-w-md">
                <Typography variant="h4" className="text-center font-semibold mb-2">
                    Welcome to DTW-Test
                </Typography>

                <form onSubmit={onLoginViaEmailSubmit}>
                    <Box className="space-y-4">
                        <div className="flex flex-col text-center">
                            {errorMessage && <small className="text-error">{errorMessage}</small>}
                        </div>
                        <Box className="space-y-2">
                            <TextInput
                                title="Email"
                                placeholder="Email"
                                value={loginBody.email.value}
                                isError={loginBody.email.isError}
                                helperText={loginBody.email.helperText}
                                onChange={(e) => onInputChange(e, "email")}
                                require
                            />
                        </Box>

                        <Box className="space-y-2">
                            <TextInput
                                type="password"
                                title="Password"
                                placeholder="Password"
                                value={loginBody.password.value}
                                isError={loginBody.password.isError}
                                helperText={loginBody.password.helperText}
                                onChange={(e) => onInputChange(e, "password")}
                                require
                            />
                        </Box>

                        <Button type="submit" fullWidth variant="contained" className="bg-primary py-3">
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};
