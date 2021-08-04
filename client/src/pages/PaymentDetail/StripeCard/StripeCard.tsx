import React from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './useStyles';

const useOptions = () => {
  const options = {
    style: {
      base: {
        fontSize: '24px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Arial',
        '::placeholder': {
          color: '#d1d1d1',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  return options;
};

const StripeCard = (): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const classes = useStyles();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const stripeCardNumberElement = elements.getElement(CardNumberElement);

    if (stripeCardNumberElement) {
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: stripeCardNumberElement,
      });
      console.log('[PaymentMethod]', payload);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item container>
          <Grid item xs={6} className={classes.cardInfoField}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Card Number</Typography>
            </Grid>
            <Grid item xs={12}>
              <CardNumberElement options={options} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container className={classes.expiryCvvContainer}>
          <Grid item xs={3} className={classes.cardInfoField}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Expiration date</Typography>
            </Grid>
            <Grid item xs={12}>
              <CardExpiryElement options={options} />
            </Grid>
          </Grid>
          <Grid item xs={3} className={classes.cardInfoField}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">CVC</Typography>
            </Grid>
            <Grid item xs={12}>
              <CardCvcElement options={options} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.buttonContainer}>
          <Button
            variant="outlined"
            size="large"
            className={classes.addCard}
            fullWidth
            type="submit"
            disabled={!stripe}
          >
            Add Card
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StripeCard;
