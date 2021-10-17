import { renderComponent } from '@glimmer/core';
import App from './App';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  
    renderComponent(App, {
      element: element,
      rehydrate: true,
      owner: {
        services: {

        },
      },
    });
  },
  { once: true }
);