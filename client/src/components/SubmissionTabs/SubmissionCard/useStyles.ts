import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  submissionCard: {
    position: 'relative',
  },
  submissionContent: {
    position: 'absolute',
    bottom: '0',
    textAlign: 'center',
    color: '#fff',
    width: '100%',
    '& p, & button': {
      color: 'inherit',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
}));

export default useStyles;
