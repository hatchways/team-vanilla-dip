import { ChargeCustomer } from '../../interface/Payment';
import { FetchOptions } from '../../interface/FetchOptions';

const chargeCustomer = async (contestID: string): Promise<ChargeCustomer> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/payment/charge/${contestID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default chargeCustomer;
