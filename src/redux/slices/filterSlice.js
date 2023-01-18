import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setQuery(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setQuery,
  setSearchValue,
} = categorySlice.actions;

export default categorySlice.reducer;
