import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';
import * as React from 'react';

interface Props {
  loggedIn: boolean;
  user: User;
  style?: React.CSSProperties | undefined;
}

const AvatarDisplay = ({ user, style }: Props): JSX.Element => {
  return <Avatar style={style} alt="Profile Image" src={`https://robohash.org/${user.email}.png`} />;
};

export default AvatarDisplay;
git 