```ts
import Component, { hbs, tracked } from '@glimmerx/component';

export class Timer extends Component {
    @tracked
    timestamp = Date.now();
    interval = setInterval(()=> this.timestamp = Date.now(), 1000);
    get time() {
        return new Date(this.timestamp).toLocaleTimeString();
    }
    static template = hbs`<div id="timer">{{this.time}}</div>`;
    
    willDestroy() {
        super.willDestroy(...arguments);
        clearInterval(this.interval);
    }
}
```
