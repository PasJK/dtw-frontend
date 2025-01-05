import React from "react";
import { Box, Typography } from "@mui/material";
import { AppLogo } from "@/components/AppLogo";

export const LogoSidebar: React.FC = () => {
    return (
        <Box className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
            <Box className="text-center">
                <AppLogo variant="full" />
                <Typography variant="h5" className="text-white mt-4">
                    DTW-Test
                </Typography>
            </Box>
        </Box>
    );
};
