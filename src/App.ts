import Component, { hbs } from '@glimmerx/component';

const Heading = hbs`<h1>Hello Vite!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`;

export default class App extends Component {
    
    static template = hbs`
        <Heading />
        <DocumentationLink />
   `
}