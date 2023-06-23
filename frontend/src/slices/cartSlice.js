import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // reducer takes in two objects: state and action
    addToCart: (state, action) => {
      const item = action.payload; // action.payload gives the item to be added
      const existItem = state.cartItems.find((x) => x._id === item._id); // check if the item is already in the cart
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        ); // ensures that the item in the cart with the matching _id is updated with the latest information (eg. qty)
      } else {
        state.cartItems = [...state.cartItems, item]; // we don't use .push(), because state is immutable
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shipingAddress = action.payload;
      return updateCart(state); // update cart and store info in localstorage
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;
export default cartSlice.reducer;
