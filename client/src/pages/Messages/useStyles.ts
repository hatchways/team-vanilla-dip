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
  messagingHeader: {
    backgroundColor: '#eeeeee',
    height: '7.5em',
    paddingTop: '2em',
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingBottom: '2em',
    width: '100%',
    marginLeft: '2px',
  },
  chatboxContainer: {
    height: 'calc(100vh - (88px + 12em + 7.5em))',
    backgroundColor: '#fff',
    marginLeft: '2px',
    overflowX: 'scroll',
  },
  sendMessageContainer: {
    height: '12em',
    backgroundColor: '#eeeeee',
    width: '100%',
    marginLeft: '2px',
  },
  activeBadge: {
    color: '#44b700',
    backgroundColor: '#44b700',
  },
  inactiveBadge: {
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  detailButton: {
    borderRadius: '50%',
    paddingTop: '0.2em',
  },
}));

export default useStyles;
