import { hbs } from '@glimmerx/component';

const Profile = hbs`
    <div class="max-w-xs rounded border-2 overflow-hidden shadow-lg my-2">
        <div class="px-6 py-4">
            <h2 class="font-bold text-xl mb-2">
                {{#if (has-block "header")}}
                    {{yield to="header"}}
                {{else}}
                    {{#if @header}}
                     {{@header}}
                    {{else}}
                        [default header placeholder]
                    {{/if}}
                {{/if}}
            </h2>
            <p class="text-grey-darker text-base">
                {{yield 123 456}}
            </p>
        </div>
    </div>
`;

const Header = hbs`<pre>I'm a {{@name}} text</pre>`;

export default hbs`
    <div class="m-6">
        <Profile>
            <:default as |foo boo|>
                {{foo}} / {{boo}}
            </:default>
        </Profile>
    </div>
`