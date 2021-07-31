import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import designerBanner from '../Discover/images/tatto-designer-banner.jpg';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { Typography } from '@material-ui/core';

export default function Discover(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column" alignItems="center">
      <CssBaseline />
      <Grid item container>
        <Navbar />
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Grid item xs={12} className={classes.discoverBanner}>
          <Grid container alignItems="center" justifyContent="center" className={classes.bannerBlackOverlay}>
            <Typography variant="h2" color="secondary">
              See The Invisible, Create The Impossible
            </Typography>
          </Grid>
          <img src={designerBanner} alt="Discover Banner" className={classes.discoverBanner} />
        </Grid>
        <Grid item container xs={10} justifyContent="center">
          <Grid item className={classes.activeContestHeading}>
            <Typography variant="h4">Active Contests</Typography>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item lg={4} md={6} sm={6} xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
