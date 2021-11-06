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
            console.info('unable to rehydrate app');
            await render(false);
        }

    },
    { once: true }
);