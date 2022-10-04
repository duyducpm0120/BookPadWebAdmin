/* eslint-disable @typescript-eslint/member-delimiter-style */

export interface Theme {
  palette?: any;
  typography?: any;
  spacing?: any;
  breakpoints?: any;
  zIndex?: any;
  transitions?: any;
  components?: any;
  overrides?: any;
}

export const palette = {
  type: 'light',
  common: {
    black: '#000000',
    white: '#ffffff'
  },
  primary: {
    main: '#67be23',
    light: 'AEDB8E',
    dark: '#509817'
  },
  secondary: {
    main: '#ffffff',
    light: '#ffffff',
    dark: '#ffffff'
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff'
  },
  text: {
    primary: '#626262',
    light: '#9F9F9F',
    dark: '#000000'
  },
  divider: 'rgba(49,44,44,0.12)'
};
const typography = {
  fontFamily: 'Montserrat'
};
const components = {
  MuiButton: {
    styleOverrides: {
      root: { color: 'white', fontSize: 14 }
    }
  }
};

export const appTheme: Theme = {
  palette,
  typography,
  components
};
