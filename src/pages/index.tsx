import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import HomeLayout from "@/layouts/home";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/blog");
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col text-center md:text-left md:flex-row justify-center min-h-96 mt-16 md:mt-0 md:ml-8">
                <CircularProgress />
            </div>
        </HomeLayout>
    );
}
