/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpLink, ApolloLink, InMemoryCache, ApolloClient, from } from '@apollo/client';
import { isNil } from 'lodash';
import { useAuthToken } from './useAuthToken';
import { onError } from '@apollo/client/link/error';

const DEBUG = true;

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch: async (...pl) => {
    if (!DEBUG) return await fetch(...pl);
    const [_, options]: any[] = pl;
    const body: any = JSON.parse(options.body);
    console.log(
      `📡 REQUEST LOG \n OPERATION_NAME: ${body.operationName || ''}\n QUERY: ${body.query}`,
      `VARIABLES: ${JSON.stringify(body.variables)}`
    );
    return await fetch(...pl);
  }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `%c[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          'color: red'
        )
      );
    }

    if (networkError) {
      {
        console.log(`%c[Network error]: ${networkError}`, 'color: red');
      }
    }
  }
});
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
    link: from([errorLink, authMiddleware(authToken).concat(httpLink)]),
    cache
  });
};
