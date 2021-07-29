import useStyles from './useStyles';
import profileAvatar from '../../../Images/user.png';
import { User } from '../../../interface/User';
import { Message } from '../../../interface/Message';
import { useAuth } from '../../../context/useAuthContext';
import { Typography, Grid, Avatar, Paper } from '@material-ui/core';

interface Props {
  messages: Message[] | [];
  participant?: User | null | undefined;
}

export default function MessageList({ messages }: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <>
      {messages.map((message) =>
        message.senderID === loggedInUser?.id ? (
          <Grid key={message._id} item container className={classes.userMessageContainer} justifyContent="flex-end">
            <Grid item container justifyContent="flex-end" xs={5}>
              <Grid item>
                <Paper elevation={2} className={classes.user}>
                  <Typography variant="body1">{message.message}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid key={message._id} item container className={classes.messageContainer}>
            <Grid item container justifyContent="center" xs={1}>
              <Grid item>
                <Avatar alt="profile picture" src={profileAvatar} />
              </Grid>
            </Grid>
            <Grid item container justifyContent="flex-start" xs={5}>
              <Grid item>
                <Typography variant="body1" className={classes.recipent}>
                  {message.message}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ),
      )}
      ;
    </>
  );
}
