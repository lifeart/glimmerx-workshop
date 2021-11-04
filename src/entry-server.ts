import { renderToString } from '@glimmerx/ssr';
import { hbs } from '@glimmerx/component';

const app = hbs``;

export async function render(url: string) {
    return renderToString(app);
}
