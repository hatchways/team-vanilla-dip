import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  trashBtn: {
    backgroundColor: '#000',
    color: '#fff',
    position: 'absolute',
    top: '2px',
    right: '5px',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
}));

export default useStyles;
