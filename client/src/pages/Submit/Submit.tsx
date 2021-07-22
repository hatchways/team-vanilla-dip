import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
export default function Submit(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  useEffect(() => {
    initSocket();
  }, [initSocket]);
  const classes = useStyles();
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  return (
    <Grid container>
      <CssBaseline />
      <Box className={classes.contentWrapper}>
        <Navbar />
        <FileUploader />
      </Box>
    </Grid>
  );
}

function FileUploader(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // On file select (from the pop up)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const history = useHistory();

  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (selectedFile) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append('myFile', selectedFile, selectedFile.name);

      // Details of the uploaded file
      console.log(selectedFile);
      uploadImage({ image: selectedFile }).then((r) => {
        console.log(r);
        history.goBack();
      });
      // Request made to the backend api
      // Send formData object
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <div>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
    </div>
  );
}
