import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  contestFormContainer: {
    padding: '3em 6em 5em',
    width: '100%',
  },
  contestFormWrapper: {
    padding: '5em 15em 5em',
  },
  contestHeading: {
    marginTop: '5em',
    marginBottom: '2em',
  },
}));

export default useStyles;
