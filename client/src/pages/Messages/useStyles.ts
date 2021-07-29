import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    component: 'main',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  convoBannerTitle: {
    width: '100%',
    padding: '3.5em',
  },
  navOffset: {
    height: 'calc(100vh - 88px)',
  },
  convoListContainer: {
    height: 'calc(100vh - (88px + 7em + 27px))',
    overflowY: 'scroll',
  },
  messagingHeader: {
    backgroundColor: '#eeeeee',
    height: '7.5em',
    padding: '2em 1em',
    width: '100%',
    marginLeft: '2px',
  },
  chatboxContainer: {
    height: 'calc(100vh - (88px + 12em + 7.5em + 0.5em))',
    backgroundColor: '#fff',
    marginLeft: '2px',
    overflowX: 'scroll',
  },
  sendMessageContainer: {
    height: '12em',
    backgroundColor: '#fff',
    width: '100%',
    marginLeft: '2px',
  },
  activeBadge: {
    color: '#44b700',
    backgroundColor: '#44b700',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  inactiveBadge: {
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  detailButton: {
    borderRadius: '50%',
    paddingTop: '0.2em',
  },
  submitMessage: {
    fontSize: 13,
    minHeight: '3em',
    paddingLeft: '2em',
    paddingRight: '2em',
    fontWeight: 'bold',
  },
  textAreaContainer: {
    paddingLeft: '2.5em',
    paddingBottom: '1em',
  },
  submitButtonContainer: {
    paddingRight: '3em',
    paddingBottom: '1em',
  },
  startConvoTextContainer: {
    padding: '5em',
    marginTop: '10em',
  },
}));

export default useStyles;
