import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    fontSize: 14,
    minHeight: '4em',
    paddingLeft: '4em',
    paddingRight: '4em',
    fontWeight: 'bold',
  },
}));

export default useStyles;
