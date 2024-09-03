import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { usersSlice } from "./users.slice";

const rootReducer = combineReducers({
    users: usersSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export const dispatch = store.dispatch.bind(store);
export type TState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
export type AppDispatch = typeof store.dispatch;