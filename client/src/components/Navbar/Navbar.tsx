import { useState } from 'react';
import { AppBar, Toolbar, Avatar, Button, Box } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { useAuth } from '../../context/useAuthContext';
import logo from '../../Images/logo.png';
import profile from '../../Images/profile.png';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = (): JSX.Element => {
  const { logout } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const { location } = history;
  const showAuthButtons = location.pathname == '/login' || location.pathname == '/signup' ? true : false;
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

        {!showAuthButtons && (
          <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
            <Button
              size="large"
              onClick={() => {
                history.push('/discover');
              }}
              color="primary"
              className={classes.button}
            >
              Discover
            </Button>
            <Button
              size="large"
              onClick={() => {
                history.push('/messages');
              }}
              color="primary"
              className={classes.button}
            >
              Messages
            </Button>
            <Button
              size="large"
              onClick={() => {
                history.push('/notifications');
              }}
              color="primary"
              className={classes.button}
            >
              Notifications
            </Button>
          </Box>
        )}

        <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
          {location.pathname == '/login' && (
            <Button
              size="large"
              onClick={() => {
                history.push('/signup');
              }}
              color="primary"
              className={classes.authButton}
              variant="outlined"
            >
              SIGNUP
            </Button>
          )}

          {location.pathname == '/signup' && (
            <Button
              size="large"
              onClick={() => {
                history.push('/login');
              }}
              color="primary"
              className={classes.authButton}
              variant="outlined"
            >
              LOGIN
            </Button>
          )}

          {location.pathname == '/createContest' && (
            <Button size="large" color="primary" className={classes.authButton} variant="outlined">
              CREATE CONTEST
            </Button>
          )}
        </Box>

        {!showAuthButtons && (
          <Box className={classes.navButtons} justifyContent="space-between" alignItems="center">
            <Button size="large" className={classes.button} onClick={handleClick}>
              <Avatar alt={'Placeholder for profile username'} src={profile} className={classes.avatar}></Avatar>
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
                onClick={() => {
                  history.push('/profile');
                }}
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
