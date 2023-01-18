import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async ({ category, order, orderBy, search, currentPage }) => {
    const { data } = await axios.get(
      `https://6393398dab513e12c507abcf.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&orderBy=${orderBy}&order=${order}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
