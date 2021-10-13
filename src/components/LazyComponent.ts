import { tracked  } from "@glimmerx/component";


export default class LazyComponentWrapper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private fn: () => Promise<any>) {
    }
    @tracked isLoading = false;
    @tracked isError = false;
    @tracked isLoaded = false;
    @tracked Component: string | null = null;
    async loadComponent() {
        try {
            this.isLoading = true;
            const result = await this.fn();
            this.Component = result.default;
            this.isLoaded = true;
            this.isLoading = false;
        } catch(e) {
            this.isLoading = false;
            this.isError = true;
        }
    }
}