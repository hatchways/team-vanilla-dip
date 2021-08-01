import React from 'react';
import { Box, Grid, Paper, ImageList, ImageListItem } from '@material-ui/core';

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
}

function ImageElement({ imageList }: ArrayImageList): JSX.Element {
  return (
    <Box my={2}>
      <Paper>
        <ImageList rowHeight={160} cols={4}>
          {imageList.map((image) => (
            <ImageListItem key={image.storageRef} style={{ maxHeight: '17.5em' }}>
              <img src={image.storageRef} />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Box>
  );
}

export default ImageElement;
