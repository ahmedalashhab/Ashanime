import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { anime, streamModal, streamSearch } from "../types/type";
import { streamDataState } from "../components/Shared/initialDataState";

interface initialStateInterface {
  searchResults: streamSearch[];
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
  modalData: streamModal;
  stream: any;
  streamId: string;
  episodeSelected: boolean;
  genre: string;
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
  modalData: {
    ...streamDataState,
  },
  stream: {},
  streamId: "",
  episodeSelected: false,
  genre:"action",
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
    setModalData: (state, action: PayloadAction<streamModal>) => {
      state.modalData = action.payload;
    },
    setStream: (state, action: PayloadAction<any>) => {
      state.stream = action.payload;
    },
    setStreamId: (state, action: PayloadAction<string>) => {
      state.streamId = action.payload;
    },
    setEpisodeSelected: (state, action: PayloadAction<boolean>) => {
      state.episodeSelected = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
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
  setModalData,
  setStream,
  setStreamId,
  setEpisodeSelected,
  setGenre
} = animeSlice.actions;

export default animeSlice.reducer;
