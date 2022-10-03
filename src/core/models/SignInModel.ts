import { safeGetString } from '@core/utils/CommonUtils';

export class SignInModel {
  data: { token: string };

  constructor(data: { token: string }) {
    this.data = data;
  }

  public static instantiate = (json: any) => {
    const token = safeGetString(json, 'token', '');
    return new SignInModel({ token });
  };
}
