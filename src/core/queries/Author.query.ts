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
