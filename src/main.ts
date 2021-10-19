import 'glimmer-apollo/environment-glimmer';

import { renderComponent } from '@glimmerx/core';
import App from './App';
import { router } from './router';
// import setupApolloClient from './configs/apollo';

// setupApolloClient(undefined);
// 
document.addEventListener(
  'DOMContentLoaded',
  async () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  
    await router.mount();
    renderComponent(App, {
      element: element,
      rehydrate: true,
      services: {
        router
      },
    });
  },
  { once: true }
);