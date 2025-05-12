import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import storage from './storage';
import { baseApiSlice } from '@/services/base';


const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["auth", "services"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApiSlice.middleware),
});

export const persistor = persistStore(store);

export interface storeType {
  auth: {
      user: {
          role: string[];
          [key: string]: any; // Adjust based on your user structure
      };
      token: string | null;
  };
  persistedApi: any; // Adjust based on your persistedApi structure
  // Other properties of the store
}