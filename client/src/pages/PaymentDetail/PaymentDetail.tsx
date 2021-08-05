import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SidePanel from '../../components/SidePanel/SidePanel';
import StripeCard from './StripeCard/StripeCard';
import useStyles from './useStyles';

const stripePromise = loadStripe(
  'pk_test_51JJmDgLdhiAD8tsO4INyf5m6KgIz5LmKFo0UEmm8jtZvdKFEgOjHf4Uj3viu8hN52yI2lCqsAKcQeD5TxYpOmjs000ECyz2UoJ',
);

function PaymentDetail(): JSX.Element {
  const classes = useStyles();

  return (
    <SidePanel>
      <Elements stripe={stripePromise}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1">Payment details</Typography>
          </Grid>
          <Grid item xs={12} className={classes.instruction}>
            <Typography variant="h3">Enter your card details:</Typography>
          </Grid>
          <Grid item xs={12} className={classes.instruction}>
            <StripeCard />
          </Grid>
        </Grid>
      </Elements>
    </SidePanel>
  );
}

export default PaymentDetail;
