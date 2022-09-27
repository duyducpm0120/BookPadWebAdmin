/* eslint-disable @typescript-eslint/member-delimiter-style */

export interface Theme {
  palette?: any;
  typography?: any;
  spacing?: any;
  breakpoints?: any;
  zIndex?: any;
  transitions?: any;
  components?: any;
}

const palette = {
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
    main: '#fff',
    light: '#fff',
    dark: '#fff'
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff'
  },
  text: {
    primary: '#626262',
    light: '#ffffff',
    dark: '#000000'
  },
  divider: 'rgba(49,44,44,0.12)'
};

export const appTheme: Theme = {
  palette
};
