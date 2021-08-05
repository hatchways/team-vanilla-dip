import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { useSnackBar } from '../../../context/useSnackbarContext';
import getSetupIntent from '../../../helpers/APICalls/getSetupIntent';
import { useHistory } from 'react-router-dom';
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
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      updateSnackBarMessage('Payment system not available. Please try again');
      setLoading(false);
      return;
    }

    const stripeCardNumberElement = elements.getElement(CardNumberElement);
    const stripeCardExpiryElement = elements.getElement(CardExpiryElement);
    const stripeCardCvcElement = elements.getElement(CardCvcElement);

    if (stripeCardNumberElement) {
      const intent = await getSetupIntent();
      console.log(intent);
      if (intent.error) {
        setLoading(false);
        history.push('/contest');
        updateSnackBarMessage('Please create a contest before adding the card information. Thank you');
        return;
      }

      if (intent.intent_secret) {
        const result = await stripe.confirmCardSetup(intent.intent_secret, {
          payment_method: {
            card: stripeCardNumberElement,
          },
        });
        if (result.error && result.error.message) {
          setLoading(false);
          updateSnackBarMessage(result.error.message);
          return;
        } else {
          setLoading(false);
          updateSnackBarMessage('Successfully added the card');
          stripeCardNumberElement?.clear();
          stripeCardExpiryElement?.clear();
          stripeCardCvcElement?.clear();
        }
      }
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
            {loading ? <CircularProgress /> : `Add Card`}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StripeCard;
