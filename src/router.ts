import { RouteParams, Router } from '@lifeart/tiny-router';

// import { useQuery } from 'glimmer-apollo';
// import { IListOfRepositoriesQuery, ListOfRepositoriesQuery } from './components/RepositoriesLoader';

export const router = new Router({
  main: '',
  second: '/second'
});


router.addResolver('second', async (params: RouteParams) => {
  const LazyIcon = await (await import('./components/LazyIcon.hbs')).default;

    // const result = useQuery<IListOfRepositoriesQuery>(undefined, () => [
    //     ListOfRepositoriesQuery,
    //     {
    //         variables: { login: params.login ?? 'lifeart' },
    //         onComplete: (): void => {
    //             // on complete
    //         }
    //     }
    // ]);  

    // await result.promise;
    // console.log(result);
    return { component: LazyIcon };
});
