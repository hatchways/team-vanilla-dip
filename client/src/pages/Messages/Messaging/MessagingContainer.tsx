import React, { useState, useEffect, useCallback } from 'react';
import useStyles from '../useStyles';
import { useSocket } from '../../../context/useSocketContext';
import { useMessages } from '../../../context/useMessagingContext';
import MessageList from './MessageList';
import pushNewMessage from '../../../helpers/APICalls/createNewMessage';
import { MessagingData, Message } from '../../../interface/Message';
import profileAvatar from '../../../Images/user.png';
import { Typography, Grid, Divider, Avatar, Badge, Button, TextField, CircularProgress } from '@material-ui/core';

interface Props {
  convo: MessagingData;
}

export default function MessagingContainer({ convo }: Props): JSX.Element {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[] | []>(convo.messages);

  const { socket } = useSocket();
  const { updateConversations } = useMessages();

  const handleMessageUpdates = useCallback(
    (updatedMessages: Message[]) => {
      setMessages(() => updatedMessages);
      updateConversations({
        conversation: convo.conversation,
        participant: convo.participant,
        messages: updatedMessages,
        lastMessage: updatedMessages[updatedMessages.length - 1],
        profile: convo.profile,
      });
    },
    [convo, updateConversations],
  );

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleNewMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage) return;

    setSubmitting(true);
    setNewMessage('');

    const response = await pushNewMessage(convo.conversation._id, newMessage);

    if (response && response.message && socket) {
      const emitMessage = {
        receiverId: convo.participant?._id,
        ...response.message,
      };
      socket.emit('sendMessage', emitMessage);

      handleMessageUpdates([...messages, response.message]);

      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('getMessage', (message) => {
        if (
          message &&
          convo.conversation.participants.includes(message.senderID) &&
          !convo.messages.find((msg) => msg._id === message._id)
        ) {
          handleMessageUpdates([...convo.messages, message]);
        }
      });
    }
  }, [socket, convo, handleMessageUpdates]);

  useEffect(() => {
    setMessages(() => [...convo.messages]);
  }, [convo]);

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
              <Avatar alt="profile picture" src={convo.profile.profileImage || profileAvatar} />
            </Badge>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {convo.participant?.username}
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
        <MessageList messages={messages} profile={convo.profile} />
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
