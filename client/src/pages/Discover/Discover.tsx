import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import designerBanner from '../Discover/images/tatto-designer-banner.jpg';
import blackPattern from '../Discover/images/black-pattern.jpg';
import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { Contest } from '../../interface/Contest';
import { useContests } from '../../context/useContestContext';
import ContestCard from './ContestCard/ContestCard';
import WinnerCard from './WinnersCard/Winner';
import winnersTestData from './test data/winnersTestData.js';
import { Typography, Grid, CssBaseline, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';

export default function Discover(): JSX.Element {
  const classes = useStyles();

  const [activeContests, setActiveContests] = useState<Contest[] | []>([]);
  const { allContests } = useContests();
  const history = useHistory();

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
          <Grid item className={classes.heading}>
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
          <Grid item className={classes.headingWinner}>
            <Typography variant="h4">Latest Winners</Typography>
          </Grid>
          <Grid item container spacing={3}>
            {winnersTestData.map((winner) => {
              return (
                <Grid item lg={2} md={3} sm={3} xs={6} key={winner.id}>
                  <WinnerCard
                    image={winner.image}
                    winningDate={winner.winningDate}
                    designTitle={winner.designTitle}
                    contestTitle={winner.contestTitle}
                    username={winner.username}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.blackPattern}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.blackPatternOverlay}
          >
            <Button variant="contained" className={classes.signup} onClick={() => history.push('/signup')}>
              <Typography variant="h3">Sign up to share your ideas</Typography>
            </Button>
            <Typography variant="body2" color="secondary" className={classes.followUsText}>
              Be the first to hear about deals, exciting new products and much more!
            </Typography>
            <Grid item xs={5} container className={classes.socialMedia}>
              <Grid item xs={1}>
                <FacebookIcon fontSize="large" color="secondary" />
              </Grid>
              <Grid item xs={1}>
                <InstagramIcon fontSize="large" color="secondary" />
              </Grid>
              <Grid item xs={1}>
                <PinterestIcon fontSize="large" color="secondary" />
              </Grid>
            </Grid>
          </Grid>
          <img src={blackPattern} alt="Discover Banner" className={classes.blackPattern} />
        </Grid>
      </Grid>
    </Grid>
  );
}
