import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tabRoot: {
    textColor: 'primary',
    variant: 'fullWidth',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around',
    },
  },
}));

export default useStyles;
