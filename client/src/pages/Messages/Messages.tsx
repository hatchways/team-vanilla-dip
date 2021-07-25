import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { Typography, Grid, CssBaseline } from '@material-ui/core';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column" alignItems="center">
      <CssBaseline />
      <Grid item container>
        <Navbar />
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography variant="h3">Direct Messaging will go in here.</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
