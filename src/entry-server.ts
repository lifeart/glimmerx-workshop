import { renderToString } from '@glimmerx/ssr';
import App from './App';

export function render() {
    return renderToString(App, {
        rehydrate: true,
    });
}

