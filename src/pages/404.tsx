import React from "react";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1>404 - Page Not Found</h1>
            <Link href="/data-discovery">Back to home</Link>
        </div>
    );
}
