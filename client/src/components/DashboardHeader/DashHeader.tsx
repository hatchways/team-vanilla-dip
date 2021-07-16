import useStyles from './useStyle';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/useAuthContext';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

const DashHeader = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  return (
    <Box p={1} className={classes.dashboardHeader}>
      <Box flexGrow={1}>
        <Typography variant="h1" className={classes.title}>
          TATTOO ART
        </Typography>
      </Box>
      <Button color="secondary">Discover</Button>
      <Button color="secondary">Messages</Button>
      <Button color="secondary">Notifications</Button>
      <Button color="secondary" className={classes.createContestBtn} variant="outlined">
        Create Contest
      </Button>
      {loggedInUser != null && <AvatarDisplay loggedIn={true} user={loggedInUser} />}
      <Button color="secondary">Account</Button>
    </Box>
  );
};

export default DashHeader;
