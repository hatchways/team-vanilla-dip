import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  messageContainer: {
    paddingLeft: '2.5em',
    paddingRight: '2.5em',
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
  },
  recipent: {
    backgroundColor: '#d9d9d9',
    padding: 12,
    borderRadius: 20,
  },
  user: {
    padding: 12,
    borderRadius: 20,
  },
  userMessageContainer: {
    paddingLeft: '2.5em',
    paddingRight: '4em',
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
  },
}));

export default useStyles;
