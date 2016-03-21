import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

export function render(component) {
  return TestUtils.renderIntoDocument(component);
}

export function renderDOM(component) {
  return ReactDOM.findDOMNode(render(component));
}

export function getShallowRenderer(component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer;
}

export function shallowRender(component) {
  return getShallowRenderer(component).getRenderOutput();
}

export function createStore(state) {
  let actions = [];

  return {
    dispatch: (action) => actions.push(action),
    getActions: () => actions,
    getState: () => state,
    subscribe: () => null,
  };
}
