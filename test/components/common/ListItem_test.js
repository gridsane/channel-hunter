import React from 'react';
import ListItem from '../../../src/components/common/ListItem';
import Icon from '../../../src/components/common/Icon';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import {renderDOM, shallowRender} from '../../utils';

describe('ListItem component', () => {

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

  it('adds right icon', () => {

    const tree = shallowRender(
      <ListItem primaryText="foo" rightIcon="bar" />
    );

    const icon = ShallowTestUtils.findWithType(tree, Icon);
    expect(icon.props.children).toBe('bar');

  });

  it('adds left element', () => {

    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left">bar</span>}
        leftElementHeight={40} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).toBe('8px');
    expect(leftElement.props.children).toBe('bar');

  });

  it('merges with left element style', () => {

    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left" style={{color: 'red'}} />} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).toBe('8px');
    expect(leftElement.props.style.color).toBe('red');

  });

  it('handles click', (done) => {

    const dom = renderDOM(
      <ListItem
        primaryText="foo"
        onClick={callback} />
    );

    function callback() {
      done();
    }

    TestUtils.Simulate.click(dom);

  });

  it('changes background when mouseEnter, if onClick is provided', () => {

    const dom = renderDOM(
      <ListItem primaryText="foo" onClick={() => null} />
    );

    const leaveColor = dom.style.getPropertyValue('background-color');

    TestUtils.Simulate.mouseEnter(dom);
    expect(dom.style.getPropertyValue('background-color')).toNotBe(leaveColor);

    TestUtils.Simulate.mouseLeave(dom);
    expect(dom.style.getPropertyValue('background-color')).toBe(leaveColor);

  });

  it('not changes background on mouseEnter, if onClick is not provided', () => {
    const dom = renderDOM(
      <ListItem primaryText="foo" />
    );

    const leaveColor = dom.style.getPropertyValue('background-color');

    TestUtils.Simulate.mouseEnter(dom);
    expect(dom.style.getPropertyValue('background-color')).toBe(leaveColor);
  });

});
