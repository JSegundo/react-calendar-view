import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import stationsReducer from "./stationSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, stationsReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
