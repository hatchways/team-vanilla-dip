import React from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { Box, Input, Grid, Typography } from '@material-ui/core';

import useStyles from './useStyles';

interface ImageListProps {
  file: File;
  filename: string;
  status: string;
  storageRef: string;
  downloadUrl: string;
  description: string;
}

interface DropZoneProps {
  setImageList: React.Dispatch<React.SetStateAction<ImageListProps[]>>;
}

export default function ImagesDropZone({ setImageList }: DropZoneProps): JSX.Element {
  const classes = useStyles();
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newImages = Array.from(acceptedFiles).map((file) => {
        return {
          file: file,
          filename: file.name,
          status: 'CREATED',
          storageRef: URL.createObjectURL(file),
          downloadUrl: '',
          description: '',
        };
      });
      setImageList((prevState) => [...prevState, ...newImages]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpg, image/jpeg, image/png, image/gif',
    noClick: false,
    noKeyboard: true,
  });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Box className={classes.dropOverContainer}>
              <CloudUploadOutlinedIcon className={classes.cloudUpload} />
            </Box>
          </Grid>
          <Grid item>
            <Typography component="h3" variant="h3">
              Drop here
            </Typography>
            <Box my={2}>
              <Typography component="p">High resolution images</Typography>
              <Typography component="p">PNG,JPG,GIF</Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box className={classes.dropOverContainer}>
              <CloudUploadOutlinedIcon className={classes.cloudUpload} />
            </Box>
          </Grid>
          <Grid item>
            <Typography component="h3" variant="h3">
              Click to choose a file
            </Typography>
            <Box my={2}>
              <Typography component="p">High resolution images</Typography>
              <Typography component="p">PNG,JPG,GIF</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
