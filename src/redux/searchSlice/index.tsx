import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchValue = {
  value: string;
};

const initialState: SearchValue = {
  value: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    clearSearchValue(state) {
      state.value = "";
    },
  },
});

export const { clearSearchValue, setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
