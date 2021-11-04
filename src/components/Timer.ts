import Component, { hbs, tracked } from '@glimmerx/component';

export default class Timer extends Component {
    @tracked
    timestamp = Date.now();
    interval = setInterval(()=> this.timestamp = Date.now(), 1000);
    get time() {
        return new Date(this.timestamp).toLocaleTimeString();
    }
    static template = hbs`<div id="timer">{{this.time}}</div>`;
    
    willDestroy() {
        // @ts-ignore
        super.willDestroy(...arguments);
        clearInterval(this.interval);
    }
}