import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';

import { useAuth } from '../../../context/useAuthContext';
import { Contest } from '../../../interface/Contest';
import useStyles from './useStyles';
import SubmissionCardProps from '../SumissionCardInterface';
import { fetchContestById } from '../../../helpers/APICalls/searchContest';

export interface ParamProps {
  id: string;
}

function SubmissionCard({ imageSrc, author }: SubmissionCardProps): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [contest, setContest] = useState<Contest>();
  const { id } = useParams<ParamProps>();

  useEffect(() => {
    const ac = new AbortController();
    fetchContestById({ id: id }).then((res) => {
      if (res.success) {
        setContest(res.success as Contest);
      }
    });
    return ac.abort();
  }, [id]);

  if (loggedInUser === undefined || !loggedInUser || contest == undefined || contest.userID == undefined)
    return <CircularProgress />;

  return (
    <Card className={classes.submissionCard}>
      <CardMedia component="img" alt="Contemplative Reptile" height="300" image={imageSrc} />
      <Box className={classes.displayOver}>
        <CardContent className={classes.submissionContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {loggedInUser.id == contest?.userID._id && (
              <Button className={classes.winner}>
                <DoneIcon />
                Winner
              </Button>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            By @{author}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default SubmissionCard;
