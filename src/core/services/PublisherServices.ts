import { PublisherModel } from './../models/Publisher';
import { useQuery } from '@apollo/client';
import { GET_ALL_PUBLISHER } from '@core/queries';

export const getAllPublisher = () => {
  const { data, error, loading } = useQuery(GET_ALL_PUBLISHER);
  const publisherData = PublisherModel.instantiateList(data);
  return { data: publisherData, error, loading };
};
