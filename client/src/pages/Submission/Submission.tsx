import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBasline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import SubmissionTabs from '../../components/SubmissionTabs/SubmissionTabs';

import './Submission.css';

const submissionData = [
  {
    imageSrc: 'http://imageSrc',
    title: 'Lizard',
    text: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    imageSrc: 'http://imageSrc',
    title: 'Sheep',
    text: 'Sheeps are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    imageSrc: 'http://imageSrc',
    title: 'Monkeys',
    text: 'Monkeys are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
];

export default function Submission(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBasline />
      <Box width="100%">
        <Navbar />
        <Box p={3} m={5}>
          <Grid container className={classes.returnPanel}>
            <ArrowBackIosIcon style={{ fontSize: 10 }} />
            <Link
              className={classes.return}
              component="button"
              variant="body2"
              onClick={() => {
                alert('Returning');
              }}
            >
              Back to contests list
            </Link>
          </Grid>
          <Grid container className={classes.gridContainer}>
            <Grid item>
              <Typography component="h2" variant="h3" className={classes.contestTitle}>
                Lion tattoo concept in minimal style
                <Button className={classes.contestPriceBtn}>$150</Button>
              </Typography>
              <Box className={classes.profileDetails}>
                <Avatar />
                <Box className={classes.profileName}>
                  <h3>By Kenneth Stewart</h3>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Button color="primary" className={classes.submitBtn}>
                Submit Design
              </Button>
            </Grid>
          </Grid>
          <SubmissionTabs card={submissionData} />
        </Box>
      </Box>
    </Grid>
  );
}
