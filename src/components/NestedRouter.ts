import Component, { hbs } from '@glimmerx/component';
import { TemplateComponent } from '@glint/environment-glimmerx/component';

// @ts-ignore
const DefaultRoute: TemplateComponent<{Args: { hasChildren: boolean }}> = hbs`
  {{#if @hasChildren}} {{yield}} {{/if}}
`;

export default class NestedRouter extends Component<{stack: { name: string, data: null | unknown }[], components?: Record<string, any>}> {
    get tail() {
      return this.parts.tail;
    }
    get parts() {
      const [ head, ...tail] = this.args.stack;
      return {
        head, tail
      }
    }
    get components() {
      return this.args.components ?? {};
    }
    get Component() {
      return this.model?.component || this.components[this.route] || DefaultRoute;
    }
    get route() {
      return this.parts.head.name;
    }
    get model() {
      return (this.parts.head.data || {}) as Record<string, unknown>;
    }
    static template = hbs`
      {{#if @stack.length}}
        <this.Component @route={{this.route}} @hasChildren={{this.tail.length}} @model={{this.model}} @params={{@params}}>
          <NestedRouter @components={{this.components}} @stack={{this.tail}} @params={{@params}} />
        </this.Component>
      {{/if}}
    `
  }