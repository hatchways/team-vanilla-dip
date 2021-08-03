import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { Contest } from '../interface/Contest';
import { useAuth } from './useAuthContext';
import { fetchAllContestByUserId, fetchAllContests } from '../helpers/APICalls/searchContest';
interface IContestContext {
  allContestsByUser: Contest[] | [];
  allContests: Contest[] | [];
}

export const ContestContext = createContext<IContestContext>({
  allContestsByUser: [],
  allContests: [],
});
export const ContestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [allContestsByUser, setAllContestsByUser] = useState<Contest[] | []>([]);
  const [allContests, setAllContests] = useState<Contest[] | []>([]);
  const { loggedInUser } = useAuth();
  // get all contests and submission by userID
  useEffect(() => {
    if (loggedInUser) {
      const getAllContestByUserId = async () => {
        const contests = await fetchAllContestByUserId({ id: loggedInUser.id });
        if (contests.contests && contests.contests.length > 0) {
          setAllContestsByUser(contests.contests);
        } else {
          setAllContestsByUser([]);
        }
      };
      getAllContestByUserId();
    }
  }, [loggedInUser]);

  useEffect(() => {
    const getAllContests = async () => {
      const contests = await fetchAllContests();
      setAllContests(contests?.contests || []);
    };
    getAllContests();
  }, []);
  return <ContestContext.Provider value={{ allContestsByUser, allContests }}>{children}</ContestContext.Provider>;
};
export function useContests(): IContestContext {
  return useContext(ContestContext);
}
