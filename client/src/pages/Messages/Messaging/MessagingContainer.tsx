import React, { useState } from 'react';
import useStyles from '../useStyles';
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

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleNewMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setNewMessage('');

    const response = await pushNewMessage(convo.conversation._id, newMessage);

    if (response && response.message) {
      const updatedMessages: Message[] = [...messages, response.message];
      setMessages(updatedMessages);

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
        <MessageList messages={messages} participant={convo.participant} />
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
