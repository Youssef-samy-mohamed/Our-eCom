import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import cart from "./cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishList/wishListSlice";
import auth from "./auth/authSlice";
import orders from "./orders/orderSlice";




const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
}


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
}

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"], // Persist only the items inside the cart 
};





const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  orders,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: wishlist,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these actions to prevent the warning
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
