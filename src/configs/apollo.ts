/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'cross-fetch';
import { setClient } from 'glimmer-apollo';
import { setOwner, getOwner }  from '@glimmer/owner';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client/core';

const defaultOwner = {};


export default function setupApolloClient(context: object): void {

  if (!getOwner(context)) {
    setOwner(context, defaultOwner);
  }

  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer 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'
    },
    fetch
  });

  // Cache implementation
  const cache = new InMemoryCache();

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  // Set default apollo client for Glimmer Apollo
  setClient(context as any, apolloClient, 'default');
}