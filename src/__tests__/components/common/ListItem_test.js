const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

jest.dontMock('../../../components/common/ListItem');
const ListItem = require('../../../components/common/ListItem');

describe('ListItem', () => {

  it('renders primaryText only', () => {

    const dom = renderDOM(
      <ListItem primaryText="foo" />
    );

    expect(dom.textContent).toBe('foo');

  });

  it('renders primaryText with secondaryText', () => {

    const dom = renderDOM(
      <ListItem primaryText="foo" secondaryText="bar" />
    );

    expect(dom.textContent).toBe('foobar');

  });

  it('can render component as primaryText or secondaryText', () => {

    const dom = renderDOM(
      <ListItem primaryText={<span>foo</span>} secondaryText={<span>bar</span>} />
    );

    expect(dom.textContent).toBe('foobar');

  });

  it('has different height with both texts', () => {

    const primaryTextDom = renderDOM(
      <ListItem primaryText="foo" />
    );

    const bothTextsDom = renderDOM(
      <ListItem primaryText="foo" secondaryText="bar" />
    );

    expect(primaryTextDom.style.getPropertyValue('height'))
      .toNotBe(bothTextsDom.style.getPropertyValue('height'));

  });

  it('adds right icon', () => {});
  it('can add component instead of right icon', () => {});

  it('adds left avatar', () => {});
  it('can add component instead of left avatar', () => {});


});

function renderDOM(component) {
  return ReactDOM.findDOMNode(TestUtils.renderIntoDocument(component));
}
