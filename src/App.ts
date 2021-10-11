import Component, { hbs } from '@glimmerx/component';

import HelloWorld from './components/HelloWorld.hbs';

const Heading = hbs`<h1>Hello Vite!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`;

export default class App extends Component {
    static components = { HelloWorld, Heading, DocumentationLink };
    static template = hbs`
        <HelloWorld />
        <Heading />
        <DocumentationLink />
   ` 
}
