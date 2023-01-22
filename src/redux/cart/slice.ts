import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcCart, getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";
import { CartSliceState, CartItem } from "./types";

const { totalPrice, totalCount } = calcCart(getCartFromLS());

const computedTotalCount = (state: CartSliceState) =>
  (state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0));

const computedTotalPrice = (state: CartSliceState) =>
  (state.totalPrice = state.items.reduce(
    (sum, obj) => sum + obj.price * obj.count,
    0
  ));

const initialState: CartSliceState = {
  items: getCartFromLS(),
  totalPrice,
  totalCount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, actions: PayloadAction<CartItem>) {
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

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((i) => i.id === action.payload.id);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        computedTotalPrice(state);
        computedTotalCount(state);
      }
    },

    deleteItem(state, action: PayloadAction<number>) {
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

export const selectCart = (state: RootState) => state.cart;

export const { setItems, minusItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
