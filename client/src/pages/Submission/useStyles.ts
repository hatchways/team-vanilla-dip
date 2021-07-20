import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  returnPanel: {
    marginBottom: '40px',
    alignItems: 'center',
  },
  return: {
    color: '#939292',
    transition: '.5s ease',
    fontSize: '14px',
    '&:hover': {
      color: '#434142',
      textDecoration: 'none',
      borderBottom: '1px solid #434142',
    },
  },
  gridContainer: {
    justifyContent: 'space-between',
    ['@media (max-width: 480px)']: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  submitBtn: {
    textTransform: 'uppercase',
    border: '1px solid #000',
    padding: '15px 25px',
  },
  profileDetails: {
    display: 'flex',
    padding: '20px 0px',
    alignItems: 'center',
    ['@media (max-width: 480px)']: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  profileName: {
    marginLeft: '20px',
  },
  contestTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    ['@media (max-width: 780px)']: {
      fontSize: '24px',
    },
  },
  contestPriceBtn: {
    padding: '3px 15px',
    backgroundColor: '#000',
    color: '#fff',
    marginLeft: '20px',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: '.5s ease',
    '&:hover': {
      color: '#000',
    },
  },
}));

export default useStyles;
