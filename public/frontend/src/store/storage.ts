import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

const storage = typeof window !== "undefined"
  ? createWebStorage("session") // Use localStorage if available
  : createNoopStorage(); // Fallback for SSR

export default storage;