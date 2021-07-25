import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import Conversation from './Conversation/Conversation';
import { Typography, Grid, CssBaseline, Divider, Paper, List } from '@material-ui/core';

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
          <Paper elevation={2} className={classes.convoBanner}>
            <Grid container direction="column">
              <Grid item className={classes.convoBannerTitle}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                  Inbox Messages
                </Typography>
              </Grid>
              <Divider />
              <Grid item>
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
          <Typography variant="h5">Messages will go in here</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
