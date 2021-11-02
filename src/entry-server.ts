import 'glimmer-apollo/dist/cjs/environment-glimmer';
import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';
import App from './App';

import { router } from './router';
import { createSearchParams } from './utils/search-params';

const app = hbs``;

export async function render(url: string) {
    createSearchParams(url);
    await router.mount(url, true);
    return renderToString(app, {
        rehydrate: true,
        services: {
            router
        },
    });
}
