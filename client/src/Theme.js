import { createTheme } from '@mui/material/styles';
import '@fontsource/montserrat';

const default_theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7855fb', // Purple
    },
    background: {
      default: '#1a1a1a', // Black background
      paper: '#040404',   // Dark gray for components
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b3b3b3', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

const brainrot_theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7855fb', // Purple
    },
    background: {
      default: '#1a1a1a', // Black background
      paper: '#040404',   // Dark gray for components
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b3b3b3', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  },
});

const themes = {
  "default" : default_theme,
  "brainrot" : brainrot_theme
}

export default themes;
