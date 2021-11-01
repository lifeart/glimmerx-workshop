import 'glimmer-apollo/dist/cjs/environment-glimmer';
import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';
// import App from './App';
// import setupApolloClient from './configs/apollo';
import { router } from './router';
import { createSearchParams } from './utils/search-params';
// setupApolloClient(undefined);

const app = hbs``;

export async function render(url: string) {
    createSearchParams(url.split('?')[1] || '');
    await router.mount(url, true);
    return renderToString(app, {
        rehydrate: true,
        services: {
            router
        },
    });
}
