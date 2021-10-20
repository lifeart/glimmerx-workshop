import { hbs, tracked } from '@glimmerx/component';
import { service } from '@glimmerx/service';

import { action } from '@glimmerx/modifier';
import logo from "./assets/glimmer-logo.png";

import Component from '@glint/environment-glimmerx/component';
import { on } from '@glint/environment-glimmerx/modifier';
import type { TemplateComponent } from '@glint/environment-glimmerx/component';


import HelloWorld from "./components/HelloWorld.hbs";

import LazyComponentWrapper from "./utils/LazyComponent";
import { getSearchValue, setSearchValue } from "./utils/search-params";
import type IRepositoriesLoader from './components/RepositoriesLoader';
import { Page, Router } from '@lifeart/tiny-router';
import setupApolloClient from './configs/apollo';
import StackedRouter from './components/StackedRouter';

// @ts-ignore
const Heading: TemplateComponent<{ Args: { contributorName: string } }> = hbs`<h1>Hello {{@contributorName}}!</h1>`;

// @ts-ignore
const RepoLink: TemplateComponent<{}> = hbs`<a ...attributes href="https://github.com/{{@login}}/{{@repo}}" target="_blank" rel="noopener noreferrer">{{@repo}}</a>`;


interface ListItemParams {
  Args: {
    name: string
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

export default class App extends Component<{}> {
  constructor(owner: any, args: Record<string, unknown>) {
    // @ts-ignore
    super(owner, args);
    this.router.addHandler((page, model, stack) => {
      console.log(page, model, stack);
      this.page = page;
      this.model = model;
      this.stack = stack;
    });
    setupApolloClient(this);
    // setTimeout(() => {
    //   this.Repositories.loadComponent();
    // }, 5000);
  }
  @tracked page!: Page;
  @tracked model!: any;
  @tracked stack!: any;
  @service router!: Router;

  get RouteComponent() {
    return this?.model?.component ?? HelloWorld;
  }

  @tracked _contributorName = getSearchValue('contributor','vite');

  get contributorName() {
    return this._contributorName as string;
  }
  set contributorName(value: string) {
    setSearchValue('contributor', value);
    this._contributorName = value;
  }
  Repositories = new LazyComponentWrapper<IRepositoriesLoader>(() => import('./components/RepositoriesLoader'));
  Icon = new LazyComponentWrapper<TemplateComponent>(() => import('./components/LazyIcon.hbs'));
  UserList = new LazyComponentWrapper<TemplateComponent<{ Args: { logo: string; title: string } }>>(() => import('./components/UserList.hbs'));
  assets = { logo };
  static template = hbs`
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Hello, Holy!</h1>
        <StackedRouter @stack={{this.stack}} @params={{this.page.params}} />
        <div class="flex">
          <div>
            {{!-- template-lint-disable require-valid-alt-text --}}
            <img class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={{this.assets.logo}} />
          </div>
          <div class="flex-grow">
            {{!-- template-lint-disable require-input-label --}}
            <input
              class="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {{on 'input' this.updateValue}} value={{this.contributorName}} />
          </div>
        </div>
        <Heading @contributorName={{this.contributorName}} />
        [
          <a href="/users/{{this.contributorName}}">second</a> |
          <a href="/">main</a>
        ]
        <this.RouteComponent @model={{this.model}} />

        {{#if this.Repositories.isLoaded}}
          <this.Repositories.Component @login={{this.contributorName}} as |items|>
            <div class="py-3 text-sm">
              {{#each items as |repo|}}
                <ListItem @login={{this.contributorName}} @name={{repo.name}} />
              {{else}}
                No data to show
              {{/each}}
            </div>
          </this.Repositories.Component>
        {{else}}
            <div class="py-3 text-sm">
              {{#each this.model.data as |repo|}}
                <ListItem @login={{this.contributorName}} @name={{repo.name}} />
              {{/each}}
            </div>
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
  @action updateValue(event: Event) {
    this.contributorName = (event.target as HTMLInputElement).value;
    if (this.contributorName === "icon") {
      this.Icon.loadComponent();
    } else if (this.contributorName === "-icon") {
      this.Icon.unloadComponent();
    } else if (this.contributorName === "user") {
      this.UserList.loadComponent();
    } else if (this.contributorName === "-user") {
      this.UserList.unloadComponent();
    }
  }
}
