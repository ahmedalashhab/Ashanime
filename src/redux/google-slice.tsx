import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface profileObject {
  googleId: number;
  name: string;
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
}

interface initialStateInterface {
  profileObject: profileObject;
}

const initialState: initialStateInterface = {
  profileObject: {
    googleId: 0,
    email: "",
    givenName: "",
    familyName: "",
    picture: "",
    name: "",
  },
};

export const googleSlice = createSlice({
  name: "google",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<profileObject>) => {
      state.profileObject = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = googleSlice.actions;

export default googleSlice.reducer;
