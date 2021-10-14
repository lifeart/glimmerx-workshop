/* eslint-disable @typescript-eslint/no-explicit-any */
import { setClient } from 'glimmer-apollo';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client/core';

import Component, { hbs } from '@glimmerx/component';

export class GlimmerApolloProvider extends Component {
  constructor(owner: any, args: Record<string, unknown>) {
    super(owner, args);
    setupApolloClient(this);
  }

  static template = hbs`
    {{#if @Component}}
      <@Component />
    {{/if}}
    {{yield}}
  `;
}

export default function setupApolloClient(context: unknown): void {
  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'Bearer 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'
    }
  });

  // Cache implementation
  const cache = new InMemoryCache();

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache
  });

  // Set default apollo client for Glimmer Apollo
  setClient(context as any, apolloClient);
}