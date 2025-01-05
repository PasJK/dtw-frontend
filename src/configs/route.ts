import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface RouteProps {
    key: string;
    slug: string;
    url: string;
    layout?: "home" | "admin";
    title?: string | null | undefined;
    isAuth?: boolean;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | string;
}

export const MAIN_MENU: RouteProps[] = [
    {
        key: "blog",
        slug: "blog",
        url: "/blog",
        title: "Home",
        layout: "home",
        isAuth: true,
        icon: "home",
    },
    {
        key: "our-blog",
        slug: "our-blog",
        url: "/our-blog",
        title: "Our Blog",
        layout: "home",
        isAuth: true,
        icon: "edit_square",
    },
];

export const MAIN_ROUTES: RouteProps[] = [
    {
        key: "login",
        slug: "login",
        url: "/login",
        title: "Login",
        isAuth: false,
    },
];

export const COMBINED_ROUTES: RouteProps[] = [...MAIN_MENU, ...MAIN_ROUTES];
