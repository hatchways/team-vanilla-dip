import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  messageSnippet: {
    opacity: 0.8,
    fontSize: 12,
    maxWidth: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  activeBadge: {
    color: '#44b700',
    backgroundColor: '#44b700',
  },
  inactiveBadge: {
    color: 'transparent',
    backgroundColor: 'transparent',
  },
}));

export default useStyles;
