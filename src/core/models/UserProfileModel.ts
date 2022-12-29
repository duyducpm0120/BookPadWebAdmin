/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { safeGetNumber, safeGetBoolean, safeGetString } from '@core/utils';

export class UserInfoModel {
  UserId: number;

  IsAdmin: boolean;

  Phone: string;

  Email: string;

  IsActive: boolean;

  IsNotLocked: boolean;

  Gender: string;

  PrimaryLanguageId: number;

  NickName: string;

  ProfilePicUrl: string;

  constructor(
    UserId: number,
    IsAdmin: boolean,
    Phone: string,
    Email: string,
    IsActive: boolean,
    IsNotLocked: boolean,
    Gender: string,
    PrimaryLanguageId: number,
    NickName: string,
    ProfilePicUrl: string
  ) {
    this.UserId = UserId;
    this.IsAdmin = IsAdmin;
    this.Phone = Phone;
    this.Email = Email;
    this.IsActive = IsActive;
    this.IsNotLocked = IsNotLocked;
    this.Gender = Gender;
    this.PrimaryLanguageId = PrimaryLanguageId;
    this.NickName = NickName;
    this.ProfilePicUrl = ProfilePicUrl;
  }

  public static instantiate = (json: any) => {
    const UserId = safeGetNumber(json, 'UserId', 0);
    const IsAdmin = safeGetBoolean(json, 'IsAdmin', false);
    const Phone = safeGetString(json, 'Phone', '');
    const Email = safeGetString(json, 'Email', '');
    const IsActive = safeGetBoolean(json, 'IsActive', false);
    const IsNotLocked = safeGetBoolean(json, 'IsNotLocked', false);
    const Gender = safeGetString(json, 'Gender', '');
    const PrimaryLanguageId = safeGetNumber(json, 'PrimaryLanguageId', 0);
    const NickName = safeGetString(json, 'NickName', '');
    const ProfilePicUrl = safeGetString(json, 'ProfilePicUrl', '');

    return new UserInfoModel(
      UserId,
      IsAdmin,
      Phone,
      Email,
      IsActive,
      IsNotLocked,
      Gender,
      PrimaryLanguageId,
      NickName,
      ProfilePicUrl
    );
  };

  public static instantiateList = (json: any[]) => {
    console.log('json ', json);
    const list: UserInfoModel[] = [];
    if (json && json.length > 0) {
      json.forEach((item: any) => {
        list.push(UserInfoModel.instantiate(item));
      });
    }
    return list;
  };
}
