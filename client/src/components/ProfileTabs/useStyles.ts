import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  tabLabel: {
    textTransform: 'uppercase',
  },
  tabRoot: { textColor: 'primary', variant: 'fullWidth' },
  contextTitle: {
    variant: 'subtitle1',
    align: 'center',
  },
}));

export default useStyles;
