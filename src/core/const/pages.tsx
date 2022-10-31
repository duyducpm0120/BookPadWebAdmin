import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { TEXT_COLOR } from './colors';

const ICON_STYLE = {
  width: 24,
  height: 24,
  color: TEXT_COLOR.primary
};

export const DEFAULT_PAGE_NAME = 'Books';

export const BookPadPages: BookPadPageType = [
  {
    name: 'Books',
    pages: [],
    icon: <LibraryBooksOutlinedIcon sx={ICON_STYLE} />
  },
  {
    name: 'Information',
    icon: <InfoOutlinedIcon sx={ICON_STYLE} />,
    pages: ['Authors', 'Books', 'Publishers']
  },
  {
    name: 'Users',
    pages: [],
    icon: <PeopleAltOutlinedIcon sx={ICON_STYLE} />
  },
  {
    name: 'Recommendation',
    pages: [],
    icon: <FavoriteBorderOutlinedIcon sx={ICON_STYLE} />
  },
  {
    name: 'Analytics',
    pages: [],
    icon: <AnalyticsOutlinedIcon sx={ICON_STYLE} />
  },
  {
    name: 'Rating',
    pages: [],
    icon: <StarBorderOutlinedIcon sx={ICON_STYLE} />
  }
];

export type BookPadPageType = BookPadPageItemType[];
export interface BookPadPageItemType {
  name: string;
  pages: string[];
  icon: JSX.Element;
}
