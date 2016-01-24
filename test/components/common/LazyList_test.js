import React from 'react';
import LazyList from '../../../src/components/common/LazyList';
import {renderDOM} from '../../utils';

describe('LazyList component', () => {

  const defaultProps = {
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    itemHeight: 10,
    renderItem: ((x, i) => <span key={i}>{x}</span>),
    itemsBuffer: 0,
    updateDelay: 0,
  };

  it('renders only visible items', () => {

    const windowStub = getWindowStub({
      scrollY: 0,
      innerHeight: 20,
    });

    const props = {
      ...defaultProps,
      container: windowStub,
    };

    const dom = renderDOM(<LazyList {...props} />);

    expect(dom.children.length).toBe(2);
    expect(dom.textContent).toBe('12');

  });

  it('renders buffered items', () => {

    const windowStub = getWindowStub({
      scrollY: 40,
      innerHeight: 20,
    });

    const props = {
      ...defaultProps,
      container: windowStub,
      itemsBuffer: 2,
    };

    const dom = renderDOM(<LazyList {...props} />);

    expect(dom.children.length).toBe(6);
    expect(dom.textContent).toBe('345678');

  });

  it('updates on scroll', () => {

    const windowStub = getWindowStub({
      scrollY: 0,
      innerHeight: 20,
    });

    const props = {
      ...defaultProps,
      container: windowStub,
      itemsBuffer: 0,
      updateDelay: 0,
    };

    const dom = renderDOM(<LazyList {...props} />);

    expect(dom.textContent).toBe('12');
    expect(dom.children.length).toBe(2);
    expect(windowStub.addEventListener.calls[0].arguments[0]).toBe('scroll');

    windowStub.scrollY = 20;
    windowStub.addEventListener.calls[0].arguments[1]();

    expect(dom.children.length).toBe(2);
    expect(dom.textContent).toBe('34');

  });

  it('updates on window resize', () => {

    const windowStub = getWindowStub({
      scrollY: 0,
      innerHeight: 40,
    });

    const props = {
      ...defaultProps,
      container: windowStub,
      itemsBuffer: 0,
      updateDelay: 0,
    };

    const dom = renderDOM(<LazyList {...props} />);

    expect(dom.textContent).toBe('1234');
    expect(dom.children.length).toBe(4);
    expect(windowStub.addEventListener.calls[1].arguments[0]).toBe('resize');

    windowStub.innerHeight = 20;
    windowStub.addEventListener.calls[1].arguments[1]();

    expect(dom.children.length).toBe(2);
    expect(dom.textContent).toBe('12');

  });

});

function getWindowStub(props = {}) {
  return Object.assign({}, window, {
    addEventListener: expect.createSpy(),
    ...props,
  });
}
