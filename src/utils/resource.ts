import { DEBUG } from '@glimmer/env';

import { invokeHelper } from '@glimmer/runtime';

import {
  getValue,
} from '@glimmer/validator';


export function useUnproxiedResource(destroyable: object, definition: object, args?: () => TArgs): { value: T } {
  let resource: Cache<T>;

  return {
    get value(): T {
      if (!resource) {
        resource = invokeHelper(
          destroyable,
          definition, // eslint-disable-line
          () => {
            return args?.() || {};
          }
        );
      }

      return getValue<T>(resource)!; // eslint-disable-line
    }
  };
}
