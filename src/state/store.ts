import { configureStore } from "@reduxjs/toolkit";
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
/* import NetInfo from '@react-native-community/netinfo';

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ['authSlice']
}; */

/* const persistedReducer = persistReducer(persistConfig, rootReducer) */

export const store = configureStore({
  reducer: rootReducer,
  /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }), */
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Persist the store
/* export const persistor = persistStore(store); */

// NetInfo.addEventListener((state) =>  {
//   if(!state.isConnected) {
//     //persist the store when offline
//     store.subscribe(() => {
//       console.log("this is persistStore", store.getState());
//       });
//      persistor.persist();
//   }
// })