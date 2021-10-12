import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import logo from './assets/glimmer-logo.png';

import HelloWorld from './components/HelloWorld.hbs';

const Heading = hbs`<h1>Hello {{@bundlerName}}!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`;
export default class App extends Component {
    @tracked bundlerName = 'vite';
    assets = { logo };
    static template = hbs`
        <img width=50 height=50 src={{this.assets.logo}} />
        <input {{on 'input' this.updateValue}} value={{this.bundlerName}} />
        <HelloWorld />
        <Heading @bundlerName={{this.bundlerName}} />
        <DocumentationLink />
    `;
    @action updateValue(event: { target: HTMLInputElement }) {
        this.bundlerName = event.target.value;
    } 
}
