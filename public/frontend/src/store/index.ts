import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authReducer from './authSlice';
import servicesReducer from './servicesSlice'
import storage from './storage';


const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["auth", "services"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["someSlice.nonSerializableValue"],
      },
    }),
});

export const persistor = persistStore(store);

export type storeType = typeof store