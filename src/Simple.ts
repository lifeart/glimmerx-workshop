import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
import { fn } from '@glimmerx/helper';

export default class App extends Component {

    @tracked
    logins: string[] = [];

    @action
    onInput(event: InputEvent  & { target: HTMLInputElement}) {
        // this.logins.push(event.target.value);
        this.logins = [...this.logins, event.target.value];

        event.target.value = '';
        event.target.focus();
    }

    @action
    removeLogin(index: number) {
        this.logins = this.logins.filter((_, i) => i !== index);
    }

    static template = hbs`
        <input type="text" class="border-2" value={{this.login}} 
            {{on 'change' this.onInput}}
        >
        <br>

        {{#each this.logins as |login index|}} 
            <h2>
                <span>You entered: <b>{{login}}</b> </span>
                <button type="button" {{on 'click' (fn this.removeLogin index)}}>[x]</button>
            </h2>
        {{/each}}
    `;
}