import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './useStyles';
import SubmissionCardProps from '../SumissionCardInterface';

function SubmissionCard({ imageSrc, title, author }: SubmissionCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.submissionCard}>
      <CardActionArea>
        <CardMedia component="img" alt="Contemplative Reptile" height="300" image={imageSrc} title={title} />
        <Box className={classes.displayOver}>
          <CardContent className={classes.submissionContent}>
            <Typography gutterBottom variant="h5" component="h2">
              <Button className={classes.winner}>
                <DoneIcon />
                Winner
              </Button>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              By @{author}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default SubmissionCard;
