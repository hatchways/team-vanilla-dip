import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
  exact: boolean;
  path: string;
};

const ProtectedRoute = ({ children, ...rest }: ProtectedRouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          loggedInUser ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
        }
      />
    </>
  );
};

export default ProtectedRoute;
