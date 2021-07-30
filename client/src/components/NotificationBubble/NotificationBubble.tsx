import { Popover, Typography, Button, Box, AppBar } from '@material-ui/core';
import { Notification } from '../../interface/Notification';
import { useNotifications } from '../../context/useNotificationContext';
import { Ref, useState } from 'react';
const NotificationBubble = (): JSX.Element => {
  const { allNotifications, readNotification } = useNotifications();
  const handleClick = (notification: Notification) => {
    readNotification(notification);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleTogglePopover = (event: any) => {
    event.preventDefault();
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  return (
    <Box>
      {allNotifications.map((notification) => {
        return (
          <Popover
            key={notification.id}
            open={true}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography>{notification.notificationType}</Typography>
            onClose={handleTogglePopover}s
          </Popover>
        );
      })}
    </Box>
  );
};

export default NotificationBubble;
