import { UPDATE_PUBLISHER } from './../queries/Publisher.query';
import { PublisherModel } from './../models/Publisher';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_PUBLISHER } from '@core/queries';

export const GetAllPublisher = () => {
  const { data, error, loading } = useQuery(GET_ALL_PUBLISHER);
  const publisherData = PublisherModel.instantiateList(data);
  return { data: publisherData, error, loading };
};

export const UpdatePublisher = () => {
  const [updatePublisherFunc, { data, error, loading }] = useMutation(UPDATE_PUBLISHER);
  const publisherData = PublisherModel.instantiate(data);
  return { data: publisherData, error, loading, updatePublisherFunc };
};
