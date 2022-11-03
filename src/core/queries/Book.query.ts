import { gql } from '@apollo/client';

export const GET_ALL_BOOK = gql`
  query {
    getAllBooks {
      BookId
      BookName
      BookDescription
      PublishedAt
      CreatedAt
      BookCoverImage
      BookPublisher {
        PublisherId
        PublisherName
        PublisherDescription
      }
      Languages {
        LanguageId
      }
      Authors {
        AuthorId
        AuthorName
        AuthorDescription
      }
    }
  }
`;
export const EDIT_BOOK = gql`
  mutation editBook(
    $BookDescription: String!
    $BookId: Int!
    $BookName: String!
    $PublishedAt: String
  ) {
    editBook(
      BookName: $BookName
      BookDescription: $BookDescription
      BookId: $BookId
      PublishedAt: $PublishedAt
    ) {
      BookName
    }
  }
`;
