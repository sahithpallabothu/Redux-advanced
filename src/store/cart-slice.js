import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartslice",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartChanged:false
  },
  reducers: {
    replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((x) => x.id === newItem.id);
      state.totalQuantity++;
      state.cartChanged=true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((x) => x.id === id);
      state.totalQuantity--;
      state.cartChanged=true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((x) => x.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
