import { safeGetArray, safeGetString } from '@core';
import { size } from 'lodash';
export class AuthorModel {
  AuthorId: string;
  AuthorName: string;
  AuthorDOB: string;
  AuthorDOD: string;
  AuthorDescription: string;

  constructor(
    AuthorId: string,
    AuthorName: string,
    AuthorDOB: string,
    AuthorDOD: string,
    AuthorDescription: string
  ) {
    this.AuthorId = AuthorId;
    this.AuthorName = AuthorName;
    this.AuthorDOB = AuthorDOB;
    this.AuthorDOD = AuthorDOD;
    this.AuthorDescription = AuthorDescription;
  }

  public static instantiate = (json: any) => {
    const AuthorId = safeGetString(json, 'AuthorId', '');
    const AuthorName = safeGetString(json, 'AuthorName', '');
    const AuthorDOB = safeGetString(json, 'AuthorDOB', '');
    const AuthorDOD = safeGetString(json, 'AuthorDOD', '');
    const AuthorDescription = safeGetString(json, 'AuthorDescription', '');
    return new AuthorModel(AuthorId, AuthorName, AuthorDOB, AuthorDOD, AuthorDescription);
  };

  public static instantiateArray = (json: any) => {
    if (size(json) === 0) return [];
    const books = safeGetArray(json, 'getAllBookAuthors', []);
    return books.map((author: any) => AuthorModel.instantiate(author));
  };
}
