import { hbs } from '@glimmerx/component';
import Component from '@glint/environment-glimmerx/component';
import { fn } from '@glimmerx/helper';
import { on } from '@glimmerx/modifier';

export default class UsersRoute extends Component<{
  Args: {
    model: {
      data: {name: string, canRemove: boolean, isActive: boolean}[],
      onRemove(e: any): void;
    },
    hasChildren: boolean
  }
}> {


  static template = hbs`
  <div class="grid grid-cols-4 gap-4">
    <div class="col-span-1">
      <ul>
        {{#each @model.data as |user|}}
          <li class="text-left hover:text-black underline bg-blue-100 rounded-md mb-2 mt-2 p-1">
            <a href="/users/{{user.name}}" class={{if user.isActive "font-bold"}}>{{user.name}}</a>
            {{#if user.canRemove}}
              <button class="ml-2 float-right mt-1 font-mono text-sm" type="button" {{on 'click' (fn @model.onRemove user.name)}}>[X]</button>
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