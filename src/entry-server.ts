import 'glimmer-apollo/dist/cjs/environment-glimmer'; // <---- Add this impor
import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';

import App from './App';
import { router } from './router';
import { state } from './state';

const app = hbs``;

export async function render(url: string) {
    await router.mount(url, true);
    return renderToString(App, {
        rehydrate: true,
        services: {
            router,
            state
        }
    });
}
