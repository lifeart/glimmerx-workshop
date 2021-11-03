```ts
import { renderComponent } from '@glimmerx/core';

document.addEventListener(
  'DOMContentLoaded',
  async () => {
    const element: HTMLDivElement = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

    renderComponent(App, {
      element: element,
    });
  },
  { once: true }
);
```