import { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuthContext';
import { fetchAllNotificationByUserId, markNotificationRead } from '../helpers/APICalls/notification';
import { Notification } from '../interface/Notification';

interface INotificationContext {
  readonly allNotifications: Notification[];
  readNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  allNotifications: [],
  readNotification: async (notification: Notification) => {
    return await markNotificationRead({ id: notification.id });
  },
});
export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  // get all Notifications and submission by userID
  useEffect(() => {
    if (loggedInUser) {
      const getAllNotificationByUserId = async () => {
        const result = await fetchAllNotificationByUserId();
        setAllNotifications(result.notifications);
      };
      getAllNotificationByUserId();
    }
  }, [loggedInUser]);
  const [allNotifications, setAllNotifications] = useState<Notification[]>();
  return (
    <NotificationContext.Provider
      value={{
        allNotifications: allNotifications || [],
        readNotification: useCallback(async (notification: Notification) => {
          return await markNotificationRead({ id: notification.id });
        }, []),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export function useNotifications(): INotificationContext {
  return useContext(NotificationContext);
}
