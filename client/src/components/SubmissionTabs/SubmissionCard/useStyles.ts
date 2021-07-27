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
  displayOver: {
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    '&:hover button': {
      display: 'inline-flex',
    },
  },
  winner: {
    backgroundColor: '#fff',
    color: '#000 !important',
    padding: '15px 30px',
    marginBottom: '30px',
    fontWeight: 'bolder',
    display: 'none',
    '&:hover': {
      backgroundColor: '#cdcdcdf0;',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '5px',
      fontSize: '14px',
      fontWeight: 'bolder',
    },
  },
}));

export default useStyles;
