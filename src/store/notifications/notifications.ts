import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification, NotificationDetails } from "../../types/Notification";

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
    setNotifications(
      state,
      action: PayloadAction<{
        notis: Notification[];
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
    updateNotification(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
  },
});

const notisActions = notisSlice.actions;

export { notisActions, notisSlice };
