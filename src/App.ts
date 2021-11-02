import { hbs, tracked } from '@glimmerx/component';
import { service } from '@glimmerx/service';
import { action } from '@glimmerx/modifier';
import Component from '@glint/environment-glimmerx/component';

import { on } from '@glint/environment-glimmerx/modifier';
import type { TemplateComponent } from '@glint/environment-glimmerx/component';

import type { Router } from '@lifeart/tiny-router';

import UsersRoute from './routes/users/index';
import UserRoute from './routes/users/user/index.hbs';
import LazyComponentWrapper from "./utils/LazyComponent";
import StackedRouter from './components/StackedRouter';
import logo from "./assets/glimmer-logo.png";


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
  Icon = new LazyComponentWrapper<TemplateComponent>(() => import('./components/LazyIcon.hbs'));
  assets = { logo };
  components = {
    'users': UsersRoute,
    'users.user': UserRoute
  }

  @service router!: Router;
  @tracked contributors: string[] = [];

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


  @action updateValue(event: Event) {
    const node = (event.target as HTMLInputElement);
    const name = node.value;
    this.contributors = [name, ...this.contributors];
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


        {{#if this.Icon.isLoaded}}
          <this.Icon.Component />
        {{else if this.Icon.isLoading}}
          Loading...
        {{else if this.Icon.isError}}
          Loading error..
        {{/if}}
      </div>
    </div>
  </section>

  `;

}
