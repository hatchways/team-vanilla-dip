import { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import momentTimezone from 'moment-timezone';
import moment, { Moment } from 'moment';
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { tatooDesigns as images } from './testdata.js';
import checkmark from './checkmark.png';

import {
  CircularProgress,
  Grid,
  InputAdornment,
  Box,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  ImageList,
  ImageListItem,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

interface ContestFormValues {
  title: string;
  description: string;
  prizeAmount: number;
  date: MaterialUiPickersDate | Moment | string | null;
  time: MaterialUiPickersDate | Moment | string | null;
  timeZone: string;
  imageFiles: string[];
}

interface Props {
  handleSubmit: (
    {
      title,
      description,
      prizeAmount,
      date,
      time,
      timeZone,
      imageFiles,
    }: {
      title: string;
      description: string;
      prizeAmount: number;
      date: MaterialUiPickersDate | Moment | string | null;
      time: MaterialUiPickersDate | Moment | string | null;
      timeZone: string;
      imageFiles: string[];
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      description: string;
      prizeAmount: number;
      date: MaterialUiPickersDate | Moment | string | null;
      time: MaterialUiPickersDate | Moment | string | null;
      timeZone: string;
      imageFiles: string[];
    }>,
  ) => void;
}

export const ContestForm: React.FC<Props> = ({ handleSubmit }) => {
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedDateTime, handleDateTimeChange] = useState<MaterialUiPickersDate | Moment>(moment());
  const [timeZone, setTimeZone] = useState<string | unknown>(moment.tz.guess());

  const selectImages = (image: string) => {
    let newSelectedImages = selectedImages;
    if (newSelectedImages.includes(image)) {
      newSelectedImages = newSelectedImages.filter((img) => img !== image);
    } else {
      newSelectedImages = [...newSelectedImages, image];
    }
    setSelectedImages(newSelectedImages);
    return selectedImages;
  };

  const initialValues: ContestFormValues = {
    title: '',
    description: '',
    prizeAmount: 0,
    date: moment(),
    time: moment(),
    timeZone: moment.tz.guess(),
    imageFiles: [],
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Contest title is required'),
        description: Yup.string().required('Contest description is required'),
        prizeAmount: Yup.number().positive().integer().required(),
        date: Yup.date().required('Date is required'),
        time: Yup.date().required('Time is required'),
        timeZone: Yup.string().required('Time zone is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container direction="column">
            <Grid item style={{ marginBottom: 0 }}>
              <Typography variant="h3" align="left">
                What do you need designed?
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: '3em' }}>
              <TextField
                variant="outlined"
                id="title"
                margin="normal"
                placeholder="Write a descriptive contest title"
                name="title"
                helperText={touched.title ? errors.title : ''}
                error={touched.title && Boolean(errors.title)}
                value={values.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ marginBottom: 0 }}>
              <Typography variant="h3" align="left">
                Description
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: '3em' }}>
              <TextField
                variant="outlined"
                id="description"
                margin="normal"
                placeholder="Write a descriptive contest title"
                name="description"
                helperText={touched.description ? errors.description : ''}
                error={touched.description && Boolean(errors.description)}
                value={values.description}
                onChange={handleChange}
                rows={10}
                multiline
                fullWidth
              />
            </Grid>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid item container spacing={2} style={{ marginBottom: '3em' }}>
                <Grid item xs={3}>
                  <Typography variant="h3" align="left">
                    Prize amount
                  </Typography>
                  <TextField
                    variant="outlined"
                    id="prizeAmount"
                    margin="normal"
                    placeholder="100.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" style={{ marginLeft: '3px' }}>
                          $
                        </InputAdornment>
                      ),
                    }}
                    name="prizeAmount"
                    helperText={touched.prizeAmount ? errors.prizeAmount : ''}
                    error={touched.prizeAmount && Boolean(errors.prizeAmount)}
                    value={values.prizeAmount === 0 ? '' : values.prizeAmount}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h3" align="left">
                    Deadline
                  </Typography>
                  <Grid item container spacing={0} style={{ marginTop: '1.35em' }}>
                    <Grid item xs={5}>
                      <KeyboardDatePicker
                        variant="inline"
                        inputVariant="outlined"
                        name="date"
                        id="date"
                        format="MM/DD/yyyy"
                        error={touched.date && Boolean(errors.date)}
                        value={selectedDateTime}
                        minDate={moment()}
                        onChange={(date) => {
                          handleDateTimeChange(date);
                          setFieldValue('date', date);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <KeyboardTimePicker
                        variant="inline"
                        inputVariant="outlined"
                        name="time"
                        id="time"
                        mask="__:__ _M"
                        format="HH:mm a"
                        error={touched.time && Boolean(errors.time)}
                        value={selectedDateTime}
                        onChange={(time) => {
                          handleDateTimeChange(time);
                          setFieldValue('time', time);
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          id="timeZone"
                          labelId="timeZone-label"
                          name="timeZone"
                          defaultValue="America/Toronto"
                          value={timeZone}
                          onChange={(e) => {
                            setTimeZone(e.target.value);
                            setFieldValue('timeZone', e.target.value);
                          }}
                        >
                          {momentTimezone.tz.names().map((tz) => (
                            <MenuItem key={tz} value={tz}>
                              {tz}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item container direction="column" style={{ marginBottom: '3em' }}>
              <Grid item xs={12}>
                <Typography variant="h3" align="left" style={{ marginBottom: '1em' }}>
                  Which designs do you like?
                </Typography>
                <Typography variant="subtitle1" align="left" style={{ marginBottom: '2em' }}>
                  {`Let's start by helping your designers understand which styles you prefer.`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={1} style={{ padding: '1em' }}>
                  <ImageList rowHeight={160} cols={4} style={{ maxHeight: 450 }}>
                    {images.map((imgUrl) => (
                      <ImageListItem
                        key={imgUrl}
                        style={{ maxHeight: '17.5em' }}
                        onClick={() => {
                          selectImages(imgUrl);
                          setFieldValue('imageFiles', selectedImages);
                        }}
                      >
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                          className={selectedImages.includes(imgUrl) ? classes.overlay : classes.noOverlay}
                        >
                          <Grid item>
                            <img src={checkmark} alt="checkmark" />
                          </Grid>
                        </Grid>
                        <img
                          src={imgUrl}
                          className={selectedImages.includes(imgUrl) ? classes.selected : classes.image}
                          alt="tatoo design"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Paper>
              </Grid>
            </Grid>
            <Box textAlign="center" style={{ marginTop: '2em' }}>
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'CREATE CONTEST'}
              </Button>
            </Box>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
