import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationDetails } from "../../types/Notification";

function initialState(): NotificationDetails {
  return {
    notifications: [],
    numberOfUnreadNotifications: 0,
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
      state.notifications =
        notis.length > 0 ? notis.reverse() : state.notifications;
      state.numberOfUnreadNotifications = 0;
      for (const n of notis) {
        if (n.read === false) {
          state.numberOfUnreadNotifications =
            state.numberOfUnreadNotifications + 1;
        }
      }
    },
  },
});

const notisActions = notisSlice.actions;

export { notisActions, notisSlice };
