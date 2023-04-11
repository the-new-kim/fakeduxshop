import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const CART = "cart";

interface ICartItem {
  id: number;
  quantity: number;
}

interface ICartState {
  cartItems: ICartItem[];
  subtotal: number;
}

const initialState: ICartState = { cartItems: [], subtotal: 0 };

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<ICartItem>) {
      const addToCart = (cartItems: ICartItem[], newItem: ICartItem) => {
        const itemIndex = cartItems.findIndex((item) => item.id === newItem.id);
        if (itemIndex === -1) {
          cartItems.push(newItem);
        } else {
          cartItems[itemIndex].quantity += newItem.quantity;
        }
        return cartItems;
      };

      const newCart = addToCart(state.cartItems, action.payload);

      state.cartItems = newCart;

      localStorage.setItem(CART, JSON.stringify(newCart));
    },

    initCart(state) {
      const localStorageCart = localStorage.getItem(CART);
      if (localStorageCart) {
        state.cartItems = JSON.parse(localStorageCart);
      } else {
        localStorage.setItem(CART, JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { setCart, initCart } = cartSlice.actions;
export default cartSlice.reducer;
