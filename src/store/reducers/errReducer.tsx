import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INITIAL_STATE_I {
  err: object;
}

const INITIAL_STATE: INITIAL_STATE_I = {
  err: {},
};

const errSlice = createSlice({
  name: "error",
  initialState: INITIAL_STATE,
  reducers: {
    setErr: (state, action: PayloadAction<object>) => {
      state.err = action.payload;
    },
  },
});

const errReducer = errSlice.reducer;

export const { setErr } = errSlice.actions;

export default errReducer;
