import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import profilePic from '../../../Images/profile.png';
import fetchUser from '../../../helpers/APICalls/getUserById';
import fetchLastMessage from '../../../helpers/APICalls/getMessagesByConvoId';
import { Conversation } from '../../../interface/Conversation';
import { User } from '../../../interface/User';
import { Message } from '../../../interface/Message';
import { useAuth } from '../../../context/useAuthContext';
import { Typography, Grid, Avatar, Paper } from '@material-ui/core';

interface Props {
  convo: Conversation | null;
  participant?: User | null | undefined;
}

export default function MessageList({ convo }: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let active = true;

    if (convo?._id) {
      const getMessages = async () => {
        const response = await fetchLastMessage({
          convoID: convo._id,
        });

        if (active && response && response.messages) {
          setMessages(response.messages);
        }
      };
      getMessages();
    }

    return () => {
      active = false;
    };
  }, [convo]);

  return (
    <>
      {messages.map((message) =>
        message.senderID === loggedInUser?.id ? (
          <Grid item container className={classes.userMessageContainer} justifyContent="flex-end">
            <Grid item container justifyContent="flex-end" xs={5}>
              <Grid item>
                <Paper elevation={2} className={classes.user}>
                  <Typography variant="body1">{message.message}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item container className={classes.messageContainer}>
            <Grid item container justifyContent="center" xs={1}>
              <Grid item>
                <Avatar alt="profile picture" src={profilePic} />
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
