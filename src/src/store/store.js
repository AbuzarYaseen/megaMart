import cartSlice from "../slices/cartSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const cartPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartSlice,
});

const persistedCartReducer = persistReducer(cartPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedCartReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistedStore = persistStore(store);

export default store;
export { persistedStore };
