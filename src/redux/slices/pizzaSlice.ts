import { PizzaBlockProps } from "./../../components/PizzaBlock";
import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type FetchPizzaType = {
  category: string;
  order: string;
  orderBy: string;
  search: string;
  currentPage: number;
};

interface PizzaSliceState {
  items: PizzaBlockProps[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<PizzaBlockProps[], FetchPizzaType>(
  "pizza/fetchPizzaStatus",
  async ({ category, order, orderBy, search, currentPage }) => {
    const { data } = await axios.get<PizzaBlockProps[]>(
      `https://6393398dab513e12c507abcf.mockapi.io/items?page=${currentPage}&limit=4${search}&${category}&orderBy=${orderBy}&order=${order}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
