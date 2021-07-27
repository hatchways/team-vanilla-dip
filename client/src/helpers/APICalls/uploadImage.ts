import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  image: File;
}
interface awsResult {
  success?: string;
  error?: string;
}

export async function uploadImage({ image }: Props): Promise<awsResult> {
  const formData = new FormData();

  formData.append('image', image);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: formData,
  };
  return await fetch(`/aws/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
