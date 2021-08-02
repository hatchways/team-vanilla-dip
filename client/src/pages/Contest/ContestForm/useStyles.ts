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
  selected: {
    cursor: 'pointer',
    opacity: 0.6,
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  overlay: {
    cursor: 'pointer',
    background: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    transition: theme.transitions.create(['opacity', 'background'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  noOverlay: {
    display: 'none',
  },
  image: {
    cursor: 'pointer',
    opacity: 1,
  },
}));

export default useStyles;
