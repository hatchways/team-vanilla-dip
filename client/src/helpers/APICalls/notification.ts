import { ArrayNotificationApiData, SingleNotificationApiData } from '../../interface/Notification';
import { FetchOptions } from '../../interface/FetchOptions';

interface CreateNotificationProps {
  receiver: string;
  content?: string;
}
interface Props {
  id: string;
}
async function createNotification(body: string): Promise<SingleNotificationApiData> {
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
export async function createSubmitNotification({
  receiver,
}: CreateNotificationProps): Promise<SingleNotificationApiData> {
  return createNotification(JSON.stringify({ receiver, notificationType: 'submit' }));
}
//When someone messages to receiver
//body is the message text
export async function createMessageNotification({
  receiver,
  content,
}: CreateNotificationProps): Promise<SingleNotificationApiData> {
  return createNotification(JSON.stringify({ receiver, content, notificationType: 'message' }));
}
//When someone messages to receiver
//body is the message text
export async function fetchAllNotificationByUserId(): Promise<ArrayNotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}

export async function markNotificationRead({ id }: Props): Promise<SingleNotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`/notification/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
}
