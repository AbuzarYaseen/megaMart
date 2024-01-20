import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementItem: (state) => {
      state.count += 1;
    },
  },
});

export default cartSlice.reducer;
export const {incrementItem} = cartSlice.actions;
