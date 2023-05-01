import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  sort: 0,
  search: '',
  page: 1,
  totalPages: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.page = initialState.page;
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearch(state, action) {
      state.page = initialState.page;
      state.search = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setFilters(state, action) {
      const { search, sort, category, page } = action.payload;
      if (search) state.search = search;
      if (sort) state.sort = sort;
      if (category) state.category = category;
      if (page) state.page = page;
    },
  },
});

export const { setCategory, setSort, setPage, setTotalPages, setSearch, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
