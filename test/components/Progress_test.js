import React from 'react';
import Progress from '../../src/components/Progress';
import TestUtils from 'react-addons-test-utils';
import {createStore, renderDOM} from '../utils';

describe('Progress', () => {

  it('seeking a progress', () => {

    const store = createStore({
      player: {
        track: {id: 1, duration: 200},
        progress: 0,
      },
    });

    const dom = renderDOM(
      <Progress store={store} />
    );

    dom.offsetWidth = 200;
    dom.offsetLeft = 100;
    dom.children[1].offsetWidth = 50;
    TestUtils.Simulate.click(dom, {clientX: 170});
    TestUtils.Simulate.click(dom, {clientX: 130});

    const actions = store.getActions();
    expect(actions.length).to.be(2);
    expect(actions[0].progress).to.be(70);
    expect(actions[1].progress).to.be(30);

  });

  it('shows progress', () => {

    [
      {progress: 50, expected: '25%'},
      {progress: 100, expected: '50%'},
      {progress: 150, expected: '75%'},
    ].forEach((testCase) => {
      const store = createStore({
        player: {
          track: {duration: 200},
          progress: testCase.progress,
        }
      });

      const dom = renderDOM(
        <Progress store={store} />
      );

      expect(dom.children[0].style.getPropertyValue('width'))
        .to.be(testCase.expected);
    });

  });

});
