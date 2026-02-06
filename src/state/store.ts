import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import onboardingReducer from "../features/onboarding/onboardingSlice";
import paywallReducer from "../features/onboarding/paywallSlice";
import { baseApi } from "../services/api/baseApi";

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  paywall: paywallReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["onboarding", "paywall"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;