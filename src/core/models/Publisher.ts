import { defaultTo, size } from 'lodash';
import { safeGetString } from '@core/utils/CommonUtils';

export class PublisherModel {
  PublisherId: string;
  PublisherName: string;

  constructor(PublisherId: string, PublisherName: string) {
    this.PublisherId = PublisherId;
    this.PublisherName = PublisherName;
  }

  public static instantiate = (json: any) => {
    const PublisherId = safeGetString(json, 'PublisherId', '');
    const PublisherName = safeGetString(json, 'PublisherName', '');

    return new PublisherModel(PublisherId, PublisherName);
  };

  public static instantiateList = (data: any) => {
    const newData = defaultTo(data?.getAllPublishers, []);
    if (size(newData) === 0) return [];
    const list: PublisherModel[] = [];
    newData.forEach((item: any) => {
      list.push(PublisherModel.instantiate(item));
    });
    return list;
  };
}
