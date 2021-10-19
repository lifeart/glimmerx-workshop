import { RouteParams, Router } from '@lifeart/tiny-router';
import { setOwner }  from '@glimmer/owner';

const owner = {};


import { useQuery } from 'glimmer-apollo';
import { IListOfRepositoriesQuery, ListOfRepositoriesQuery } from './components/RepositoriesLoader';
import setupApolloClient from './configs/apollo';



export const router = new Router({
  main: '',
  user: '/user/:login'
});

setOwner(router, owner);

setupApolloClient(router);


router.addResolver('user', async (params: RouteParams) => {
  const LazyIcon = await (await import('./components/LazyIcon.hbs')).default;
    const result = useQuery<IListOfRepositoriesQuery>(router, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: params.login.split('?')[0] ?? 'lifeart' }
        }
    ]);  

    await result.promise;
    const data = result.data?.repositoryOwner?.repositories.nodes || [];
    return { component: LazyIcon, data };
});
