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
  convoBanner: {
    height: 'calc(100vh - 88px)',
  },
}));

export default useStyles;
