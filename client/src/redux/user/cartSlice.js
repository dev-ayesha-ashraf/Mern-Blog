// redux/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  cartCount: 0,  // Track the total number of items in the cart
  cartItems: [], // Optional: if you want to store cart details (products with count)
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to update the cart count
    updateCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    // Action to update cart items if required
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

// Export actions and reducer
export const { updateCartCount, updateCartItems } = cartSlice.actions;
export default cartSlice.reducer;
