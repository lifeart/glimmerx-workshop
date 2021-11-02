import Component, { hbs } from '@glimmerx/component';


export default class Icon extends Component {
    static template = hbs`<div style="width:100px;height:200px;background-color: {{@bgColor}};">I am Icon</div>`
}