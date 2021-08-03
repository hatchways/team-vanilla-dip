import React, { useState } from 'react';
import { Grid, Typography, Box, Avatar, CircularProgress, InputLabel, Input, Button } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

import SidePanel from '../../components/SidePanel/SidePanel';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { updateProfile } from '../../helpers/APICalls/updateProfile';

function Profile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  if (loggedInUser.profile === undefined) return <CircularProgress />;
  if (!loggedInUser.profile) {
    return <CircularProgress />;
  }

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
              window.location.reload();
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
    <SidePanel>
      <Grid>
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
      </Grid>
    </SidePanel>
  );
}

export default Profile;
