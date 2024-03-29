import { ChangeEvent, useState, useEffect, SyntheticEvent, Dispatch, SetStateAction, useCallback } from 'react';
import useStyles from './useStyles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { User } from '../../interface/User';
import { useDebounce } from 'use-debounce';
import { searchUsers } from '../../helpers/APICalls/searchUsers';

interface Props {
  search: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
  options: User[] | [];
  setOptions: Dispatch<SetStateAction<User[] | []>>;
}
const Search = ({ search, handleChange, options, setOptions }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // limit our call to the api with a debounced value at max of 1 per 0.5 seconds
  const [debouncedSearch] = useDebounce(search, 500);

  const classes = useStyles();

  const saveOptions = useCallback(
    (users: User[]) => {
      setOptions(users);
    },
    [setOptions],
  );

  useEffect(() => {
    let active = true;
    if (debouncedSearch) {
      async function searchAndSaveUsers() {
        // send request to backend API to get users limited to 20.
        setLoading(true);
        const response = await searchUsers({
          search: debouncedSearch,
        });

        if (active && response && response.users) {
          saveOptions(response.users);
        }
        setLoading(false);
      }

      searchAndSaveUsers();
    }

    return () => {
      active = false;
    };
  }, [debouncedSearch, saveOptions]);

  // creates a combobox search which is dynamically updated with call's to the API
  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        id="asynchronous-search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.username === value.username}
        getOptionLabel={(option) => option.username}
        options={options}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInputChange={handleChange}
        inputValue={search}
        noOptionsText="No Users Found"
        freeSolo
        renderInput={(params) => (
          <div className={classes.search}>
            <InputBase
              {...params.inputProps}
              placeholder="Search Users"
              classes={{
                root: classes.searchRoot,
                input: classes.searchInput,
              }}
              inputProps={{
                'aria-label': 'search',
                ref: params.InputProps.ref,
              }}
              startAdornment={
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              }
            />
          </div>
        )}
      />
    </form>
  );
};

export default Search;
