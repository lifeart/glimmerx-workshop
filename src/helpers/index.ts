import { helper as glimmerHelper } from "@glimmerx/helper";

type simpleHelper = (...positional: any[]) => any;

export function positionalHelper(fn: simpleHelper): simpleHelper {
    return glimmerHelper(function(positional: any[]) {
        return fn.apply(null, positional);
    })
}

export function hashHelper(fn: simpleHelper): simpleHelper {
    return glimmerHelper(function(_: any[], hash: any[]) {
        return fn.apply(null, [Object.assign({}, hash)]);
    })
}

export const sum = positionalHelper((a: number, b: number) => a + b);
export const inc = positionalHelper((a: number, b: number) => a + (b || 1));
export const eq = positionalHelper((a: number, b: number) => a === b);
export const gt = positionalHelper((a: number, b: number) => a > b);
export const gte = positionalHelper((a: number, b: number) => a >= b);
export const arr = positionalHelper((...items) => Array.from(items));
export const hash = hashHelper((obj) => obj);
