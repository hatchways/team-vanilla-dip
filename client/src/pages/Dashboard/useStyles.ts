import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    component: 'main',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  largeUsername: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  editProfileButton: {
    fontWeight: 600,
  },
}));

export default useStyles;
