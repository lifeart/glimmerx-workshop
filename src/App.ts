import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import { useQuery, gql } from 'glimmer-apollo';
import logo from "./assets/glimmer-logo.png";

import HelloWorld from "./components/HelloWorld.hbs";

import LazyComponentWrapper from "./components/LazyComponent";
import { getSearchValues, setSearchValue } from "./utils/search-params";

const Heading = hbs`<h1>Hello {{@bundlerName}}!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">Documentation</a>`;


const ListItem = hbs`
    <div
      class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
      <span class="bg-green-600 h-2 w-2 m-2 rounded-full"></span>
      <div class="flex-grow font-mono px-2 text-left">{{@name}}</div>
      <div class="text-sm font-normal text-gray-500 tracking-wide">Team</div>
    </div>
`;


export default class App extends Component {
  @tracked _bundlerName = getSearchValues().bundler ?? 'vite';
  @tracked repos = [];
  @tracked selectedNote: any;

  notes = useQuery(this, () => [
    gql`
            query ListOfRepositories($login: String!) {
                repositoryOwner(login: $login) {
                    login
                    repositories(last: 20) {
                    nodes {
                        description
                        id
                        name
                    }
                    }
                }
            }
        `,
    {
      variables: { login: this.bundlerName },
      onComplete: (): void => {
        this.selectedNote = undefined;
      }
    }
  ]);

  get bundlerName() {
    return this._bundlerName;
  }
  set bundlerName(value) {
    setSearchValue('bundler', value);
    this._bundlerName = value;
  }
  @tracked Icon = new LazyComponentWrapper(() => import('./components/LazyIcon.hbs'));
  @tracked UserList = new LazyComponentWrapper(() => import('./components/UserList.hbs'));
  assets = { logo };
  static template = hbs`
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Hello, Holy!</h1>
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
              {{on 'input' this.updateValue}} value={{this.bundlerName}} />
          </div>
        </div>
        <HelloWorld />
        <Heading @bundlerName={{this.bundlerName}} />
        <DocumentationLink />
        {{#if this.notes.loading}}
          Loading notes
        {{else}}
          <div class="py-3 text-sm">
            {{#each this.notes.data.repositoryOwner.repositories.nodes as |repo|}}
              <ListItem @name={{repo.name}} />
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
          <this.UserList.Component @logo={{this.assets.logo}} @title={{this.bundlerName}} />
        {{/if}}
      </div>
    </div>
  </section>

    `;
  @action updateValue(event: { target: HTMLInputElement }) {
    this.bundlerName = event.target.value;
    if (this.bundlerName === "icon") {
      this.Icon.loadComponent();
    } else if (this.bundlerName === "-icon") {
      this.Icon.unloadComponent();
    } else if (this.bundlerName === "user") {
      this.UserList.loadComponent();
    } else if (this.bundlerName === "-user") {
      this.UserList.unloadComponent();
    }
  }
}
