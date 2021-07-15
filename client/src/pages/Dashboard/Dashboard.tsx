import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';
import DashHeader from '../../components/DashboardHeader/DashHeader';
import Box from '@material-ui/core/Box';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Box width="100%" className={classes.drawerWrapper}>
        <DashHeader />
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
        <Button size="large" variant="outlined" color="primary" className={classes.editProfileButton}>
          Edit profile
        </Button>
        <ProfileTabs />
      </Box>
    </Grid>
  );
}
