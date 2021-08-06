import { Contest } from '../../interface/Contest';
import { User } from '../../interface/User';

export default interface SubmissionCardProps {
  imageSrc: string;
  author: User;
  contest: Contest;
}
