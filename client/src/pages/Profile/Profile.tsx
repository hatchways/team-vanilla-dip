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
  const { loggedInUser, updateLoginContext } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  if (loggedInUser === undefined || !loggedInUser || loggedInUser.profile === undefined) return <CircularProgress />;

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCurrentFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
    if (currentFile == null && !previewUrl) {
      event.target.value = '';
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
            if (resp.success) {
              updateLoginContext(resp.success);
            } else {
              setProcessing(false);
              updateSnackBarMessage(resp.status);
            }
          });
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
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Grid item className={classes.imageContainer}>
              {processing ? (
                <CircularProgress className={classes.circularProgress} />
              ) : (
                [
                  previewUrl ? (
                    <Avatar
                      alt={'Placeholder for profile username'}
                      src={previewUrl}
                      className={classes.large}
                      key="previewImage"
                    />
                  ) : (
                    <Avatar
                      alt={'Placeholder for profile username'}
                      src={loggedInUser.profile.profileImage}
                      className={classes.large}
                      key="profileImage"
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
            <Grid item className={classes.textCenter}>
              <Typography component="h4" variant="h2">
                {loggedInUser.username}
              </Typography>
              <br />
              <Typography component="p">Email: {loggedInUser.email}</Typography>
              <Box my={1}>
                <Button onClick={imageUpload} className={classes.btn}>
                  Update Image
                </Button>
                {currentFile && (
                  <Button onClick={cancelUpload} className={classes.ml20}>
                    Reset Image
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </SidePanel>
  );
}

export default Profile;
