import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { Contest } from '../interface/Contest';
import { useAuth } from './useAuthContext';
import { fetchAllContestByUserId } from '../helpers/APICalls/searchContest';
interface IContestContext {
  readonly allContestsByUser: Contest[];
}

export const ContestContext = createContext<IContestContext>({
  allContestsByUser: [],
});
export const ContestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  // get all contests and submission by userID
  useEffect(() => {
    if (loggedInUser) {
      const getAllContestByUserId = async () => {
        const contests = await fetchAllContestByUserId({ id: loggedInUser.id });
        setAllContextByUser(contests.contests);
      };
      getAllContestByUserId();
    }
  }, [loggedInUser]);
  const [allContestsByUser, setAllContextByUser] = useState<Contest[]>();
  return (
    <ContestContext.Provider value={{ allContestsByUser: allContestsByUser || [] }}>{children}</ContestContext.Provider>
  );
};
export function useContests(): IContestContext {
  return useContext(ContestContext);
}
