import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, CssBaseline, Box, Tabs, Tab, Typography, Paper, useMediaQuery } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Navbar from '../../components/Navbar/Navbar';
import useStyles from './useStyles';

interface ProfilePanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ProfileTabPanel(props: ProfilePanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Grid container>
            <Link to="/dashboard" className={classes.linkStyle}>
              <ArrowBackIosIcon fontSize="small" /> Dashboard
            </Link>
          </Grid>
          <Box py={3}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function Profile(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const mediumViewport = useMediaQuery('(min-width:768px)');

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Box width="100%">
        <Navbar />
        <Grid container className={classes.root}>
          <Paper elevation={3} className={classes.paperTab}>
            <Tabs
              orientation={mediumViewport ? 'vertical' : 'horizontal'}
              value={value}
              onChange={handleChange}
              variant="scrollable"
            >
              <Tab label="Profile" />
              <Tab label="Personal Information" />
              <Tab label="Payment Details" />
              <Tab label="Notification" />
              <Tab label="Password" />
            </Tabs>
          </Paper>
          <Box p={5} className={classes.displayPanel}>
            <ProfileTabPanel value={value} index={0}>
              <Typography component="h2" variant="h2">
                Profile
              </Typography>
            </ProfileTabPanel>
            <ProfileTabPanel value={value} index={2}>
              <Typography component="h2" variant="h2">
                Payment Details
              </Typography>
            </ProfileTabPanel>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Profile;
