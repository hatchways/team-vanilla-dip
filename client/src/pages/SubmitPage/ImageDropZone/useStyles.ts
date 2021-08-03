import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  imageItem: {
    position: 'relative',
  },
  dropOverContainer: {
    width: 'max-content',
    padding: '20px',
    margin: '40px auto 5px',
    backgroundColor: '#f0f0fb',
    borderRadius: '30%',
  },
  cloudUpload: {
    fontSize: '100px !important',
    color: '#a6b7ca !important',
  },
}));

export default useStyles;
