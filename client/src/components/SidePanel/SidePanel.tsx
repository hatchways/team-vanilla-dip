import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import { Grid, CssBaseline, Box, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Navbar from '../Navbar/Navbar';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

interface PanelProps {
  children: JSX.Element;
}

function SidePanel({ children }: PanelProps): JSX.Element {
  const { loggedInUser } = useAuth();
  const location = useLocation();
  const classes = useStyles();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  if (loggedInUser.profile === undefined) return <CircularProgress />;
  if (!loggedInUser.profile) {
    return <CircularProgress />;
  }

  return (
    <Grid container component="main">
      <CssBaseline />
      <Box width="100%">
        <Navbar />
        <Grid container className={classes.root}>
          <Grid item>
            <Paper elevation={3} className={classes.paperStyle}>
              <Box py={5}>
                <List component="nav" aria-label="main mailbox folders" className={classes.navSide}>
                  <ListItem button component={Link} to="/profile" selected={location.pathname == '/profile' && true}>
                    <ListItemText primary="Profile"></ListItemText>
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/personal-info"
                    selected={location.pathname == '/personal-info' && true}
                  >
                    <ListItemText primary="Personal Information"></ListItemText>
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/payment-details"
                    selected={location.pathname == '/payment-details' && true}
                  >
                    <ListItemText primary="Payment details"></ListItemText>
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/notifications"
                    selected={location.pathname == '/notifications' && true}
                  >
                    <ListItemText primary="Notifications"></ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item className={classes.mainContent}>
            <Box p={5}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SidePanel;
