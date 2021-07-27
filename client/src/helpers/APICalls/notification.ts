import { NotificationApiData } from '../../interface/Notification';
import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  receiver: string;
  body?: string;
}
async function createNotification(body: string): Promise<NotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body,
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}
//When a user submits something, it notifies the contest owner
export async function createSubmitNotification({ receiver, body }: Props): Promise<NotificationApiData> {
  return createNotification(JSON.stringify({ receiver, body, notificationType: 'submit' }));
}
//When someone messages to receiver
//body is the message text
export async function createMessageNotification({ receiver, body }: Props): Promise<NotificationApiData> {
  return createNotification(JSON.stringify({ receiver, body, notificationType: 'message' }));
}
