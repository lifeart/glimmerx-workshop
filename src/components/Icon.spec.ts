import { tracked  } from '@glimmerx/component';
import { getStyle, renderSSR, rerender, render } from '../test-helpers';
import Icon from './../components/Icon';

describe('Icon', () => {
  
    it('works in SSR', async () => {
      const str = await renderSSR(Icon, { bgColor: 'red'});
      expect(str).toContain('red');
    });

    it('works in browser', async () => {
        class Args {
            @tracked bgColor = 'red';
        }
        const args = new Args();
        //@ts-ignore
        const node = await render(Icon, args);

        expect(getStyle(node.firstChild, 'background-color')).toBe('red');

        args.bgColor = 'blue';

        await rerender();

        expect(getStyle(node.firstChild, 'background-color')).toBe('blue');
    });
});