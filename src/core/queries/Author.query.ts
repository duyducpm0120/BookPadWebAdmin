import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query {
    getAllBookAuthors {
      AuthorId
      AuthorName
      #   Books {
      #     BookName
      #   }
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation createAuthor(
    $AuthorName: String!
    $AuthorDescription: String!
    $AuthorDOB: String!
    $AuthorDOD: String!
  ) {
    createAuthor(
      AuthorName: $AuthorName
      AuthorDescription: $AuthorDescription
      AuthorDOB: $AuthorDOB
      AuthorDOD: $AuthorDOD
    ) {
      AuthorName
      AuthorDescription
      AuthorDOB
      AuthorDOD
    }
  }
`;
