import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/reducer/loading";
import { persistStore } from "redux-persist";
import { authService } from "@/services/auth";
import authSlice from "@/reducer/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        loading: loadingReducer,
        [authService.reducerPath]: authService.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types from redux-persist
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat([authService.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
