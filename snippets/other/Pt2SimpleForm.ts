import Component, { hbs, tracked } from "@glimmerx/component";
import { on, action } from '@glimmerx/modifier';
import { fn } from '@glimmerx/helper';

export default class Simple extends Component {
    @tracked logins: string[] = [];
    @action
    onChange(e: InputEvent & { target: HTMLInputElement }) {
        this.logins = [...this.logins, e.target.value];
        e.target.value = '';
    }
    @action
    removeItem(ind: number) {
        this.logins = this.logins.filter((_, i) => i !== ind);
    }
    static template = hbs`
        <input class="border-2" value={{this.login}}
            {{on "change" this.onChange}}
        >
        {{#each this.logins as |login index|}}
                <h1>you entered: {{login}}</h1>
                <button {{on 'click' (fn this.removeItem index)}} type="button">[X]</button>
        {{/each}}
    `;
}