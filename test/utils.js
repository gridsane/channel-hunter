import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

export function renderDOM(component) {
  return ReactDOM.findDOMNode(
    TestUtils.renderIntoDocument(component)
  );
}

export function shallowRender(component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();
}
