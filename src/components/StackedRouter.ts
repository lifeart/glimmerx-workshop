import Component, { hbs } from '@glimmerx/component';

const DefaultRoute = hbs`
  {{#if @hasChildren}} {{yield}} {{/if}}
`;

export default class StackedRouter extends Component<{stack: { name: string, data: null | unknown }[], components?: Record<string, any>}> {
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
          <StackedRouter @components={{this.components}} @stack={{this.tail}} @params={{@params}} />
        </this.Component>
      {{/if}}
    `
  }