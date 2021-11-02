```ts
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

{
    query = useQuery<IListOfRepositoriesQuery>(this, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: this.args.login },
        }
    ]);
}

```