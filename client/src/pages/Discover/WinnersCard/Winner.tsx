import React from 'react';
import useStyles from './useStyles';
import moment from 'moment';
import { Typography, Grid, Card, CardActionArea, CardMedia } from '@material-ui/core';

interface Props {
  image: string;
  contestTitle: string;
  username: string;
  winningDate: string;
}

export default function WinnerCard({ image, contestTitle, username, winningDate }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.cardBackground}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1">{contestTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{moment(winningDate).format('MMM Do, YYYY')}</Typography>
        </Grid>
      </Grid>
      <CardActionArea>
        <CardMedia component="img" src={image} alt="Winner's Submitted Design" height="175px" />
      </CardActionArea>
      <Grid container>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {`by @${username}`}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
