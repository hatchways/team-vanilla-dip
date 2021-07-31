import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';

export default function Discover(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column" alignItems="center">
      <CssBaseline />
      <Grid item container>
        <Navbar />
      </Grid>
    </Grid>
  );
}
