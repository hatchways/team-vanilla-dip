import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
  alignCenter: {
    alignItems: 'center',
  },
  ml20: {
    marginLeft: '20px',
  },
  large: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  imageContainer: {
    position: 'relative',
  },
  cameraImage: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
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
  fileInputLabel: {
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none',
  },
}));

export default useStyles;
