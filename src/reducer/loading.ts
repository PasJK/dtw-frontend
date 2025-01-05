import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        displayBackdrop: state => {
            state.value = true;
        },
        hideBackdrop: state => {
            state.value = false;
        },
    },
});

export const { displayBackdrop, hideBackdrop } = loadingSlice.actions;
export default loadingSlice.reducer;
