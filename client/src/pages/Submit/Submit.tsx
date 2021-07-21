import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Button, Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import './Submit.css';
export default function Submit(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  return (
    <Grid container>
      <CssBaseline />
      <Box width="100%">
        <Navbar />
        <FileUploader />
      </Box>
    </Grid>
  );
}

class FileUploader extends React.Component {
  static counter = 0;
  fileUploaderInput: HTMLElement | null = null;

  state = { dragging: false, file: null };

  dragEventCounter = 0;
  dragenterListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      this.setState({ dragging: true });
    } else if (event.dataTransfer.types && event.dataTransfer.types[0] === 'Files') {
      // This block handles support for IE - if you're not worried about
      // that, you can omit this
      this.setState({ dragging: true });
    }
  };

  dragleaveListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter--;

    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false });
    }
  };

  dropListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      this.setState({ file: event.dataTransfer.files[0] });
    }
  };

  overrideEventDefaults = (event: Event | React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  onSelectFileClick = () => {
    this.fileUploaderInput && this.fileUploaderInput.click();
  };

  onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ file: event.target.files[0] });
    }
  };

  componentDidMount() {
    window.addEventListener('dragover', (event: Event) => {
      this.overrideEventDefaults(event);
    });
    window.addEventListener('drop', (event: Event) => {
      this.overrideEventDefaults(event);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.overrideEventDefaults);
    window.removeEventListener('drop', this.overrideEventDefaults);
  }

  render() {
    return (
      <FileUploaderPresentationalComponent
        dragging={this.state.dragging}
        file={this.state.file}
        onSelectFileClick={this.onSelectFileClick}
        onDrag={this.overrideEventDefaults}
        onDragStart={this.overrideEventDefaults}
        onDragEnd={this.overrideEventDefaults}
        onDragOver={this.overrideEventDefaults}
        onDragEnter={this.dragenterListener}
        onDragLeave={this.dragleaveListener}
        onDrop={this.dropListener}
      >
        <input
          ref={(el) => (this.fileUploaderInput = el)}
          type="file"
          className="file-uploader__input"
          onChange={this.onFileChanged}
        />
      </FileUploaderPresentationalComponent>
    );
  }
}
type PresentationalProps = {
  dragging: boolean;
  file: File | null;
  onSelectFileClick: () => void;
  onDrag: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

function FileUploaderPresentationalComponent({
  dragging,
  file,
  onSelectFileClick,
  onDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  children,
}: React.PropsWithChildren<PresentationalProps>): JSX.Element {
  let uploaderClasses = 'file-uploader';
  if (dragging) {
    uploaderClasses += ' file-uploader--dragging';
  }

  const fileName = file ? file.name : 'No File Uploaded!';

  return (
    <div
      className={uploaderClasses}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="file-uploader__contents">
        <span className="file-uploader__file-name">{fileName}</span>
        <span>Drag & Drop File</span>
        <span>or</span>
        <span onClick={onSelectFileClick}>Select File</span>
      </div>
      {children}
    </div>
  );
}
