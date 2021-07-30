import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  profile_container: {
    width: '80%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 800,
  },
  price: {
    backgroundColor: '#000 !important',
    color: '#fff !important',
    padding: '15px 30px',
  },
  tabLabel: {
    textTransform: 'uppercase',
  },
  tabRoot: { textColor: 'primary' },
}));

export default useStyles;
