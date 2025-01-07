import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import THEME from "@/styles/MUITheme";
import { persistor, store } from "@/configs/apiStore";
import { RouteProps, COMBINED_ROUTES } from "@/configs/route";
import "../styles/globals.css";
import HomeLayout from "@/layouts/home";

const AppLayout = ({
    pageObj,
    mainClass,
    component,
}: {
    pageObj: RouteProps | undefined;
    mainClass: string;
    component: React.JSX.Element;
}) => {
    return (
        <div className={mainClass}>{pageObj?.layout === "home" ? <HomeLayout>{component}</HomeLayout> : component}</div>
    );
};

type AppOwnProps = { mainClass: string };
const MyApp = ({ Component, pageProps, mainClass }: AppProps & AppOwnProps) => {
    const router = useRouter();
    const { pathname } = router;
    const pageObj: RouteProps | undefined = COMBINED_ROUTES.find(item => item.url === pathname);

    useEffect(() => {
        const preventPath = ["/404"];
        if (!preventPath.includes(router?.pathname)) {
            router.push(router.asPath);
        }
    }, [router.pathname]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={THEME}>
                    <Head>
                        <link rel="icon" sizes="32x32" type="image/png" href="/assets/icons/logo.png" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" />
                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                        />
                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                        />
                        <title>DTW-Test</title>
                    </Head>
                    <div className={`${mainClass} bg-blue-50`}>
                        <AppLayout pageObj={pageObj} mainClass={mainClass} component={<Component {...pageProps} />} />
                    </div>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
    const ctx = await App.getInitialProps(context);
    return { ...ctx, mainClass: "min-h-screen" };
};

export default MyApp;
