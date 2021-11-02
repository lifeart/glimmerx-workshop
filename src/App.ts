import { hbs, tracked } from '@glimmerx/component';
import { service } from '@glimmerx/service';

import { action } from '@glimmerx/modifier';
import logo from "./assets/glimmer-logo.png";

import Component from '@glint/environment-glimmerx/component';
import { on } from '@glint/environment-glimmerx/modifier';
import type { TemplateComponent } from '@glint/environment-glimmerx/component';
import UsersRoute from './routes/users/index';
import UserRoute from './routes/users/user/index.hbs';

import HelloWorld from "./components/HelloWorld.hbs";

import LazyComponentWrapper from "./utils/LazyComponent";
import type IRepositoriesLoader from './components/RepositoriesLoader';
import { Page, Router } from '@lifeart/tiny-router';
import setupApolloClient from './configs/apollo';
import StackedRouter from './components/StackedRouter';

// @ts-ignore
const RepoLink: TemplateComponent<{Element: HTMLAnchorElement, Args: {
  login: string;
  repo: string;
} }> = hbs`<a ...attributes href="https://github.com/{{@login}}/{{@repo}}" target="_blank" rel="noopener noreferrer">{{@repo}}</a>`;


interface ListItemParams {
  Args: {
    name: string;
    login: string;
  }
}

// @ts-ignore
const ListItem: TemplateComponent<ListItemParams> = hbs`
    <div
      class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
      <span class="bg-green-600 h-2 w-2 m-2 rounded-full"></span>
      <RepoLink class="flex-grow font-mono px-2 text-left" @login={{@login}} @repo={{@name}} />
      <div class="text-sm font-normal text-gray-500 tracking-wide">Team</div>
    </div>
`;

// @ts-ignore
const InputForm: TemplateComponent<{
  Args: {
    logo: string;
    updateValue(e: any): void;
  },
  Element: HTMLDivElement
}> = hbs`
    <div class="flex" ...attributes>
          <div>
            <a href="/">
              <img alt="GlimmerX" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={{@logo}} />
            </a>
          </div>
          <div class="flex-grow">
            {{!-- template-lint-disable require-input-label --}}
            <input
              placeholder="specify github username"
              class="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {{on 'change' @updateValue}} />
          </div>
        </div>
`;

export default class App extends Component<{}> {
  constructor(owner: any, args: Record<string, unknown>) {
    // @ts-ignore
    super(owner, args);
    setupApolloClient(this);
    // setTimeout(() => {
    //   this.Repositories.loadComponent();
    // }, 5000);
  }
  get page() {
    return this.router.activeRoute?.page;
  }
  get stack() {
    return this.router.stack.map((e) => {
      if (e.name !== 'users') {
        return e;
      } else {
        return { name: e.name, data: {
          data: Array.from(new Set([...this.contributors, ...e.data])).map((name) => {
            return {
              isActive: name === this.page?.params.login,
              name,
              canRemove: !e.data.includes(name)
            }
          }),
          onRemove: (contributor: string) => {
            this.contributors = this.contributors.filter((el) => el !== contributor);
            this.router.open('/users', true);
          }
        }};
      }
    })
  }
  @service router!: Router;

  @tracked _contributorName = '';

  @tracked contributors: string[] = [];

  @action updateValue(event: Event) {
    const node = (event.target as HTMLInputElement);
    const name = node.value;
    this.contributors = [name, ...this.contributors];
    // clean input
    node.value = '';
  
    if (name === "icon") {
      this.Icon.loadComponent();
    } else if (name === "-icon") {
      this.Icon.unloadComponent();
    } else if (name=== "user") {
      this.UserList.loadComponent();
    } else if (name === "-user") {
      this.UserList.unloadComponent();
    }

    this.router.open(`/users/${name}`);
  }
  Repositories = new LazyComponentWrapper<IRepositoriesLoader>(() => import('./components/RepositoriesLoader'));
  Icon = new LazyComponentWrapper<TemplateComponent>(() => import('./components/LazyIcon.hbs'));
  UserList = new LazyComponentWrapper<TemplateComponent<{ Args: { logo: string; title: string } }>>(() => import('./components/UserList.hbs'));
  assets = { logo };
  components = {
    'users': UsersRoute,
    'users.user': UserRoute
  }
  static template = hbs`
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Hello, Holy!</h1>
        
        <InputForm 
          class="mb-2" 
          @logo={{this.assets.logo}} 
          @updateValue={{this.updateValue}} 
        />
      
        <StackedRouter 
          @components={{this.components}} 
          @stack={{this.stack}} 
          @params={{this.page.params}} />

        {{#if this.Repositories.isLoaded}}
          <this.Repositories.Component @login={{"lifeart"}} as |items|>
            <div class="py-3 text-sm">
              {{#each items as |repo|}}
                <ListItem @login="lifeart" @name={{repo.name}} />
              {{else}}
                No data to show
              {{/each}}
            </div>
          </this.Repositories.Component>
        {{/if}}

        {{#if this.Icon.isLoaded}}
          <this.Icon.Component />
        {{else if this.Icon.isLoading}}
          Loading...
        {{else if this.Icon.isError}}
          Loading error..
        {{/if}}
        {{#if this.UserList.isLoaded}}
          <this.UserList.Component @logo={{this.assets.logo}} @title={{this.contributorName}} />
        {{/if}}
      </div>
    </div>
  </section>

  `;

}
