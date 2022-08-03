export type Notification = {
  _id: string;
  sender: string;
  receiver: string;
  amount: number;
  date: string;
  read: boolean;
};

export type NotificationDetails = {
  notifications: Notification[];
  numberOfUnreadNotifications: number;
};
