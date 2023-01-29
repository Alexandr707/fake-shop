import { ProductData } from "./../../@types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLs, saveToLs, totalPrice } from "./helpers";

export type ProdAmount = {
  product: ProductData;
  count: number;
};

export type CartState = {
  products: ProdAmount[];
  total: number;
};

const initialState: CartState = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart(state) {
      state.products = loadFromLs<ProdAmount[]>("products");
      state.total = totalPrice(state.products);
    },
    addProduct(state, action: PayloadAction<ProductData>) {
      const idx = state.products.findIndex(
        (p) => p.product.id === action.payload.id
      );
      if (idx >= 0) {
        state.products[idx].count += 1;
      } else {
        state.products.push({
          product: action.payload,
          count: 1,
        });
      }

      state.total = totalPrice(state.products);
      saveToLs("products", state.products);
    },
    subtractProduct(state, action: PayloadAction<ProductData>) {
      const prodCount = state.products.find(
        (el) => el.product.id === action.payload.id
      );
      if (prodCount) {
        if (prodCount.count > 1) {
          prodCount.count -= 1;
        } else {
          state.products = state.products.filter(
            (pr) => pr.product.id !== action.payload.id
          );
        }
      }
      state.total = totalPrice(state.products);
      saveToLs("products", state.products);
    },
    removeProduct(state, action: PayloadAction<ProductData>) {
      state.products = state.products.filter(
        (pr) => pr.product.id !== action.payload.id
      );

      state.total = totalPrice(state.products);
      saveToLs("products", state.products);
    },
  },
});

export const { addProduct, removeProduct, subtractProduct, initCart } =
  cartSlice.actions;

export default cartSlice.reducer;
