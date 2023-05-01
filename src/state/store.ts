import { AnyAction, Reducer, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import NetInfo from '@react-native-community/netinfo';

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    rootReducer as Reducer<unknown, AnyAction>
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }),
});

//const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

NetInfo.addEventListener((state) =>  {
  if(!state.isConnected) {
    //persist the store when offline
    persistor.persist;
    console.log('this is offline', persistor)
  }
})

// Persist the store
export const persistor = persistStore(store);
