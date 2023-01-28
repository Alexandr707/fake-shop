import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type CategoryState = {
  list: string[];
  current: number | undefined;
};

const initialState: CategoryState = {
  list: [],
  current: undefined,
};

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (url: string, { rejectWithValue }) => {
    const response = await fetch(url);
    const data: string[] = await response.json();

    if (!response.ok) {
      return rejectWithValue(data);
    }

    return data;
  }
);

const categorieSlice = createSlice({
  name: "categorie",
  initialState,
  reducers: {
    setCategorie(state, action: PayloadAction<number>) {
      if (action.payload < state.list.length) {
        state.current = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.list = [];
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.list = ["All", ...action.payload];
        state.current = 0;
      }
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.list = [];
      state.current = undefined;
    });
  },
});

export default categorieSlice.reducer;

export const { setCategorie } = categorieSlice.actions;
