import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    component: 'main',
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  discoverBanner: {
    width: '100%',
    height: '420px',
  },
  bannerBlackOverlay: {
    background: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    width: '100%',
    height: '420px',
    zIndex: 1,
  },
  heading: {
    paddingTop: '5em',
    paddingBottom: '2.5em',
  },
  headingWinner: {
    paddingTop: '8em',
    paddingBottom: '2.5em',
  },
}));

export default useStyles;
