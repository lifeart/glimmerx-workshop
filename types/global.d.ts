
declare module '*.hbs' {
    // function template(arguments?: Record<string, unknown>) : string | null;
    function templateWrapper() : string | null;
    const template: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // type Template = any;
    export default template;
}