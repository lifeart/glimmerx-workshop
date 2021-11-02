
declare module '*.hbs' {
    // function template(arguments?: Record<string, unknown>) : string | null;
    function templateWrapper() : string | null;
    const glimmerTpl: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // type Template = any;
    export default glimmerTpl;
}