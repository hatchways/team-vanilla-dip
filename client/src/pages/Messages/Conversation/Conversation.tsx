import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import { ConversationProps } from './interface/Conversation';
import { User } from '../../../interface/User';
import { Message } from '../../../interface/Message';
import fetchUser from '../../../helpers/APICalls/getUserById';
import fetchLastMessage from '../../../helpers/APICalls/getMessagesByConvoId';
import useStyles from './useStyles';
import profilePicAvatar from '../../../Images/user.png';
import { Typography, Grid, ListItem, Divider, ListItemAvatar, Avatar, ListItemText, Badge } from '@material-ui/core';
import moment from 'moment';

export default function Conversation({ convo, setConvo }: ConversationProps): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const participantId = convo.participants?.find((participant: string) => participant !== loggedInUser?.id);

  const [participant, setParticipant] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

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

    if (convo._id) {
      const getLastMessage = async () => {
        const response = await fetchLastMessage({
          convoID: convo._id,
        });

        if (active && response && response.lastMessage) {
          setLastMessage(response.lastMessage);
        }
      };
      getLastMessage();
    }

    return () => {
      active = false;
    };
  }, [convo]);

  return (
    <>
      <ListItem alignItems="flex-start" button onClick={() => setConvo(convo)}>
        <Grid container>
          <Grid item container alignItems="center" justifyContent="flex-start" xs={8}>
            <Grid item xs={2}>
              <ListItemAvatar style={{ paddingLeft: '0.5em' }}>
                <Badge
                  overlap="circular"
                  variant="dot"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{ badge: classes.inactiveBadge }}
                >
                  <Avatar alt="profile picture" src={profilePicAvatar} />
                </Badge>
              </ListItemAvatar>
            </Grid>
            <Grid item xs={10}>
              <ListItemText disableTypography style={{ paddingLeft: '0.5em' }}>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  {participant?.username}
                </Typography>
                <Typography variant="body1" className={classes.messageSnippet}>
                  {lastMessage ? lastMessage.message : null}
                </Typography>
              </ListItemText>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" justifyContent="flex-end" xs={4}>
            <Grid item>
              <ListItemText disableTypography>
                <Typography variant="body1">{lastMessage ? moment(lastMessage.updatedAt).fromNow() : null}</Typography>
              </ListItemText>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
}
