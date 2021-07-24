import { useAuth } from '../../context/useAuthContext';
import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { addSubmissionToContest } from '../../helpers/APICalls/searchContest';
import { SubmissionParams } from './SubmissionParams';
import { bool } from 'yup';
import { useSnackBar } from '../../context/useSnackbarContext';
export default function Submit(): JSX.Element {
  const { loggedInUser } = useAuth();
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  return (
    <Grid container direction="column">
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Navbar />
        <FileUploader />
      </Box>
    </Grid>
  );
}

function FileUploader(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const { id } = useParams<SubmissionParams>();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  // On file select (from the pop up)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const onTitleChange = (text: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(text.target.value);
  };
  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (selectedFile && title) {
      setProcessing(true);
      uploadImage({ image: selectedFile }).then((r) => {
        if (r.success) {
          addSubmissionToContest({ title: title, contestID: id, imageFile: r.success }).then((r) => {
            if (r.submission) {
              history.goBack();
            } else {
              setProcessing(false);
              updateSnackBarMessage(r.status);
            }
          });
        } else {
          setProcessing(false);
          updateSnackBarMessage(r.error ?? '');
        }
      });
      // Request made to the backend api
      // Send formData object
    }
  };
  if (processing) return <CircularProgress />;
  return (
    <Box>
      <Typography variant="h5">Upload Image</Typography>
      <TextField margin="dense" variant="outlined" id="title" label="Title:" required onChange={onTitleChange} />
      <br />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <br />
      <button onClick={onFileUpload}>Upload!</button>
    </Box>
  );
}
