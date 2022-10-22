import { enStrings } from './en';
import { viStrings } from './vi';
import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
  en: enStrings,
  vi: viStrings
});
