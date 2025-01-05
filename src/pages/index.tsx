import React from "react";
import HomeLayout from "@/layouts/home";

export default function Home() {
    return (
        <HomeLayout>
            <div className="flex flex-col text-center md:text-left md:flex-row justify-center min-h-96 mt-16 md:mt-0 md:ml-8">
                HOME
            </div>
        </HomeLayout>
    );
}
