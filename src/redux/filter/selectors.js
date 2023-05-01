const selectFilter = (state) => state.filter;
const selectCategory = (state) => state.filter.category;
const selectSort = (state) => state.filter.sort;
const selectSearch = (state) => state.filter.search;
const selectPage = (state) => state.filter.page;
const selectTotalPages = (state) => state.filter.totalPages;

export { selectFilter, selectCategory, selectSort, selectSearch, selectPage, selectTotalPages };
