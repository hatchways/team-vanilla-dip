import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Contest } from '../interface/Contest';
import { useAuth } from './useAuthContext';
import { fetchAllContestByUserId } from '../helpers/APICalls/searchContest';
interface IContestContext {
  readonly allContests: Contest[];
}

export const ContestContext = createContext<IContestContext>({
  allContests: [],
});
export const ContestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  // get all contests and submission by userID
  useEffect(() => {
    if (loggedInUser) {
      const getAllContestByUserId = async () => {
        const contests = await fetchAllContestByUserId({ id: loggedInUser.id });
        setAllContests(contests.contests);
      };
      getAllContestByUserId();
    }
  }, [loggedInUser, location]);
  const [allContests, setAllContests] = useState<Contest[]>();
  return <ContestContext.Provider value={{ allContests: allContests || [] }}>{children}</ContestContext.Provider>;
};
export function useContests(): IContestContext {
  return useContext(ContestContext);
}
