import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
  },
  shape: {
    borderRadius: 5,
  },
});
