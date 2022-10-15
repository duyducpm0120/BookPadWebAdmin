import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { TEXT_COLOR } from './colors';

export const BookPadPages: BookPadPageType = [
  {
    name: 'Information',
    icon: <InfoOutlinedIcon sx={{ width: 24, height: 24, color: TEXT_COLOR.primary }} />,
    pages: ['Authors', 'Books', 'Publishers']
  },
  {
    name: 'Books',
    pages: [],
    icon: <LibraryBooksOutlinedIcon sx={{ width: 24, height: 24, color: TEXT_COLOR.primary }} />
  }
];

export type BookPadPageType = BookPadPageItemType[];
export interface BookPadPageItemType {
  name: string;
  pages: string[];
  icon: JSX.Element;
}
