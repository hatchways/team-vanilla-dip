import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ContestPage from './pages/SubmissionPage/SubmissionPage';
import Submit from './pages/SubmitPage/Submit';
import Contest from './pages/Contest/Contest';
import Messages from './pages/Messages/Messages';
import PersonalInformation from './pages/PersonalInformation/PersonalInformation';
import Notification from './pages/Notifications/Notification';
import PaymentDetail from './pages/PaymentDetail/PaymentDetail';
import { MessagesProvider } from './context/useMessagingContext';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import './App.css';
import { ContestProvider } from './context/useContestContext';
import Discover from './pages/Discover/Discover';
import { NotificationProvider } from './context/useNotificationContext';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <ContestProvider>
                <MessagesProvider>
                  <NotificationProvider>
                    <Switch>
                      <Route exact path="/discover" component={Discover} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <ProtectedRoute exact path="/messages">
                        <Messages />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/payment-details">
                        <PaymentDetail />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/contest">
                        <Contest />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/dashboard">
                        <Dashboard />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/profile">
                        <Profile />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/personal-info">
                        <PersonalInformation />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/notifications">
                        <Notification />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/contest/:id">
                        <ContestPage />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/contest/:id/submit">
                        <Submit />
                      </ProtectedRoute>
                      <ProtectedRoute path="*" exact>
                        <Redirect to="/discover" />
                      </ProtectedRoute>
                    </Switch>
                  </NotificationProvider>
                </MessagesProvider>
              </ContestProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
