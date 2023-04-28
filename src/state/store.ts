import { AnyAction, Reducer, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer as Reducer<unknown, AnyAction>),
});


//const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

// Persist the store
export const persistor = persistStore(store);