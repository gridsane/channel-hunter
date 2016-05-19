import React from 'react';
import ListItem from '../../../src/components/ui/list/list-item';
import TestUtils from 'react-addons-test-utils';
import styles from '../../../src/components/ui/list/list.scss';
import {findWithClass} from 'react-shallow-testutils';
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

  it('has different paddings with both texts', () => {
    const primaryTextDom = renderDOM(
      <ListItem primaryText="foo" />
    );

    const bothTextsDom = renderDOM(
      <ListItem primaryText="foo" secondaryText="bar" />
    );

    expect(primaryTextDom.style.getPropertyValue('padding'))
      .toNotBe(bothTextsDom.style.getPropertyValue('padding'));
  });

  it('adds left element', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left">bar</span>}
        leftElementHeight={38} />
    );

    const leftElement = findWithClass(tree, 'left');
    expect(leftElement.props.style.top).toBe('9px');
    expect(leftElement.props.children).toBe('bar');
  });

  it('merges with left element style', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left" style={{color: 'red'}} />} />
    );

    const leftElement = findWithClass(tree, 'left');
    expect(leftElement.props.style.top).toBe('8px');
    expect(leftElement.props.style.color).toBe('red');
  });

  it('adds right element', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        rightElement={<span className="right">bar</span>}
        rightElementHeight={38} />
    );

    const rightElement = findWithClass(tree, 'right');
    expect(rightElement.props.style.top).toBe('9px');
    expect(rightElement.props.children).toBe('bar');
  });

  it('merges with right element style', () => {
    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        rightElement={<span className="right" style={{color: 'red'}} />} />
    );

    const rightElement = findWithClass(tree, 'right');
    expect(rightElement.props.style.top).toBe('8px');
    expect(rightElement.props.style.color).toBe('red');
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

  it('has interactive className, if onClick prop is not empty', () => {
    const dom = renderDOM(
      <ListItem primaryText="foo" onClick={() => null} />
    );

    expect(dom.getAttribute('class')).toContain(styles.itemInteractive);
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
