import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dashboardHeader: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 400,
    textAlign: 'center',
    marginLeft: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  createContestBtn: {
    width: 170,
    height: 54,
    boxShadow: 'none',
    marginRight: 35,
  },
}));

export default useStyles;
