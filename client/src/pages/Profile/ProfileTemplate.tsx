import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, CssBaseline, Box, Tabs, Tab, Typography, Paper, useMediaQuery, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { updateProfile } from '../../helpers/APICalls/updateProfile';

import Navbar from '../../components/Navbar/Navbar';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

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
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [processing, setProcessing] = useState<boolean>(false);
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  if (loggedInUser.profile === undefined) return <CircularProgress />;
  if (!loggedInUser.profile) {
    return <CircularProgress />;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCurrentFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const cancelUpload = () => {
    setCurrentFile(null);
    setPreviewUrl('');
  };

  const imageUpload = () => {
    if (currentFile) {
      setProcessing(true);
      uploadImage({ image: currentFile }).then((resp) => {
        if (resp.success) {
          updateProfile({ profileImage: resp.success }).then((resp) => {
            if (resp.profile) {
              alert('Changed Succesfully');
              console.log(resp);
              console.log('Updated');
            } else {
              setProcessing(false);
              updateSnackBarMessage(resp.status);
            }
          });
          console.log(resp);
          setProcessing(false);
        } else {
          setProcessing(false);
          updateSnackBarMessage(resp.error ?? '');
        }
      });
    } else {
      updateSnackBarMessage('Please Select an Image to upload');
    }
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
              <Box my={2}>
                <Grid container className={classes.alignCenter}>
                  <Grid item className={classes.imageContainer}>
                    {processing ? (
                      <CircularProgress />
                    ) : (
                      [
                        previewUrl ? (
                          <Avatar alt={'Placeholder for profile username'} src={previewUrl} className={classes.large} />
                        ) : (
                          <Avatar
                            alt={'Placeholder for profile username'}
                            src={loggedInUser.profile.profileImage}
                            className={classes.large}
                          />
                        ),
                      ]
                    )}
                    {!processing && (
                      <Box className={classes.cameraImage}>
                        <InputLabel htmlFor="profile-button" className={classes.fileInputLabel}>
                          <CameraAltOutlinedIcon fontSize="large" />
                        </InputLabel>
                        <Input id="profile-button" type="file" className={classes.fileInput} onChange={fileChange} />
                      </Box>
                    )}
                  </Grid>
                  <Grid item className={classes.ml20}>
                    <Typography component="h4" variant="h3">
                      {loggedInUser.username}
                    </Typography>
                    <Typography component="p">Email: {loggedInUser.email}</Typography>
                    <Box my={1}>
                      <Button onClick={imageUpload}>Update Image</Button>
                      {currentFile && <Button onClick={cancelUpload}>Reset Image</Button>}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
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
