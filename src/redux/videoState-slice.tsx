import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  savedCurrentTime: number;
  savedStartTime: number;
  savedEpisode: string;
  savedAnimeTitle: string;
}

const initialState: initialStateInterface = {
  savedCurrentTime: 0,
  savedStartTime: 0,
  savedEpisode: "",
  savedAnimeTitle: "",
};

export const videoSlice = createSlice({
  name: "videoState",
  initialState: initialState,
  reducers: {
    setSavedCurrentTime: (state, action: PayloadAction<number>) => {
      state.savedCurrentTime = action.payload;
    },
    setSavedStartTime: (state, action: PayloadAction<number>) => {
      state.savedStartTime = action.payload;
    },
    setSavedEpisode: (state, action: PayloadAction<string>) => {
      state.savedEpisode = action.payload;
    },
    setSavedAnimeTitle: (state, action: PayloadAction<string>) => {
      state.savedAnimeTitle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSavedCurrentTime,
  setSavedStartTime,
  setSavedEpisode,
  setSavedAnimeTitle,
} = videoSlice.actions;

export default videoSlice.reducer;
