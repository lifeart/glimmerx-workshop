import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import logo from './assets/glimmer-logo.png';

import HelloWorld from './components/HelloWorld.hbs';
import LazyComponentWrapper from './components/LazyComponent';

const Heading = hbs`<h1>Hello {{@bundlerName}}!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`;
export default class App extends Component {
    @tracked bundlerName = 'vite';
    @tracked Icon = new LazyComponentWrapper(() => import('./components/LazyIcon.hbs'))
    assets = { logo };
    static template = hbs`
        <img width=50 height=50 src={{this.assets.logo}} />
        <input {{on 'input' this.updateValue}} value={{this.bundlerName}} />
        <HelloWorld />
        <Heading @bundlerName={{this.bundlerName}} />
        <DocumentationLink />
        {{#if this.Icon.isLoaded}}
            <this.Icon.Component />
        {{else if this.Icon.isLoading}}
            Loading...
        {{else if this.Icon.isError}}
            Loading error..
        {{/if}}
    `;
    @action updateValue(event: { target: HTMLInputElement }) {
        this.bundlerName = event.target.value;
        if (this.bundlerName === 'icon') {
            this.Icon.loadComponent();
        }
    } 
}
