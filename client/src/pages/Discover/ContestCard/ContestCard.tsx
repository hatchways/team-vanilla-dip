import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import moment from 'moment';
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';

interface Props {
  title: string;
  description: string;
  prizeAmount: number;
  image: string;
  deadlineDate: string;
  id: string;
}

export default function ContestCard({ title, description, prizeAmount, image, deadlineDate, id }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Card elevation={2}>
      <CardActionArea component={Link} to={'/contest/' + id}>
        <CardMedia>
          <img src={image} alt="Contest Inspiration Image" width="100%" height="400px" />
        </CardMedia>
      </CardActionArea>
      <CardContent>
        <Grid container direction="column" className={classes.cardContentContainer}>
          <Typography variant="h5" component={Link} to={'/contest/' + id} className={classes.cardTitle} gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" className={classes.cardDesc} gutterBottom>
            {description}
          </Typography>
        </Grid>
      </CardContent>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={6} container className={classes.border} justifyContent="center">
            <Grid item xs={12} className={classes.extendedInfo}>
              <Typography variant="h3" align="center" color="secondary">
                Prize
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.extendedDetail}>
              <Typography variant="body1" align="center" className={classes.prizeAmount}>
                {`$${prizeAmount}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" xs={6}>
            <Grid item xs={12} className={classes.extendedInfo}>
              <Typography variant="h3" align="center" color="secondary">
                Deadline
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.extendedDetail}>
              <Typography variant="body1" align="center" className={classes.date}>
                {moment(deadlineDate).format('MMMM, Do')}
              </Typography>
              <Typography variant="body1" align="center" className={classes.time}>
                {moment(deadlineDate).format('h:m A')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
