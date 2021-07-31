import { ConversationProps } from './interface/Conversation';
import useStyles from './useStyles';
import profilePicAvatar from '../../../Images/user.png';
import { Typography, Grid, ListItem, Divider, ListItemAvatar, Avatar, ListItemText, Badge } from '@material-ui/core';
import moment from 'moment';

export default function Conversation({ convo, setConvo }: ConversationProps): JSX.Element {
  const classes = useStyles();

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
                  {convo.participant?.username}
                </Typography>
                <Typography variant="body1" className={classes.messageSnippet}>
                  {convo.lastMessage ? convo.lastMessage.message : `No Message Histroy`}
                </Typography>
              </ListItemText>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" justifyContent="flex-end" xs={4}>
            <Grid item>
              <ListItemText disableTypography>
                <Typography variant="body1">
                  {convo.lastMessage ? moment(convo.lastMessage.updatedAt).fromNow() : null}
                </Typography>
              </ListItemText>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
}
