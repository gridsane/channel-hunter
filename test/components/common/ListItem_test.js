import React from 'react';
import ListItem from '../../../src/components/common/ListItem';
import Icon from '../../../src/components/common/Icon';
import ShallowTestUtils from 'react-shallow-testutils';
import {renderDOM, shallowRender} from '../../utils';

describe('ListItem', () => {

  it('renders primaryText only', () => {

    const dom = renderDOM(
      <ListItem primaryText="foo" />
    );

    expect(dom.textContent).to.be('foo');

  });

  it('renders primaryText with secondaryText', () => {

    const dom = renderDOM(
      <ListItem primaryText="foo" secondaryText="bar" />
    );

    expect(dom.textContent).to.be('foobar');

  });

  it('can render component as primaryText or secondaryText', () => {

    const dom = renderDOM(
      <ListItem primaryText={<span>foo</span>} secondaryText={<span>bar</span>} />
    );

    expect(dom.textContent).to.be('foobar');

  });

  it('has different height with both texts', () => {

    const primaryTextDom = renderDOM(
      <ListItem primaryText="foo" />
    );

    const bothTextsDom = renderDOM(
      <ListItem primaryText="foo" secondaryText="bar" />
    );

    expect(primaryTextDom.style.getPropertyValue('height'))
      .to.not.be(bothTextsDom.style.getPropertyValue('height'));

  });

  it('adds right icon', () => {
    const tree = shallowRender(
      <ListItem primaryText="foo" rightIcon="bar" />
    );

    const icon = ShallowTestUtils.findWithType(tree, Icon);
    expect(icon.props.children).to.be('bar');
  });

  it('adds left element', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left" />}
        leftElementHeight={40} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).to.be('8px');
  });

  it('saves left element style', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left" style={{top: '16px'}} />} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).to.be('16px');
  });
});
