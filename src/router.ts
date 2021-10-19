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
    console.log(params, params.login);
    const result = useQuery<IListOfRepositoriesQuery>(router, () => [
        ListOfRepositoriesQuery,
        {
            variables: { login: params.login ?? 'lifeart' },
            onComplete: (): void => {
                // on complete
            }
        }
    ]);  

    await result.promise;
    console.log(result.data);
    return { component: LazyIcon };
});
