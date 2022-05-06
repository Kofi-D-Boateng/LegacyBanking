import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  notis: {
    _id: string;
    sender: string;
    receiver: string;
    amount: number;
    date: string;
    read: boolean;
  }[];
} {
  return {
    notis: [],
  };
}

const notisSlice = createSlice({
  name: "notification",
  initialState: initialState(),
  reducers: {
    getNotis(
      state,
      action: PayloadAction<{
        notis: {
          _id: string;
          sender: string;
          receiver: string;
          amount: number;
          date: string;
          read: boolean;
        }[];
      }>
    ) {
      const { notis } = action.payload;
      state.notis = notis ? notis : state.notis;
    },
  },
});

const notisActions = notisSlice.actions;

export { notisActions, notisSlice };
