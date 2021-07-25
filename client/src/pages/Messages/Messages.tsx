import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import profilePic from '../../Images/profile.png';
import { Typography, Grid, CssBaseline, Divider, Paper, List, Avatar, Badge, Button } from '@material-ui/core';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column" alignItems="center">
      <CssBaseline />
      <Grid item container>
        <Navbar />
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Paper elevation={2} className={classes.navOffset}>
            <Grid container direction="column">
              <Grid item xs={12} className={classes.convoBannerTitle}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                  Inbox Messages
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <List>
                  <Conversation />
                  <Conversation />
                  <Conversation />
                  <Conversation />
                  <Conversation />
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="column" className={classes.navOffset}>
            <Grid item container alignItems="center" className={classes.messagingHeader}>
              <Grid item container justifyContent="center" xs={1}>
                <Grid item>
                  <Badge overlap="circular" variant="dot" classes={{ badge: classes.activeBadge }}>
                    <Avatar alt="profile picture" src={profilePic} />
                  </Badge>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  John Doe
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button size="large" className={classes.detailButton} color="primary">
                  <Typography variant="h6" style={{ fontWeight: 700 }}>
                    . . .
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item container alignItems="flex-end" justifyContent="flex-end" className={classes.chatboxContainer}>
              <Message />
            </Grid>
            <Grid item container alignItems="center" className={classes.sendMessageContainer}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
