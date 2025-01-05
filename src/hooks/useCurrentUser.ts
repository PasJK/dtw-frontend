import { useSelector } from "react-redux";
import { RootAuthState } from "@/reducer/authSlice";

export const useCurrentUser = () => {
    return useSelector((state: RootAuthState) => state.auth);
};
