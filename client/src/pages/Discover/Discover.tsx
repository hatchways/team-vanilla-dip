import React, { useState, useEffect } from 'react';
import designerBanner from '../Discover/images/tatto-designer-banner.jpg';
import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { Contest } from '../../interface/Contest';
import { useContests } from '../../context/useContestContext';
import ContestCard from './ContestCard/ContestCard';
import { Typography, Grid, CssBaseline } from '@material-ui/core';

export default function Discover(): JSX.Element {
  const classes = useStyles();

  const [activeContests, setActiveContests] = useState<Contest[] | []>([]);
  const { allContests } = useContests();

  useEffect(() => {
    const newActiveContests = allContests.filter((contest: Contest) => new Date(contest.deadlineDate) >= new Date());
    setActiveContests(newActiveContests);
  }, [allContests]);

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
          <Grid item container spacing={4}>
            {activeContests.map((contest) => {
              return (
                <Grid item lg={4} md={6} sm={6} xs={12} key={contest._id}>
                  <ContestCard
                    title={contest.title}
                    description={contest.description}
                    prizeAmount={contest.prizeAmount}
                    deadlineDate={contest.deadlineDate}
                    image={contest.imageFiles[0]}
                    id={contest._id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}