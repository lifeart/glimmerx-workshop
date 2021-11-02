import { RouteParams, Router } from '@lifeart/tiny-router';
import { useQuery } from 'glimmer-apollo';
import { IListOfRepositoriesQuery, ListOfRepositoriesQuery } from './components/RepositoriesLoader';
import setupApolloClient from './configs/apollo';
import { tracked } from '@glimmerx/component';

class GlimmerRouter extends Router {
  @tracked stack = [];
  @tracked prevRoute = null;
  @tracked activeRoute = null;
}


export const router = new GlimmerRouter({
  main: '',
  "users": "/users",
  "users.user": '/users/:login'
});

setupApolloClient(router);


router.addResolver('users.user', async (params: RouteParams) => {
    const result = useQuery<IListOfRepositoriesQuery>(router, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: params.login  }
        }
    ]);  

    await result.promise;
    const data = result.data?.repositoryOwner?.repositories.nodes || [];
    return data.map(e => {
      return {...e, ...{ login: params.login }}
    })
});


router.addResolver('users', async (params) => {
  const defaultLogins = ["lifeart", "wycats", "tomdale"];
  if (params.login && !defaultLogins.includes(params.login)) {
    return Array.from(new Set([params.login, ...defaultLogins]));
  }
  return defaultLogins;
});
