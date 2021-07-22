import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBasline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useParams } from 'react-router-dom';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import SubmissionTabs from '../../components/SubmissionTabs/SubmissionTabs';

import firstImage from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import secondImage from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import profile from '../../Images/profile.png';
import './Submission.css';

const submissionData = [
  {
    imageSrc: profile,
    title: 'Lizard',
    author: 'jesse',
  },
  {
    imageSrc: firstImage,
    title: 'Sheep',
    author: 'anthony',
  },
  {
    imageSrc: secondImage,
    title: 'Monkeys',
    author: 'denise',
  },
];

export default function Submission(): JSX.Element {
  const classes = useStyles();
  const [submission, setSubmission] = useState(submissionData);
  const { contestId } = useParams<{ contestId: string }>();

  useEffect(() => {
    if (contestId) {
    }
  }, [contestId]);

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
                  <Typography variant="h6" component="h3">
                    By Kenneth Stewart
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Button color="primary" className={classes.submitBtn}>
                Submit Design
              </Button>
            </Grid>
          </Grid>
          <SubmissionTabs card={submission} />
        </Box>
      </Box>
    </Grid>
  );
}
