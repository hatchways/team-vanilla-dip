enum NotificationType {
  message = 'message',
  submit = 'submit',
}
export interface Notification {
  sender: string;
  receiver: string;
  notificationType: NotificationType;
  content?: string;
}

export interface SingleNotificationApiData {
  notification?: Notification;
  status?: string;
}
export interface ArrayNotificationApiData {
  notifications: Notification[];
  status?: string;
}
