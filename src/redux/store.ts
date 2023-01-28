import cartSliceReducer from "./cartslice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSliceReducer from "./productsSlice";
import categorieSliceReducer from "./categories";
import searchSliceReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    products: productsSliceReducer,
    cart: cartSliceReducer,
    categorie: categorieSliceReducer,
    search: searchSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
