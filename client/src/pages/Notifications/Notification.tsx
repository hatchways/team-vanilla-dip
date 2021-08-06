import React from 'react';
import { Grid, Typography, Box, Paper, Avatar } from '@material-ui/core';
import { useNotifications } from '../../context/useNotificationContext';
import SidePanel from '../../components/SidePanel/SidePanel';

import useStyles from './useStyles';

function Notification(): JSX.Element {
  const { allNotifications, readNotification } = useNotifications();
  const classes = useStyles();

  allNotifications.map((notification) => {
    readNotification(notification);
  });

  return (
    <SidePanel>
      <Grid>
        <Typography component="h2" variant="h2">
          Notification
        </Typography>
        <Grid container spacing={2}>
          {allNotifications.map((notification) => (
            <Grid item md={6} sm={12} key={notification.id}>
              <Paper>
                <Box p={2}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      {notification.content != undefined && (
                        <Avatar
                          alt={'Placeholder for profile username'}
                          src={JSON.parse(notification.content)['image']}
                          className={classes.avatar}
                        ></Avatar>
                      )}
                    </Grid>
                    <Grid item>
                      {notification.content != undefined && (
                        <Typography component="p">{JSON.parse(notification.content)['message']}</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </SidePanel>
  );
}

export default Notification;
