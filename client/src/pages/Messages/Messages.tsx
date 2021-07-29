import React, { useState, useEffect } from 'react';
import useStyles from './useStyles';
//import { useAuth } from '../../context/useAuthContext';
import fetchConversations from '../../helpers/APICalls/getConversations';
import { Conversation } from '../../interface/Conversation';
import Navbar from '../../components/Navbar/Navbar';
import ConversationListItem from './Conversation/Conversation';
import Message from './Message/Message';
import profilePic from '../../Images/profile.png';
import {
  Typography,
  Grid,
  CssBaseline,
  Divider,
  Paper,
  List,
  Avatar,
  Badge,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';

export default function Messages(): JSX.Element {
  const classes = useStyles();
  //const { loggedInUser } = useAuth();

  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [convoID, setConvoID] = useState<string | null>(null);

  const saveConvos = (convos: Conversation[]) => {
    setConversations(convos);
  };

  useEffect(() => {
    let active = true;

    const getAndSaveConvos = async () => {
      const response = await fetchConversations();

      if (active && response && response.conversations) {
        saveConvos(response.conversations);
      }
    };

    getAndSaveConvos();

    return () => {
      active = false;
    };
  }, []);

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleNewMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setNewMessage('');
    setTimeout(() => {
      console.log(newMessage);
      setSubmitting(false);
    }, 1000);
  };

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
              <Grid item className={classes.convoListContainer}>
                <List>
                  {conversations.map((convo) => {
                    return (
                      <ConversationListItem
                        key={convo._id}
                        convoID={convo._id}
                        participants={convo.participants}
                        setConvo={setConvoID}
                      />
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="column" className={classes.navOffset}>
            {convoID ? (
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
                    <Button size="large" className={classes.detailButton}>
                      <Typography variant="h6" style={{ fontWeight: 700 }}>
                        . . .
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  className={classes.chatboxContainer}
                >
                  <Message convoID={convoID} />
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
                        <Button
                          type="submit"
                          size="medium"
                          variant="contained"
                          color="primary"
                          className={classes.submitMessage}
                        >
                          {isSubmitting ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'SEND'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : (
              <>
                <Grid item container justifyContent="center" className={classes.startConvoTextContainer}>
                  <Grid item xs={6}>
                    <Typography variant="h5" style={{ fontWeight: 700 }}>
                      Open a conversation to start the chat.
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
