import React from 'react';
import { Box, Paper, ImageList, ImageListItem, IconButton } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import useStyles from './useStyles';

interface ImageListProps {
  file: File;
  filename: string;
  status: string;
  storageRef: string;
  downloadUrl: string;
  description: string;
}

interface ArrayImageList {
  imageList: ImageListProps[];
  handleDeleteImage: (index: number) => void;
}

function ImageElement({ imageList, handleDeleteImage }: ArrayImageList): JSX.Element {
  const classes = useStyles();

  return (
    <Box my={2}>
      <Paper>
        <ImageList rowHeight={160} cols={4}>
          {imageList.map((image, index) => (
            <ImageListItem key={image.storageRef} style={{ maxHeight: '17.5em' }}>
              <IconButton onClick={() => handleDeleteImage(index)} className={classes.trashBtn}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              <img src={image.storageRef} />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Box>
  );
}

export default ImageElement;
