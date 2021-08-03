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
  blackPattern: {
    width: '100%',
    height: '300px',
    marginTop: '5em',
  },
  bannerBlackOverlay: {
    background: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    width: '100%',
    height: '420px',
    zIndex: 1,
  },
  blackPatternOverlay: {
    marginTop: '5em',
    background: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    width: '100%',
    height: '300px',
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
  signup: {
    padding: '1.75em',
    margin: '1.5em',
  },
  followUsText: {
    fontSize: 15,
    margin: '1em',
  },
  socialMedia: {
    paddingTop: '2em',
    marginLeft: '38em',
  },
}));

export default useStyles;
