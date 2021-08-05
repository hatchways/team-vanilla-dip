import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Container, Paper, Button } from '@material-ui/core';

import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';
import { uploadImage } from '../../helpers/APICalls/uploadImage';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { addSubmissionToContest } from '../../helpers/APICalls/searchContest';
import { SubmissionParams } from './SubmissionParams';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Contest } from '../../interface/Contest';
import { fetchContestById } from '../../helpers/APICalls/searchContest';
import { createSubmitNotification } from '../../helpers/APICalls/notification';

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
  const { id } = useParams<SubmissionParams>();
  const [contest, setContest] = useState<Contest>();
  const history = useHistory();

  useEffect(() => {
    const ac = new AbortController();
    fetchContestById({ id: id }).then((res) => {
      if (res.success) {
        setContest(res.success as Contest);
      }
    });
    return ac.abort();
  }, [id]);

  if (loggedInUser === undefined || !loggedInUser || contest?.userID == undefined) return <CircularProgress />;

  if (loggedInUser.id == contest?.userID._id) history.goBack();

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
  const [contest, setContest] = useState<Contest>();
  const [processing, setProcessing] = useState<boolean>(false);
  const { id } = useParams<SubmissionParams>();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  useEffect(() => {
    const ac = new AbortController();
    fetchContestById({ id: id }).then((res) => {
      if (res.success) {
        setContest(res.success as Contest);
      }
    });
    return ac.abort();
  }, [id]);

  if (contest === undefined || !contest || contest.userID === undefined || !contest.userID) return <CircularProgress />;

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
                updateSnackBarMessage(
                  `Submitted ${imageList.length} images to ${contest == undefined ? 'Contest' : contest.title}`,
                );
                {
                  contest.userID == undefined
                    ? updateSnackBarMessage('Could not send Notification to contest owner')
                    : createSubmitNotification({ receiverID: contest.userID._id }).then((resp) => {
                        console.log(resp);
                      });
                }
                history.goBack();
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
            <br />
          </Container>
        </Paper>
        {imageList.length > 0 && <ImageElement imageList={imageList} handleDeleteImage={handleDeleteImage} />}
        <Box className={classes.submitContainer}>
          <Button onClick={onFileUpload} className={classes.submitBtn}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
