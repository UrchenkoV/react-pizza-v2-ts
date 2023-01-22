import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortItemProps = {
  title: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceState {
  categoryId: number;
  sort: SortItemProps;
  currentPage: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    title: "Популярности (Убыванию)",
    sortProperty: "rating",
  },
  currentPage: 1,
  searchValue: "",
};

export const categorySlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setQuery(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setQuery,
  setSearchValue,
} = categorySlice.actions;

export default categorySlice.reducer;
