import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";
import { combineReducers } from "redux";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "todos"], 
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
