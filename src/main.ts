import 'glimmer-apollo/environment-glimmer'; // <---- Add this import

import { renderComponent } from '@glimmerx/core';
import App from './App';

const element  = document.getElementById('app') as HTMLDivElement;

import { router } from './router';
import { state } from './state';

router.mount().then(() => {
    renderComponent(App, {
        element,
        rehydrate: true,
        services: { router, state }
    });
})
