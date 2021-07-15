import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },

  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#ffffff' },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        borderRadius: 0,
        backgroundColor: 'black',
      },
      outlinedSecondary: {
        borderRadius: 0,
      },
      outlinedPrimary: {
        borderRadius: 0,
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
});
