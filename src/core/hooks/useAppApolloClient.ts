/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpLink, ApolloLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { isNil } from 'lodash';
import { useAuthToken } from './useAuthToken';

const DEBUG = true;

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch: async (...pl) => {
    if (!DEBUG) return await fetch(...pl);
    const [_, options]: any[] = pl;
    const body: any = JSON.parse(options.body);
    console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables);
    return await fetch(...pl);
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
    link: authMiddleware(authToken).concat(httpLink),
    cache
  });
};
