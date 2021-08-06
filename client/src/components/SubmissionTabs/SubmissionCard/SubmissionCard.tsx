import { useAuth } from '../../../context/useAuthContext';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './useStyles';
import SubmissionCardProps from '../SumissionCardInterface';
import { Contest } from '../../../interface/Contest';
import { User } from '../../../interface/User';
import { Winner } from '../../../interface/Winner';
import { postWinner } from '../../../helpers/APICalls/winners';
import chargeCustomer from '../../../helpers/APICalls/chargeCustomer';
import { useSnackBar } from '../../../context/useSnackbarContext';
import deadlinePassed from '../../../helpers/datePassed';

function SubmissionCard({ imageSrc, author, contest }: SubmissionCardProps): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  if (loggedInUser === undefined || !loggedInUser || contest == undefined || contest.userID == undefined)
    return <CircularProgress />;

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
    } else if (saveWinner && saveWinner.status) {
      updateSnackBarMessage(saveWinner.status);
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
