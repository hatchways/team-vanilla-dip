import React from 'react';
import { useAuth } from '../../../context/useAuthContext';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './useStyles';
import SubmissionCardProps from '../SumissionCardInterface';
import { Contest } from '../../../interface/Contest';
import { User } from '../../../interface/User';

function SubmissionCard({ imageSrc, author, contest }: SubmissionCardProps): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();

  const handleWinnerSelection = (imageSrc: string, author: User, contest: Contest, user: User | null | undefined) => {
    console.log(imageSrc, author, contest, user);
    //Winner Selection Client End Logic
    //2. Make a winner object similar to database model
    //3. Post the winner object to the server
    //4. Send Email to the user and the winner
    //5. Charge the customer
    //6. updateSnackbar message "Card Charged"
  };

  return (
    <Card className={classes.submissionCard}>
      <CardMedia component="img" alt="Contemplative Reptile" height="300" image={imageSrc} />
      <Box className={classes.displayOver}>
        <CardContent className={classes.submissionContent}>
          <Typography gutterBottom variant="h5" component="h2">
            <Button
              className={classes.winner}
              onClick={() => handleWinnerSelection(imageSrc, author, contest, loggedInUser)}
            >
              <DoneIcon />
              Winner
            </Button>
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
