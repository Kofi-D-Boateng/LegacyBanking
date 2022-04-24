import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  view: string;
  paperless: boolean | undefined;
} {
  return {
    view: "",
    paperless: undefined,
  };
}

const modalSlice = createSlice({
  name: "views",
  initialState: initialState(),
  reducers: {
    setView(state, action: PayloadAction<{ view: string }>) {
      const { view } = action.payload;
      state.view = view;
    },
    setPaperless(state, action: PayloadAction<{ paperless: boolean }>) {
      const { paperless } = action.payload;
      state.paperless = paperless;
    },
  },
});

const modalActions = modalSlice.actions;

export { modalActions, modalSlice };
