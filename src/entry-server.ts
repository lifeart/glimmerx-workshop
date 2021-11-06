import 'glimmer-apollo/dist/cjs/environment-glimmer'; // <---- Add this import

import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';
import { state } from './state';

import App from './App';



import { router } from './router';


const app = hbs``;

export async function render(url: string) {
    await router.mount(url, true);
    return renderToString(App, {
        rehydrate: true,
        services: { router, state }
    });
}
