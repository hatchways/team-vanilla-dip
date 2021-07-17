import { Formik } from 'formik';
import { useState } from 'react';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { tatooDesigns as images } from './testdata.js';
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

interface MyFormValues {
  title: string;
  description: string;
  prizeAmount: number;
  date: Date | null | undefined;
  time: Date | null | undefined;
  timezone: string;
}

export const ContestForm: React.FC = () => {
  const classes = useStyles();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const selectImages = (image: string) => {
    const newSelectedImages = selectedImages;
    newSelectedImages.push(image);
    setSelectedImages(newSelectedImages);
  };

  const initialValues: MyFormValues = {
    title: '',
    description: '',
    prizeAmount: 0,
    date: new Date(),
    time: new Date(),
    timezone: 'America/Toronto',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Contest title is required'),
        description: Yup.string().required('Contest description is required'),
        prizeAmount: Yup.number().required().positive().integer(),
        date: Yup.date().required('Date is required'),
        time: Yup.date().required('Time is required'),
        timezone: Yup.string().required('Time zone is required'),
      })}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
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
                    value={values.prizeAmount}
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
                        value={values.date}
                        onChange={handleChange}
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
                        value={values.time}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          id="timeZone"
                          labelId="timeZone-label"
                          name="timeZone"
                          defaultValue="America/Toronto"
                          value={values.timezone}
                          onChange={handleChange}
                        >
                          {moment.tz.names().map((tz, i) => (
                            <MenuItem key={i} value={tz}>
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
                    {images.map((img) => (
                      <ImageListItem key={img} style={{ maxHeight: '17.5em' }} onClick={() => selectImages(img)}>
                        <img src={img} alt="tatoo design" />
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
