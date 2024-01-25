import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  // data:[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItem: (state) => {
      state.count += 1;
    },
    // addProduct(state, action) {
    //   state.data = action.payload;
    // },
  },
});

export default cartSlice.reducer;
export const { incrementItem, addProduct } = cartSlice.actions;
