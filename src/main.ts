import './style.css'
import 'glimmer-apollo/environment-glimmer';
import { renderComponent } from '@glimmer/core';
import { hbs } from '@glimmerx/component';
import App from './App';
import { GlimmerApolloProvider } from './configs/apollo';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  
    renderComponent(hbs`
      <GlimmerApolloProvider>
        <App />
      </GlimmerApolloProvider>
    `, {
      element: element,
      owner: {
        services: {

        },
      },
    });
  },
  { once: true }
);