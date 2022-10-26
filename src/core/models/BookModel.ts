import { size } from 'lodash';
import { PublisherModel } from '@core/models';
import { safeGet, safeGetArray, safeGetString } from '@core/utils';
export class BookModel {
  BookId: string;
  BookName: string;
  BookDescription: string;
  PublishedAt: any;
  CreatedAt: string;
  BookCoverImage: string;
  BookPublisher: PublisherModel;
  Languages: any[];

  constructor(
    BookId: string,
    BookName: string,
    BookDescription: string,
    PublishedAt: any,
    CreatedAt: string,
    BookCoverImage: string,
    BookPublisher: PublisherModel,
    Languages: any[]
  ) {
    this.BookId = BookId;
    this.BookName = BookName;
    this.BookDescription = BookDescription;
    this.PublishedAt = PublishedAt;
    this.CreatedAt = CreatedAt;
    this.BookCoverImage = BookCoverImage;
    this.BookPublisher = BookPublisher;
    this.Languages = Languages;
  }

  public static instantiate = (json: any) => {
    const bookId = safeGetString(json, 'BookId', '');
    const bookName = safeGetString(json, 'BookName', '');
    const bookDescription = safeGetString(json, 'BookDescription', '');
    const publishedAt = safeGetString(json, 'PublishedAt', '');
    const createdAt = safeGetString(json, 'CreatedAt', '');
    const bookCoverImage = safeGetString(json, 'BookCoverImage', '');
    const bookPublisher = PublisherModel.instantiate(safeGet(json, 'BookPublisher', {}));
    const languages = safeGet(json, 'Languages', []);
    return new BookModel(
      bookId,
      bookName,
      bookDescription,
      publishedAt,
      createdAt,

      bookCoverImage,
      bookPublisher,
      languages
    );
  };

  public static instantiateList = (json: any) => {
    console.log('json', json);
    if (size(json) === 0) return [];
    const books = safeGetArray(json, 'getAllBooks', []);
    return books.map((book: any) => BookModel.instantiate(book));
  };
}
