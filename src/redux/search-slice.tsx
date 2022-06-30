import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { anime } from "../types/type";

interface initialStateInterface {
  searchResults: anime[];
  searchQuery: string;
  searchQueryView: string;
  searchLoading: boolean;
  pageLoading: boolean;
  hasNextPage: boolean;
  lastPage: number;
  type: string;
  airing: boolean;
  bookmarks: anime[];
  currentPage: number;
}

const initialState: initialStateInterface = {
  searchResults: [],
  searchQuery: "",
  searchQueryView: "",
  searchLoading: false,
  pageLoading: false,
  hasNextPage: false,
  lastPage: 0,
  type: "",
  airing: false,
  bookmarks: [],
  currentPage: 1,
};

export const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    animeSearch: (state, action: PayloadAction<[]>) => {
      state.searchResults = action.payload;
    },
    setPageLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchQueryView: (state, action: PayloadAction<string>) => {
      state.searchQueryView = action.payload;
    },
    setHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.hasNextPage = action.payload;
    },
    searchLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
    setLastPage: (state, action: PayloadAction<number>) => {
      state.lastPage = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setAiring: (state, action: PayloadAction<boolean>) => {
      state.airing = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<anime[]>) => {
      state.bookmarks = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  animeSearch,
  setSearchQuery,
  setSearchQueryView,
  setHasNextPage,
  setLastPage,
  searchLoadingAction,
  setPageLoadingAction,
  setType,
  setAiring,
  setBookmarks,
  setCurrentPage,
} = animeSlice.actions;

export default animeSlice.reducer;
