import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import FULL_ICON from "../../public/assets/images/logo.png";
import ICON from "../../public/assets/icons/logo.png";

interface AppLogoProps {
    variant: "short" | "full";
}

export const AppLogo = ({ variant = "short" }: AppLogoProps): React.JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = (): void => {
        if (router.pathname === "/blog") return;
        router.push({ pathname: "/blog" });
    };

    switch (variant) {
        case "short":
            return <Image alt="app-logo" src={ICON} className="w-28 cursor-pointer" onClick={handleClick} />;
        case "full":
            return <Image alt="app-logo" src={FULL_ICON} className="w-28 cursor-pointer" onClick={handleClick} />;
        default:
            return <></>;
    }
};
