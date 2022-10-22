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
export const UPDATE_PUBLISHER = gql`
  mutation editPublisher(
    $PublisherId: Int!
    $PublisherName: String!
    $PublisherDescription: String!
  ) {
    editPublisher(
      PublisherId: $PublisherId
      PublisherName: $PublisherName
      PublisherDescription: $PublisherDescription
    )
    result {
      PublisherName
      PublisherId
      PublisherDescription
    }
  }
`;
