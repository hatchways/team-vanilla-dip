import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, Grid, InputAdornment, Box, TextField, Button } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      title,
      description,
      prizeAmount,
    }: {
      title: string;
      description: string;
      prizeAmount: number;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      title: string;
      description: string;
      prizeAmount: number;
    }>,
  ) => void;
}

export default function ContestForm({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        prizeAmount: 0,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Contest title is required'),
        description: Yup.string().required('Contest description is required'),
        prizeAmount: Yup.number().required().positive().integer(),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  disableUnderline: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  disableUnderline: true,
                }}
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
            <Grid item container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h3" align="left">
                  Prize amount
                </Typography>
                <TextField
                  variant="outlined"
                  id="prizeAmount"
                  margin="normal"
                  placeholder="100.00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    disableUnderline: true,
                  }}
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
                <Grid item container spacing={0}>
                  <Grid item xs={5}>
                    TestSpace
                  </Grid>
                  <Grid item xs={4}>
                    TestSpace
                  </Grid>
                  <Grid item xs={3}>
                    TestSpace
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'CREATE CONTEST'}
              </Button>
            </Box>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
