import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import ContestForm from './ContestForm/ContestForm';

export default function Login(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    { title, description, prizeAmount }: { title: string; description: string; prizeAmount: number },
    { setSubmitting }: FormikHelpers<{ title: string; description: string; prizeAmount: number }>,
  ) => {
    console.log(title);
    console.log(description);
    console.log(prizeAmount);
    setSubmitting(true);
  };
  console.log('Contest Component');
  return (
    <Grid container component="main" className={classes.root} justifyContent="center">
      <CssBaseline />
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
