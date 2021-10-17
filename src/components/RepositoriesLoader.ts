
import { hbs, tracked } from '@glimmerx/component';
import { useQuery, gql } from 'glimmer-apollo';
import Component from '@glint/environment-glimmerx/component';


export type RepoNode = {
    description: string;
    id: string;
    name: string;
};

type IListOfRepositoriesQuery = {
    repositoryOwner: {
        login: string;
        repositories: {
            nodes: RepoNode[]
        }
    }
};


const ListOfRepositoriesQuery = gql`
    query ListOfRepositories($login: String!) {
        repositoryOwner(login: $login) {
            login
            repositories(last: 20) {
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
    Yields: {
        default: [RepoNode[]]
    }
}

export default class RepositoriesLoader extends Component<IRepositoriesLoader> {
    query = useQuery<IListOfRepositoriesQuery>(this, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: this.args.login },
            onComplete: (): void => {
                // on complete
            }
        }
    ]);

    get repos() {
        return this.query.data?.repositoryOwner.repositories.nodes ?? [];
    }

    static template = hbs`
        {{yield this.repos}}
    `

}