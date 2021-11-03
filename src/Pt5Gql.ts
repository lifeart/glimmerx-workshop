import { gql } from 'glimmer-apollo';
import { useQuery } from 'glimmer-apollo';
import fetch from 'cross-fetch';

import { on, action } from '@glimmerx/modifier';
import Component, { hbs, tracked } from '@glimmerx/component';


import { setClient } from 'glimmer-apollo';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client/core';

function setupApolloClient(context: object): void {
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
        cache
    });

    // Set default apollo client for Glimmer Apollo
    setClient(context, apolloClient);
}

export type RepoNode = {
    description: string;
    id: string;
    login?: string;
    name: string;
};

export type IListOfRepositoriesQuery = {
    repositoryOwner: {
        login: string;
        repositories: {
            nodes: RepoNode[]
        }
    }
};


export const ListOfRepositoriesQuery = gql`
    query ListOfRepositories($login: String!) {
        repositoryOwner(login: $login) {
            login
            repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
            nodes {
                description
                id
                name
            }
            }
        }
    }
`;


export default class QueryComponent extends Component {
    _ = setupApolloClient(this);

    @tracked login = 'lifeart';

    @action setLogin(e: any) {
        this.login = e.target.value;
        e.target.value = '';
    }


    notes = useQuery<IListOfRepositoriesQuery, any>(this, () => [
        ListOfRepositoriesQuery,
        {
            variables: {
                login: this.login
            }
        }
    ]);


    get repos() {
        return this.notes.data?.repositoryOwner.repositories.nodes ?? [];
    }

    static template = hbs`
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <input {{on 'change' this.setLogin}}
                class="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {{this.login}} have {{this.repos.length}} repos.
            {{#each this.repos as |repo|}}
                {{repo.name}}<br>
            {{/each}}
        </div>
    </section>
    `;
}