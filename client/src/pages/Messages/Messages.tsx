import React, { useState, useEffect } from 'react';
import useStyles from './useStyles';
import fetchConversations from '../../helpers/APICalls/getConversations';
import { Conversation } from '../../interface/Conversation';
import Navbar from '../../components/Navbar/Navbar';
import ConversationListItem from './Conversation/Conversation';
import MessagingContainer from './Messaging/MessagingContainer';

import { Typography, Grid, CssBaseline, Divider, Paper, List } from '@material-ui/core';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConvo, setCurrentConvo] = useState<Conversation | null>(null);

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
                    return <ConversationListItem key={convo._id} convo={convo} setConvo={setCurrentConvo} />;
                  })}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="column" className={classes.navOffset}>
            {currentConvo ? (
              <MessagingContainer convo={currentConvo} />
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
