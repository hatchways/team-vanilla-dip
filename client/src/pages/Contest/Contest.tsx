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
import stripeCustomer from '../../helpers/APICalls/createStripeCustomer';
import Navbar from '../../components/Navbar/Navbar';
import createContest from '../../helpers/APICalls/createContests';

export default function Contest(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();
  const handleSubmit = async (
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
    const contest = await createContest(
      title,
      description,
      prizeAmount,
      createDeadlineDate(date, time, timeZone),
      imageFiles,
    );

    if (contest.error) {
      setSubmitting(false);
      updateSnackBarMessage(contest.error.message);
    } else if (contest.success) {
      history.push('/dashboard');
    } else {
      console.error({ contest });
      setSubmitting(false);
      updateSnackBarMessage('An unexpected error occured. Please try again');
    }

    const stripeUser = await stripeCustomer();

    if (stripeUser.existingStripeCustomer) {
      console.log('Existing Stripe User');
    } else {
      console.log('New Stripe User Created.');
    }
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
