import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    wordWrap: 'break-word',
    lineHeight: '1.5em',
    maxHeight: '3.0em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardDesc: {
    wordWrap: 'break-word',
    lineHeight: '1.5em',
    maxHeight: '4.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardContentContainer: {
    height: '10em',
  },
  border: {
    borderRight: '1px solid white',
  },
  extendedInfo: {
    padding: '1em',
    backgroundColor: 'black',
  },
  extendedDetail: {
    padding: '1em',
    backgroundColor: '#eeeeee',
    height: '5em',
  },
  prizeAmount: {
    lineHeight: '2.5em',
    fontWeight: 700,
    fontSize: 15,
  },
  date: {
    fontSize: 15,
    fontWeight: 400,
  },
  time: {
    fontSize: 15,
    fontWeight: 500,
  },
}));

export default useStyles;
