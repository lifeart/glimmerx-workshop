import { tracked } from "@glimmerx/component";
import { action } from '@glimmerx/modifier';


export class State {
    @tracked users: string[] = [];
    
    @action addUser(login: string) {
        this.users = Array.from(new Set([login, ...this.users]));
    }

    @action removeUser(login: string) {
        this.users = this.users.filter((e) => e !== login);
    }
}


export const state = new State();