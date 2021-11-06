import 'glimmer-apollo/dist/cjs/environment-glimmer';
import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';
import App from './App';

import { router } from './services/router';
import { state } from './services/state';


export async function render(url: string) {
    await router.mount(url, true);
    return renderToString(App, {
        rehydrate: true,
        services: {
            router,
            state
        },
    });
}
