import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 88px)',
    ['@media (max-width: 768px)']: {
      flexDirection: 'column',
    },
  },
  paperStyle: {
    height: '100%',
    minWidth: '300px',
  },
  navSide: {
    '& a': {
      paddingLeft: '50px',
    },
    '& .MuiTypography-body1': {
      fontSize: '16px',
      fontWeight: 'bolder',
      color: '#c0bfbf',
    },
    '& .Mui-selected .MuiTypography-body1': {
      color: '#000',
    },
  },
  mainContent: {
    flex: 1,
  },
}));

export default useStyles;
