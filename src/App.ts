import { hbs, tracked } from '@glimmerx/component';
import { service } from '@glimmerx/service';
import { action } from '@glimmerx/modifier';

import Component, { TemplateComponent } from '@glint/environment-glimmerx/component';

// routes
import UsersRoute from './routes/users/index';
import UserRoute from './routes/users/user/index.hbs';

// utils
import LazyComponentWrapper from "./utils/LazyComponent";

// components
import NestedRouter from './components/NestedRouter';
import AppContainer from './components/AppContainer';
import InputForm from './components/InputForm';

// assets
import logo from "./assets/glimmer-logo.png";

// DI types
import type { State } from './services/state';
import type { Router } from '@lifeart/tiny-router';

const Heading: any = hbs`
    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{@title}}</h1>
`;

export default class App extends Component<{}> {
    title = 'Hello, Holy!';
    assets = { logo };
    components = {
        'users': UsersRoute,
        'users.user': UserRoute
    }
    Icon = new LazyComponentWrapper<TemplateComponent>(() => import('./components/LazyIcon.hbs'));

    @service router!: Router;
    @service state!: State;

    @action updateValue(event: Event) {
        const node = (event.target as HTMLInputElement);
        const name = node.value;
        this.state.addUser(name);
        // clean input
        node.value = '';

        // easter egg
        if (name === "icon") {
            this.Icon.loadComponent();
        } else if (name === "-icon") {
            this.Icon.unloadComponent();
        }

        this.router.open(`/users/${name}`);
    }
    static template = hbs`
        <AppContainer>
            <Heading 
                @title={{this.title}} 
            />

            <InputForm 
                class="mb-2" 
                @logo={{this.assets.logo}} 
                @updateValue={{this.updateValue}} 
            />

            <NestedRouter 
                @components={{this.components}} 
                @stack={{this.router.stack}}
            />

            {{#if this.Icon.isLoaded}}
                <this.Icon.Component />
            {{else if this.Icon.isLoading}}
                Loading...
            {{else if this.Icon.isError}}
                Loading error..
            {{/if}}
        </AppContainer>
  `;

}
