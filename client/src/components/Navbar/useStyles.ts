import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'black',
  },
  navButtons: {
    marginLeft: 'auto',
  },
  box: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
  button: {
    paddingRight: '10px',
    fontWeight: 'bold',
    color: 'white',
    margin: theme.spacing(2),
  },
  insideButton: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 0,
  },
  authButton: {
    paddingRight: '25px',
    paddingLeft: '25px',
    fontWeight: 'bold',
    color: 'white',
    margin: theme.spacing(2),
    borderColor: 'white',
    borderRadius: 0,
    textTransform: 'uppercase',
    minWidth: 120,
  },
  logo: {
    flexGrow: 1,
    maxWidth: '230px',
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 11,
  },
}));

export default useStyles;
