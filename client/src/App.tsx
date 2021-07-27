import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Contest from './pages/Contest/Contest';
import Messages from './pages/Messages/Messages';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';
import { ContestProvider } from './context/useContestContext';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <ContestProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <ProtectedRoute exact path="/messages">
                    <Messages />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/contest">
                    <Contest />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/dashboard">
                    <Dashboard />
                  </ProtectedRoute>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </ContestProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
