import 'glimmer-apollo/environment-glimmer';

import { renderComponent } from '@glimmerx/core';
import App from './App';
import { router } from './services/router';
import { state } from './services/state';

document.addEventListener(
  'DOMContentLoaded',
  async () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

    await router.mount();
    renderComponent(App, {
      element: element,
      rehydrate: true,
      services: {
        router,
        state
      },
    });
  },
  { once: true }
);