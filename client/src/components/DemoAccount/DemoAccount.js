import React from 'react';
import Button from '@material-ui/core/Button';
import login from '../../helpers/APICalls/login';
import useStyles from '../../pages/Login/LoginForm/useStyles';
import { useSnackBar } from '../../context/useSnackbarContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function DemoAccount() {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const demoAccount = () => {
    login('johndoe@gmail.com', 'password').then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <Button
      onClick={demoAccount}
      type="button"
      size="large"
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {'Demo Account'}
    </Button>
  );
}

export default DemoAccount;
