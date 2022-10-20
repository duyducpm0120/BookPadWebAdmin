import { gql } from '@apollo/client';

export const GET_ALL_PUBLISHER = gql`
  query {
    getAllPublishers {
      PublisherName
      PublisherId
      PublisherDescription
    }
  }
`;
