import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData } from "../../@types";

export type RequestState = "loading" | "loaded" | "error";

export type ProductSlice = {
  products: ProductData[];
  status: RequestState;
  error: string | undefined;
};

const initialState: ProductSlice = {
  products: [],
  status: "loading",
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts/All",
  async (url: string, { rejectWithValue }) => {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status < 200 || response.status > 300) {
      return rejectWithValue(data);
    }

    return data;
  }
);

export const producstSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "loaded";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.products = [];
      state.error = action.meta.requestStatus;
    });
  },
});

export default producstSlice.reducer;
