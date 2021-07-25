import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  messageSnippet: {
    opacity: 0.8,
    fontSize: 12,
    maxWidth: 275,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '0.5em',
  },
}));

export default useStyles;
