import { tracked  } from "@glimmerx/component";
export default class LazyComponentWrapper<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private fn: () => Promise<any>) {
    }
    @tracked isLoading = false;
    @tracked isError = false;
    @tracked isLoaded = false;
    @tracked Component!: T;
    _isLoaded = false;
    _isLoading = false;
    unloadComponent() {
        this.isLoaded = false;
        this._isLoaded = false;
    }
    preload() {
        this.loadComponent();
        return this;
    }
    async loadComponent() {
        if (this._isLoaded) {
            return;
        }
        if (this._isLoading) {
            return;
        }
        try {
            this.isError = false;
            this.isLoading = true;
            this._isLoading = true;

            const result = await this.fn();
            this.Component = result.default;
            this.isLoaded = true;
            this.isLoading = false;
            this._isLoaded = true;
        } catch(e) {

            this.isError = true;
            console.error(e);
        } finally {
            this.isLoading = false;
            this._isLoading = false;
        }
    }
}