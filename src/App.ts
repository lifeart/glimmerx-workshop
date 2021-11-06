import Component, { hbs, tracked } from '@glimmerx/component';
import { fn } from '@glimmerx/helper';
import { on, action } from '@glimmerx/modifier';
import { service } from '@glimmerx/service';
import { Router } from '@lifeart/tiny-router';
import fetch from 'cross-fetch';

import NestedRouter from './components/NestedRouter';
import UsersRoute from './routes/users';
import UserRoute from './routes/users/user/index.hbs';
import { State } from './state';

const Input = hbs`
    <input {{on "change" @onChange}} placeholder="specify github username"
        class="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
`;


export default class App extends Component {

    components = {
        'users': UsersRoute,
        'users.user': UserRoute
    }

    @service router!: Router;
    @service state!: State;

    @action onLoginInput(e: any) {
        this.state.addUser(e.target.value);
        this.router.open('/users/' + e.target.value);
        e.target.value = '';
    }

    static template = hbs`
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">

                    {{#if this.isMainPage}}
                        Hello, user, visit:

                        <a href="/users">users page</a>
                    {{/if}}

                    <Input @onChange={{this.onLoginInput}} />

                   <NestedRouter @stack={{this.router.stack}} @components={{this.components}} />

                   
                </div>
            </div>
        </section>
    `

}
