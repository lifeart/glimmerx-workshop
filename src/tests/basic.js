import { module, test } from 'qunitx';
import { renderComponent } from '@glimmerx/core';

import Icon from './../components/Icon';

async function render(component, args = {}) {
  await renderComponent(component, {
    element: document.getElementById('qunit-fixture'),
    args: args
  })
}

module('Basic sanity check', function (hooks) {
  test('it works', async function (assert) {
    await render(Icon, { bgColor: 'blue '});
    await new Promise((resolve) => setTimeout(resolve, 10000));
    assert.equal(true, true);
  });
});