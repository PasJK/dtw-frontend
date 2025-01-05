import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/reducer/loading";
import { userService } from "@/services/user";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        [userService.reducerPath]: userService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types from redux-persist
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat([userService.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
