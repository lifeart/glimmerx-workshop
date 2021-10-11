import './style.css'
import { renderComponent } from '@glimmer/core';
import App from './App';


document.addEventListener(
  'DOMContentLoaded',
  () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  
    renderComponent(App, {
      element: element,
      owner: {
        services: {

        },
      },
    });
  },
  { once: true }
);