import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice'


const persistConfig = {
  key: 'root',
  storage: storageSession, // Use sessionStorage
};

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type storeType = typeof store