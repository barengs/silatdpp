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

export type storeType = typeof store