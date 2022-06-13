import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const animeSlice = createSlice({
  name: "anime",
  initialState: {
    searchResults: [],
    searchQuery: "",
    hasNextPage: false,
    lastPage: 0,
  },
  reducers: {
    animeSearch: (state, action: PayloadAction<[]>) => {
      state.searchResults = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.hasNextPage = action.payload;
    },
    setLastPage: (state, action: PayloadAction<number>) => {
      state.lastPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { animeSearch } = animeSlice.actions;
export const { setSearchQuery } = animeSlice.actions;
export const { setHasNextPage } = animeSlice.actions;
export const { setLastPage } = animeSlice.actions;

export default animeSlice.reducer;
