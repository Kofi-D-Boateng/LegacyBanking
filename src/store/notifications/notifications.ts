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
  unread: number;
} {
  return {
    notis: [],
    unread: 0,
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
      state.notis = notis.length > 0 ? notis.reverse() : state.notis;
      state.unread = 0;
      for (const n of notis) {
        if (n.read === false) {
          state.unread = state.unread + 1;
        }
      }
    },
  },
});

const notisActions = notisSlice.actions;

export { notisActions, notisSlice };
