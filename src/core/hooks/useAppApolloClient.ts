import { HttpLink, ApolloLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { isNil } from 'lodash';
import { useAuthToken } from './useAuthToken';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (!isNil(authToken)) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`
        }
      });
    }
    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const { authToken } = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache
  });
};
