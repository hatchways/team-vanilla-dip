import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 88px)',
    ['@media (max-width: 768px)']: {
      flexDirection: 'column',
    },
  },
  linkStyle: {
    display: 'flex',
    fontSize: '16px',
    textDecoration: 'none',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#424242',
    '&:hover': {
      color: '#000',
    },
  },
  paperTab: {
    padding: '50px 10px',
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start !important',
    },
  },
  displayPanel: {
    flexGrow: 1,
  },
}));

export default useStyles;
