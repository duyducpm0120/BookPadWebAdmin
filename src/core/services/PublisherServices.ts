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
  const updatePublisher = async (
    publisherId: number,
    publisherName: string,
    publisherDescription: string
  ) => {
    await updatePublisherFunc({
      variables: {
        PublisherId: publisherId,
        PublisherName: publisherName,
        PublisherDescription: publisherDescription
      }
    });
  };
  const publisherData = PublisherModel.instantiate(data);
  return { data: publisherData, error, loading, updatePublisher };
};

export const CreatePublisher = () => {
  const [createPublisherFunc, { data, error, loading }] = useMutation(CREATE_PUBLISHER);
  const createNewPublisher = async (publisherName: string, publisherDescription: string) => {
    await createPublisherFunc({
      variables: {
        PublisherName: publisherName,
        PublisherDescription: publisherDescription
      }
    });
  };
  const publisherData = PublisherModel.instantiate(data);
  return { data: publisherData, error, loading, createNewPublisher };
};
