import { size } from 'lodash';
import { PublisherModel } from '@core/models';
import { safeGet, safeGetArray, safeGetString } from '@core/utils';
import type { Book } from 'epubjs';

export interface BookAuthor {
  AuthorId: string;
  AuthorName: string;
  AuthorDescription: string;
}
export class BookModel {
  BookId: string;
  BookName: string;
  BookDescription: string;
  PublishedAt: string;
  CreatedAt: string;
  BookCoverImage: string;
  BookPublisher: PublisherModel;
  Languages: any[];
  Authors: BookAuthor[];

  constructor(
    BookId: string,
    BookName: string,
    BookDescription: string,
    PublishedAt: string,
    CreatedAt: string,
    BookCoverImage: string,
    BookPublisher: PublisherModel,
    Languages: any[],
    Authors: BookAuthor[]
  ) {
    this.BookId = BookId;
    this.BookName = BookName;
    this.BookDescription = BookDescription;
    this.PublishedAt = PublishedAt;
    this.CreatedAt = CreatedAt;
    this.BookCoverImage = BookCoverImage;
    this.BookPublisher = BookPublisher;
    this.Languages = Languages;
    this.Authors = Authors;
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
    const authors = safeGetArray(json, 'Authors', []);
    // console.log('authors', authors);
    return new BookModel(
      bookId,
      bookName,
      bookDescription,
      publishedAt,
      createdAt,
      bookCoverImage,
      bookPublisher,
      languages,
      authors
    );
  };

  public static instantiateList = (json: any) => {
    if (size(json) === 0) return [];
    const books = safeGetArray(json, 'getAllBooks', []);
    return books.map((book: any) => BookModel.instantiate(book));
  };

  public static getMetadata = async (book: Book) => {
    const metadata = await book.loaded.metadata;
    return metadata;
  };

  public static getCoverUrl = async (book: Book) => {
    const coverUrl = await book.coverUrl();
    return coverUrl;
  };

  public static instantiateFromBook = async (book: Book) => {
    const metadata = await this.getMetadata(book);
    const coverUrl = await this.getCoverUrl(book);
    // setCoverUrl(isNil(coverUrl) ? '' : coverUrl);
    const bookId = '';
    const bookName = metadata.title;
    const bookDescription = metadata.description;
    const publishedAt = metadata.pubdate;
    const createdAt = new Date(new Date(metadata.pubdate).getDate()).toString();
    const bookCoverImage = coverUrl ?? '';
    const bookPublisher = PublisherModel.instantiate({
      PublisherName: metadata.publisher
    });
    const languages = [metadata.language];
    const authors = [
      {
        AuthorId: '',
        AuthorName: metadata.creator,
        AuthorDescription: ''
      }
    ];
    return new BookModel(
      bookId,
      bookName,
      bookDescription,
      publishedAt,
      createdAt,
      bookCoverImage,
      bookPublisher,
      languages,
      authors
    );
  };
}
