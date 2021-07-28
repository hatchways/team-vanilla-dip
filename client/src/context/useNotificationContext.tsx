import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuthContext';
import { fetchAllNotificationByUserId } from '../helpers/APICalls/notification';
import { Notification } from '../interface/Notification';

interface INotificationContext {
  readonly allNotifications: Notification[];
}

export const NotificationContext = createContext<INotificationContext>({
  allNotifications: [],
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
    <NotificationContext.Provider value={{ allNotifications: allNotifications || [] }}>
      {children}
    </NotificationContext.Provider>
  );
};
export function useNotifications(): INotificationContext {
  return useContext(NotificationContext);
}
