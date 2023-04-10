import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ICategoryState {
  categories: string[];
  pending: boolean;
  error: boolean;
}

const initialState: ICategoryState = {
  categories: [],
  pending: false,
  error: false,
};

export const getCategories = createAsyncThunk(
  "categorySlice/getCategories",
  async () =>
    await (await fetch("https://fakestoreapi.com/products/categories")).json()
);

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string>) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.categories = payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export const { setCategories } = categorySlice.actions;

export default categorySlice;
