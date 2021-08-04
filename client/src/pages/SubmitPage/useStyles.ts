import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: 'center',
  },
  paperContainer: {
    width: '80%',
    textAlign: 'center',
    padding: '50px 0px 20px',
  },
  header: {
    fontSize: '24px',
  },
  submitContainer: {
    marginTop: '20px',
  },
  submitBtn: {
    color: '#fff',
    backgroundColor: '#000',
    padding: '15px 40px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}));

export default useStyles;
