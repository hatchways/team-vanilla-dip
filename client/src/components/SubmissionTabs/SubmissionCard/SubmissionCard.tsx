
import { useAuth } from '../../../context/useAuthContext';
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
import { Contest } from '../../../interface/Contest';
import { User } from '../../../interface/User';
import { Winner } from '../../../interface/Winner';
import { postWinner } from '../../../helpers/APICalls/winners';
import chargeCustomer from '../../../helpers/APICalls/chargeCustomer';
import { useSnackBar } from '../../../context/useSnackbarContext';
import deadlinePassed from '../../../helpers/datePassed';
import { fetchContestById } from '../../../helpers/APICalls/searchContest';

export interface ParamProps {
  id: string;
}

function SubmissionCard({ imageSrc, author, contest }: SubmissionCardProps): JSX.Element {
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

  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleWinnerSelection = async (
    imageSrc: string,
    author: User,
    contest: Contest,
    user: User | null | undefined,
  ) => {
    const winner: Winner = {
      contestTitle: contest.title,
      image: imageSrc,
      username: author.username,
      winningDate: new Date(),
    };

    const saveWinner = await postWinner(winner, contest._id);

    if (saveWinner && saveWinner.winner) {
      const processingPayment = await chargeCustomer(contest._id);

      if (processingPayment && processingPayment.status) {
        updateSnackBarMessage('Card on file has been successfully charged. Thank you');
        // Send Email to the user and the winner
        console.log(`Email will be sent to ${author.username} and ${user?.username}`);
      }
    }
  };

  return (
    <Card className={classes.submissionCard}>
      <CardMedia component="img" alt="Contemplative Reptile" height="300" image={imageSrc} />
      <Box className={classes.displayOver}>
        <CardContent className={classes.submissionContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {deadlinePassed(contest.deadlineDate) ? (
              <Button
                className={classes.winner}
                onClick={() => handleWinnerSelection(imageSrc, author, contest, loggedInUser)}
              >
                <DoneIcon />
                Winner
              </Button>
            ) : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            By @{author.username}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default SubmissionCard;
