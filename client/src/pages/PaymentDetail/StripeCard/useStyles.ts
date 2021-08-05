import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardInfoField: {
    padding: '1em',
    border: '1px solid lightgrey',
  },

  expiryCvvContainer: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  addCard: {
    padding: '15px 25px',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: '1em',
  },
}));

export default useStyles;
