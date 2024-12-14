"use client";
import {
  configureStore,
  combineReducers,
  Action,
  Reducer,
} from "@reduxjs/toolkit";
import { api } from "../app/api";
import authReducer from "../components/Auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  PersistConfig,
  PersistState,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { version } from "react";
import { createWrapper } from "next-redux-wrapper";

declare module "redux-persist" {
  export function persistReducer<S, A extends Action = Action, P = S>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A, P>,
  ): Reducer<
    S & { _persist: PersistState },
    A,
    P & { _persist?: PersistState }
  >;
}

const rootPersistConfig: PersistConfig<
  ReturnType<typeof rootReducer>,
  unknown,
  unknown,
  unknown
> = {
  key: "root",
  version: 1,
  storage,
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
    preloadedState,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
//export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

//export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
