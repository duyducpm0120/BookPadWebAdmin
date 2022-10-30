import { safeGetArray, safeGetString } from '@core';
import { size } from 'lodash';
export class AuthorModel {
  AuthorId: string;
  AuthorName: string;

  constructor(AuthorId: string, AuthorName: string) {
    this.AuthorId = AuthorId;
    this.AuthorName = AuthorName;
  }

  public static instantiate = (json: any) => {
    const AuthorId = safeGetString(json, 'AuthorId', '');
    const AuthorName = safeGetString(json, 'AuthorName', '');
    return new AuthorModel(AuthorId, AuthorName);
  };

  public static instantiateArray = (json: any) => {
    if (size(json) === 0) return [];
    const books = safeGetArray(json, 'getAllBookAuthors', []);
    return books.map((author: any) => AuthorModel.instantiate(author));
  };
}
