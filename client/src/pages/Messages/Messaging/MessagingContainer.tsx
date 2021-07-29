import React, { useState, useEffect } from 'react';
import useStyles from '../useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
import { Message } from '../../../interface/Message';
import MessageList from './MessageList';
import fetchUser from '../../../helpers/APICalls/getUserById';
import fetchLastMessage from '../../../helpers/APICalls/getMessagesByConvoId';
import pushNewMessage from '../../../helpers/APICalls/createNewMessage';
import { Conversation } from '../../../interface/Conversation';
import profileAvatar from '../../../Images/user.png';
import { Typography, Grid, Divider, Avatar, Badge, Button, TextField, CircularProgress } from '@material-ui/core';

interface Props {
  convo: Conversation;
}

export default function MessagingContainer({ convo }: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [participant, setParticipant] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const participantId = convo?.participants.find((participant: string) => participant !== loggedInUser?.id);

  useEffect(() => {
    let active = true;

    if (participantId) {
      const getParticipantInfo = async () => {
        const response = await fetchUser({
          id: participantId,
        });

        if (active && response && response.user) {
          setParticipant(response.user);
        }
      };
      getParticipantInfo();
    }

    return () => {
      active = false;
    };
  }, [participantId]);

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

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleNewMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setNewMessage('');

    const response = await pushNewMessage(convo._id, newMessage);

    if (response && response.message) {
      const newMessages: Message[] = [...messages, response.message];
      setMessages(newMessages);

      setSubmitting(false);
    }
  };

  return (
    <>
      <Grid item container alignItems="center" className={classes.messagingHeader}>
        <Grid item container justifyContent="center" xs={1}>
          <Grid item>
            <Badge
              overlap="circular"
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              classes={{ badge: classes.activeBadge }}
            >
              <Avatar alt="profile picture" src={profileAvatar} />
            </Badge>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {participant?.username}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button size="large" className={classes.detailButton}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              . . .
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item container alignItems="flex-end" justifyContent="flex-end" className={classes.chatboxContainer}>
        <MessageList messages={messages} />
      </Grid>
      <form onSubmit={handleNewMessageSubmit} style={{ width: '100%' }}>
        <Divider />
        <Grid item container alignItems="center" className={classes.sendMessageContainer}>
          <Grid item container justifyContent="center" alignItems="center">
            <Grid item xs={9} className={classes.textAreaContainer}>
              <TextField
                id="message"
                name="message"
                placeholder="Start typing here . . ."
                value={newMessage}
                color="primary"
                variant="outlined"
                onChange={handleNewMessageChange}
                multiline
                fullWidth
                rows={3}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={3}
              className={classes.submitButtonContainer}
            >
              <Button type="submit" size="medium" variant="contained" color="primary" className={classes.submitMessage}>
                {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'SEND'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
