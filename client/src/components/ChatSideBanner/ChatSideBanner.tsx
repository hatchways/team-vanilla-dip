import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import AuthMenu from '../AuthMenu/AuthMenu';

interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser }: Props): JSX.Element => {
  const classes = useStyles();
  const submissionId = '60f3ea7aafec9515544adf23';

  return (
    <Grid className={classes.chatSideBanner}>
      <Box className={classes.userPanel}>
        <Link to={`/contest/${submissionId}`}>Submission</Link>
        <AvatarDisplay loggedIn />
        <Typography className={classes.userText} variant="h5">
          {loggedInUser.username}
        </Typography>
        <AuthMenu />
      </Box>
      <Box>
        <Typography className={classes.chatTitle} variant="h5">
          Users
        </Typography>
      </Box>
    </Grid>
  );
};

export default ChatSideBanner;
