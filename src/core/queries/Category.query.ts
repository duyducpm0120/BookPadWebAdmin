import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query {
    getAllBookCategories {
      CategoryName
      CategoryDescription
      CategoryId
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($CategoryName: String!, $CategoryDescription: String!) {
    createCategory(CategoryName: $CategoryName, CategoryDescription: $CategoryDescription) {
      CategoryName
      CategoryDescription
      CategoryId
    }
  }
`;
