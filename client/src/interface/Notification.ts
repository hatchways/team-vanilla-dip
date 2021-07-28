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

export interface NotificationApiData {
  notification?: Notification;
  status?: string;
}
