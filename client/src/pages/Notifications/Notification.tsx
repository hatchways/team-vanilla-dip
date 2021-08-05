import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useNotifications } from '../../context/useNotificationContext';
import SidePanel from '../../components/SidePanel/SidePanel';

function Notification(): JSX.Element {
  const { allNotifications, readNotification } = useNotifications();
  return (
    <SidePanel>
      <Grid>
        <Typography component="h2" variant="h2">
          Notification
        </Typography>
        <Grid container>
          {allNotifications.map((notification) => (
            <Grid item key={notification.id}>
              <Box my={2}>
                <Typography component="p">{notification.notificationType}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </SidePanel>
  );
}

export default Notification;
