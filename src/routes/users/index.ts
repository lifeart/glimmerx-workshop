import { hbs } from '@glimmerx/component';
import Component from '@glint/environment-glimmerx/component';
import { fn } from '@glimmerx/helper';
import { on, action } from '@glimmerx/modifier';
import { service } from '@glimmerx/service';
import { positionalHelper } from '../../helpers';

import type { State } from '../../services/state';
import type { Router } from '@lifeart/tiny-router';

const activeLinkClass = positionalHelper((isActive) => {
  return isActive ? 'font-bold' : '';
})

export default class UsersRoute extends Component<{
  Args: {
    model: string[],
    hasChildren: boolean
  }
}> {

  @service state!: State;
  @service router!: Router;

  get model() {
    return Array.from(new Set([...this.state.users, ...this.args.model])).map((login) => {
      return {
        login,
        canRemove: !this.args.model.includes(login),
        isActive: this.router.activeRoute?.page.params.login === login
      }
    })
  }

  @action onRemove(login: string) {
    this.state.removeUser(login);
    this.router.open(`/users`);
  }

  static template = hbs`
  <div class="grid grid-cols-4 gap-4">
    <div class="col-span-1">
      <ul>
        {{#each this.model as |user|}}
          <li class="text-left hover:text-black underline bg-blue-100 rounded-md mb-2 mt-2 p-1">
            <a href="/users/{{user.login}}" class={{activeLinkClass user.isActive}}>{{user.login}}</a>
            {{#if user.canRemove}}
              <button class="ml-2 float-right mt-1 font-mono text-sm" type="button" {{on 'click' (fn this.onRemove user.login)}}>[X]</button>
            {{/if}}
          </li>
        {{/each}}
      </ul>
    </div>

    <div class="col-span-3">
      {{#if @hasChildren}}
        {{yield}}
      {{else}}

        <div class="rounded-md bg-blue-50 p-4">
          <div class="flex">
            <div class="ml-3 flex-1 md:flex md:justify-between">
              <p class="text-sm text-blue-700">
                No user selected
              </p>
            </div>
          </div>
        </div>
      {{/if}}
    </div>
  </div>
  `
}