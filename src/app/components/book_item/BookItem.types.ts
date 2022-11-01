import type { BookModel } from '@core/models/BookModel';

export interface BookItemProps {
  bookData: BookModel;
  onClick?: () => void;
}
