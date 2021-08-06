import { FetchOptions } from '../../interface/FetchOptions';
import { SetupIntent } from '../../interface/Payment';

export default async function getSetupIntent(): Promise<SetupIntent> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payment/get-setup-intent`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
