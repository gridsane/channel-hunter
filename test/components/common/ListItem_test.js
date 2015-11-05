import React from 'react';
import ListItem from '../../../src/components/common/ListItem';
import Icon from '../../../src/components/common/Icon';
import TestUtils from 'react-addons-test-utils';
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
        leftElement={<span className="left">bar</span>}
        leftElementHeight={40} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).to.be('8px');
    expect(leftElement.props.children).to.be('bar');

  });

  it('merges with left element style', () => {

    const tree = shallowRender(
      <ListItem
        primaryText="foo"
        leftElement={<span className="left" style={{color: 'red'}} />} />
    );

    const leftElement = ShallowTestUtils.findWithClass(tree, 'left');
    expect(leftElement.props.style.top).to.be('8px');
    expect(leftElement.props.style.color).to.be('red');

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
    expect(dom.style.getPropertyValue('background-color')).to.not.be(leaveColor);

    TestUtils.Simulate.mouseLeave(dom);
    expect(dom.style.getPropertyValue('background-color')).to.be(leaveColor);

  });

  it('not changes background on mouseEnter, if onClick is not provided', () => {
    const dom = renderDOM(
      <ListItem primaryText="foo" />
    );

    const leaveColor = dom.style.getPropertyValue('background-color');

    TestUtils.Simulate.mouseEnter(dom);
    expect(dom.style.getPropertyValue('background-color')).to.be(leaveColor);
  });

});
