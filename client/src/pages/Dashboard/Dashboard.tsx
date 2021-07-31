import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Typography, Button } from '@material-ui/core';

import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import ProfileTabs from '../../components/ProfileTabs/ProfileTabs';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const { initSocket } = useSocket();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Box width="100%" className={classes.drawerWrapper}>
        <Navbar />
        <AvatarDisplay
          style={{
            height: '100px',
            width: '100px',
          }}
          loggedIn={true}
          user={loggedInUser}
        />
        <Typography className={classes.largeUsername} component="h1" variant="h5">
          {loggedInUser.username}
        </Typography>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          className={classes.editProfileButton}
          component={Link}
          to="/profile/"
        >
          Edit profile
        </Button>
        <ProfileTabs />
      </Box>
    </Grid>
  );
}
