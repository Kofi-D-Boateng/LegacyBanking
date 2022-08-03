export interface NotificationDetails {
  notifications: {
    _id: string;
    sender: string;
    receiver: string;
    amount: number;
    date: string;
    read: boolean;
  }[];
  numberOfUnreadNotifications: number;
}
