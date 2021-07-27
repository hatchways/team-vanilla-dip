import useStyles from './useStyles';
import profilePic from '../../../Images/profile.png';
import { Typography, Grid, Avatar, Paper } from '@material-ui/core';

export default function Message(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid item container className={classes.messageContainer}>
        <Grid item container justifyContent="center" xs={1}>
          <Grid item>
            <Avatar alt="profile picture" src={profilePic} />
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-start" xs={5}>
          <Grid item>
            <Typography variant="body1" className={classes.recipent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.userMessageContainer} justifyContent="flex-end">
        <Grid item container justifyContent="flex-end" xs={5}>
          <Grid item>
            <Paper elevation={2} className={classes.user}>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
