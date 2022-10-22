import { useMutation, useQuery } from '@apollo/client';
import { PublisherModel } from '@core/models';
import { CREATE_PUBLISHER, GET_ALL_PUBLISHER, UPDATE_PUBLISHER } from '@core/queries';

export const GetAllPublisher = () => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_PUBLISHER);
  const publisherData = PublisherModel.instantiateList(data);
  return { data: publisherData, error, loading, refetch };
};

export const UpdatePublisher = () => {
  const [updatePublisherFunc, { data, error, loading }] = useMutation(UPDATE_PUBLISHER);
  const publisherData = PublisherModel.instantiate(data);
  return { data: publisherData, error, loading, updatePublisherFunc };
};

export const CreatePublisher = () => {
  const [createPublisherFunc, { data, error, loading }] = useMutation(CREATE_PUBLISHER);
  const publisherData = PublisherModel.instantiate(data);
  return { data: publisherData, error, loading, createPublisherFunc };
};
