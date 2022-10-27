import { safeGetString } from '@core/utils/CommonUtils';
import { safeGet } from '@core/utils';

export class SignInModel {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  public static instantiate = (json: any) => {
    // console.log('json', json);
    const data = safeGet(json, 'data', { token: '' });
    const token = safeGetString(data, 'token', '');
    return new SignInModel(token);
  };
}
