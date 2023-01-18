import { createSlice } from "@reduxjs/toolkit";

const computedTotalCount = (state) =>
  (state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0));

const computedTotalPrice = (state) =>
  (state.totalPrice = state.items.reduce(
    (sum, obj) => sum + obj.price * obj.count,
    0
  ));

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, actions) {
      const findItem = state.items.find(
        (item) => item.id === actions.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }

      computedTotalPrice(state);
      computedTotalCount(state);
    },

    minusItem(state, action) {
      const findItem = state.items.find((i) => i.id === action.payload.id);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        computedTotalPrice(state);
        computedTotalCount(state);
      }
    },

    deleteItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      computedTotalPrice(state);
      computedTotalCount(state);
    },

    clearCart(state) {
      state.items = [];
      computedTotalPrice(state);
      computedTotalCount(state);
    },
  },
});

export const selectCart = (state) => state.cart;

export const { setItems, minusItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
