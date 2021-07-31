import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  loggedIn: boolean;
  style?: React.CSSProperties | undefined;
}

const AvatarDisplay = ({ style }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <CircularProgress />;
  }
  if (loggedInUser.profile === undefined) return <CircularProgress />;

  return <Avatar style={style} alt="Profile Image" src={loggedInUser.profile.profileImage} />;
};

export default AvatarDisplay;
