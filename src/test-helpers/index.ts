import { renderToString } from '@glimmerx/ssr';
import { renderComponent } from '@glimmerx/core';
import { tracked  } from '@glimmerx/component';
import Icon from './../components/Icon';

// @ts-ignore
function castArgsToPrimitive(args) {
    let keys = Object.keys(args);
    if (keys.length === 0) {
        // @ts-ignore
        try {
            keys = Object.getOwnPropertyNames(args['__proto__']).filter((e) => e !== 'constructor');
        } catch(e) {
            // NOOP
        }
    }
    let argsWrapper = {};
    keys.forEach((key) => {
        Object.defineProperty(argsWrapper, key, {
            get() {
                // @ts-ignore
                return args[key];
            },
            enumerable: true
        })
    });
    return argsWrapper;
}

// @ts-ignore
export async function renderSSR(component, args = {}) {
    let argsWrapper = castArgsToPrimitive(args);
    let txt = await renderToString(component, {
        args: argsWrapper
    });
    return txt;
}

// @ts-ignore
export async function render(component, args = {}) {
    const node = document.createElement('div');
    let argsWrapper = castArgsToPrimitive(args);
    await renderComponent(component, {
        element: node, 
        args: argsWrapper
    });
    return node;
}

//@ts-ignore
export function getStyle(node, name = '') {
   return node.style.getPropertyValue(name);
}

export async function rerender() {
    await new Promise((resolve) => setTimeout(resolve, 20));
}