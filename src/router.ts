import { RouteParams, Router } from '@lifeart/tiny-router';
import { setOwner }  from '@glimmer/owner';

const owner = {};


import { useQuery } from 'glimmer-apollo';
import { IListOfRepositoriesQuery, ListOfRepositoriesQuery } from './components/RepositoriesLoader';
import setupApolloClient from './configs/apollo';



export const router = new Router({
  main: '',
  "users": "/users",
  "users.user": '/users/:login'
});

setOwner(router, owner);

setupApolloClient(router);


router.addResolver('user', async (params: RouteParams) => {
    const result = useQuery<IListOfRepositoriesQuery>(router, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: params.login ?? 'lifeart' }
        }
    ]);  

    await result.promise;
    const data = result.data?.repositoryOwner?.repositories.nodes || [];
    return data;
});


router.addResolver('users', async () => {
  return ["lifeart", "wycatz", "tomdale"];
});

router.addResolver('users.user', async (params: RouteParams) => {
  return router._resolveRoute('user', params, {});
});