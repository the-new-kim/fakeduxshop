import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface IProductState {
  products: IProduct[];
  search: string;
  filteredProducts: IProduct[];
  pending: boolean;
  error: boolean;
}

const initialState: IProductState = {
  products: [],
  filteredProducts: [],
  search: "",
  pending: false,
  error: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => await (await fetch("https://fakestoreapi.com/products")).json()
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredProducts = state.products.filter(({ title }) =>
        title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.products = payload;
        state.filteredProducts = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export const { setSearch } = productSlice.actions;

export default productSlice;
