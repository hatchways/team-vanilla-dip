import { useRef, useState } from 'react';
import { AppBar, Toolbar, Avatar, Button, Box, Badge, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useNotifications } from '../../context/useNotificationContext';
import logo from '../../Images/logo.png';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = (): JSX.Element => {
  const { loggedInUser, logout } = useAuth();
  const { allNotifications } = useNotifications();
  const classes = useStyles();
  const { location } = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Box className={classes.box}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Box>

        {loggedInUser && (
          <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
            <Button size="large" component={Link} to={'/discover'} color="primary" className={classes.button}>
              Discover
            </Button>
            <Button size="large" component={Link} to={'/messages'} color="primary" className={classes.button}>
              Messages
            </Button>
            {allNotifications.length > 0 ? (
              <Box component="span">
                <Button size="large" color="primary" component={Link} to={'/notifications'} className={classes.button}>
                  Notifications
                  <Badge badgeContent={allNotifications.length} color="secondary" className={classes.badge}></Badge>
                </Button>
              </Box>
            ) : (
              <Button size="large" component={Link} to={'/notifications'} color="primary" className={classes.button}>
                Notifications
              </Button>
            )}
            <Button
              size="large"
              color="secondary"
              component={Link}
              to={'/contest'}
              className={classes.authButton}
              variant="outlined"
            >
              create contest
            </Button>
          </Box>
        )}

        <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
          {!loggedInUser && (
            <Button
              size="large"
              component={Link}
              to={location.pathname == '/signup' ? '/login' : '/signup'}
              color="primary"
              className={classes.authButton}
              variant="outlined"
            >
              {location.pathname == '/signup' ? 'log in' : 'sign up'}
            </Button>
          )}
        </Box>

        {loggedInUser && (
          <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
            <Button size="large" className={classes.button} onClick={handleClick}>
              {loggedInUser.profile === undefined ? (
                <CircularProgress />
              ) : (
                <Avatar
                  alt={'Placeholder for profile username'}
                  src={loggedInUser.profile.profileImage}
                  className={classes.avatar}
                ></Avatar>
              )}
              Account
              <ArrowDropDownIcon fontSize="small" />
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                disablePadding: true,
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to={'/profile'}
                fullWidth
                color="primary"
                className={classes.insideButton}
              >
                Profile
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  logout();
                }}
                fullWidth
                color="primary"
                className={classes.insideButton}
              >
                Logout
              </Button>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
