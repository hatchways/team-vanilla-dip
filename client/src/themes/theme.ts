import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
    h1: {
      fontSize: 28,
      fontWeight: 700,
    },
    h3: {
      fontSize: 16,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
      opacity: 0.6,
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
