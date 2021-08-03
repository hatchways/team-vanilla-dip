import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FormikHelpers } from 'formik';
import { Moment } from 'moment';
import { useSnackBar } from '../../context/useSnackbarContext';

import createDeadlineDate from './ContestForm/helpers/createDeadlineDate.js';
import useStyles from './useStyles';
import { ContestForm } from './ContestForm/ContestForm';
import Navbar from '../../components/Navbar/Navbar';
import createContest from '../../helpers/APICalls/createContests';

export default function Contest(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = (
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
  ) => {
    createContest(title, description, prizeAmount, createDeadlineDate(date, time, timeZone), imageFiles).then(
      (data) => {
        if (data.error) {
          setSubmitting(false);
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          history.push('/dashboard');
          updateSnackBarMessage('Created Contest Successfully');
        } else {
          console.error({ data });
          setSubmitting(false);
          updateSnackBarMessage('An unexpected error occured. Please try again');
        }
      },
    );
  };

  return (
    <Grid container component="main" className={classes.root} justifyContent="center">
      <CssBaseline />
      <Navbar />
      <Grid item container direction="column" justifyContent="flex-start" alignItems="center" xs={12} sm={10}>
        <Grid item className={classes.contestHeading}>
          <Typography align="center" color="primary" variant="h1" gutterBottom paragraph>
            Create new contest
          </Typography>
        </Grid>
        <Grid item className={classes.contestFormContainer}>
          <Paper elevation={3} className={classes.contestFormWrapper} square>
            <ContestForm handleSubmit={handleSubmit} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
