import { StripeCustomer } from '../../interface/Payment';
import { FetchOptions } from '../../interface/FetchOptions';

const stripeCustomer = async (): Promise<StripeCustomer> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
    credentials: 'include',
  };
  return await fetch(`/payment/customer`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default stripeCustomer;
