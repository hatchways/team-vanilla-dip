import React, { useState, useEffect, ChangeEvent } from 'react';
import useStyles from './useStyles';
import { useMessages } from '../../context/useMessagingContext';
import { getProfile } from '../../helpers/APICalls/getProfile';
import createConvo from '../../helpers/APICalls/createNewConvo';
import { User } from '../../interface/User';
import { MessagingData } from '../../interface/Message';
import Navbar from '../../components/Navbar/Navbar';
import SearchUsers from '../../components/Search/Search';
import ConversationListItem from './Conversation/Conversation';
import MessagingContainer from './Messaging/MessagingContainer';
import { Typography, Grid, CssBaseline, Divider, Paper, List } from '@material-ui/core';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  const { conversations, updateConversations } = useMessages();
  const [currentConvo, setCurrentConvo] = useState<MessagingData | null>(null);
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [newParticipant, setNewParticipant] = useState<User | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    const selectedUser = users.find((user) => user.username === newInputValue);

    if (selectedUser && selectedUser._id) {
      setNewParticipant(selectedUser);
      setSearch('');
    }
  };

  useEffect(() => {
    let active = true;

    if (newParticipant) {
      const createAndPushConvo = async () => {
        const response = await createConvo(newParticipant._id);

        const participantProfile = await getProfile({ userID: newParticipant._id });

        if (active && response && response.conversation && participantProfile.profile) {
          const convoDataObj: MessagingData = {
            conversation: response.conversation,
            participant: newParticipant,
            messages: [],
            lastMessage: null,
            profile: participantProfile.profile[0],
          };
          setCurrentConvo(convoDataObj);
          updateConversations(convoDataObj);
        }
      };

      createAndPushConvo();
    }

    return () => {
      active = false;
    };
  }, [newParticipant, updateConversations]);

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
              <Grid item>
                <SearchUsers search={search} handleChange={handleSearchChange} options={users} setOptions={setUsers} />
              </Grid>
              <Divider />
              <Grid item className={classes.convoListContainer}>
                <List>
                  {conversations.map((convo) => {
                    return (
                      <ConversationListItem key={convo.conversation._id} convo={convo} setConvo={setCurrentConvo} />
                    );
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
