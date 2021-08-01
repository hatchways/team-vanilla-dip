import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Container, Paper } from '@material-ui/core';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { addSubmissionToContest } from '../../helpers/APICalls/searchContest';
import { SubmissionParams } from './SubmissionParams';
import { useSnackBar } from '../../context/useSnackbarContext';

import ImagesDropZone from './ImageDropZone/ImageDropZone';
import ImageElement from './ImageElement/ImageElement';

interface ImageListProps {
  file: File;
  filename: string;
  status: string;
  storageRef: string;
  downloadUrl: string;
  description: string;
}

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
  const [imageList, setImageList] = useState<ImageListProps[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const { id } = useParams<SubmissionParams>();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  const handleDeleteImage = (index: number) => {
    const newArray = [...imageList];
    newArray.splice(index, 1);
    setImageList(newArray);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (imageList.length > 0) {
      setProcessing(true);
      imageList.forEach((image) => {
        uploadImage({ image: image.file }).then((resp) => {
          if (resp.success) {
            addSubmissionToContest({ contestID: id, imageFile: resp.success }).then((resp) => {
              if (resp.submission) {
                console.log(resp.submission);
              } else {
                setProcessing(false);
                updateSnackBarMessage(resp.status);
              }
            });
          } else {
            setProcessing(false);
            updateSnackBarMessage(resp.error ?? '');
          }
        });
      });
      return history.goBack();
    }
    updateSnackBarMessage('No image selected');
  };
  // const onFileUpload = () => {
  //   if (selectedFile) {
  //     setProcessing(true);
  //     uploadImage({ image: selectedFile }).then((r) => {
  //       if (r.success) {
  //         addSubmissionToContest({ contestID: id, imageFile: r.success }).then((r) => {
  //           if (r.submission) {
  //             history.goBack();
  //           } else {
  //             setProcessing(false);
  //             updateSnackBarMessage(r.status);
  //           }
  //         });
  //       } else {
  //         setProcessing(false);
  //         updateSnackBarMessage(r.error ?? '');
  //       }
  //     });
  //     // Request made to the backend api
  //     // Send formData object
  //   }
  // };

  if (processing) return <CircularProgress />;
  return (
    <Container>
      <Box my={10} width="70%" m="auto" className={classes.alignCenter}>
        <Paper elevation={2}>
          <Container className={classes.paperContainer}>
            <Typography component="h2" variant="h3" className={classes.header}>
              Submit Design
            </Typography>
            <ImagesDropZone setImageList={setImageList} />
            <br />
            {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
            <br />
          </Container>
        </Paper>
        {imageList.length > 0 && <ImageElement imageList={imageList} handleDeleteImage={handleDeleteImage} />}
        <Box className={classes.submitContainer}>
          <button onClick={onFileUpload} className={classes.submitBtn}>
            Submit
          </button>
        </Box>
      </Box>
    </Container>
  );
}
