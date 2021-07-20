import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tabRoot: {
    textColor: 'primary',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
    },
  },
}));

export default useStyles;
