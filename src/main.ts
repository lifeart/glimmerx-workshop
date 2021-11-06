import 'glimmer-apollo/environment-glimmer';

import { renderComponent } from '@glimmerx/core';
import App from './App';
import { router } from './services/router';
import { state } from './services/state';

function render(rehydrate = false) {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

    return renderComponent(App, {
        element: element,
        rehydrate,
        services: {
            router,
            state
        },
    });
}

document.addEventListener(
    'DOMContentLoaded',
    async () => {

        await router.mount();

        try {
            await render(true);
        } catch (e) {
            console.info('Unable to rehydrate app, ensure you have SSR option "reghydrate = true" and SSR server is running');
            await render(false);
        }

    },
    { once: true }
);