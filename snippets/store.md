```ts
import { tracked } from "@glimmerx/component";
import { action } from '@glimmerx/modifier';


export class Store {
    @tracked users: string[] = [];
    
    @action add(login: string) {
        this.users = Array.from(new Set([login, ...this.users]));
    }

    @action remove(login: string) {
        this.users = this.users.filter((e) => e !== login);
    }
}


export const store = new Store();
```