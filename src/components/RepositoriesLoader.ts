
import { hbs, tracked } from '@glimmerx/component';
import { useQuery, gql } from 'glimmer-apollo';
import Component from '@glint/environment-glimmerx/component';
import setupApolloClient from '../configs/apollo';


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

export interface IRepositoriesLoader {
    Args: {
        login: string
    },
    Element: HTMLButtonElement;
    Yields: {
        default: [RepoNode[]]
    }
}

export default class RepositoriesLoader extends Component<IRepositoriesLoader> {
    constructor() {
        // @ts-ignore
        super(...arguments);
        setupApolloClient(this);
    }

    query = useQuery<IListOfRepositoriesQuery>(this, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: this.args.login },
        }
    ]);

    get repos() {
        return this.query.data?.repositoryOwner.repositories.nodes ?? [];
    }

    static template = hbs`
        <button ...attributes type="button"></button>
        {{yield this.repos}}
    `

}