import React from 'react';
import Progress from '../../../src/components/header/header-player-progress';
import TestUtils from 'react-addons-test-utils';
import {renderDOM} from '../../utils';

describe('Progress component', () => {

  it('seeks position', (done) => {
    const dom = renderDOM(
      <Progress max={200} current={0} onSeek={seek} />
    );

    dom.offsetWidth = 200;
    dom.offsetLeft = 100;

    TestUtils.Simulate.click(dom, {clientX: 170});

    function seek(pos) {
      expect(pos).toBe(70);
      done();
    }
  });

  it('shows progress', () => {
    [
      {progress: 50, expected: '25%'},
      {progress: 100, expected: '50%'},
      {progress: 150, expected: '75%'},
    ].forEach((testCase) => {
      const dom = renderDOM(
        <Progress current={testCase.progress} max={200} onSeek={() => null} />
      );

      expect(dom.children[1].style.getPropertyValue('width'))
        .toBe(testCase.expected);
    });
  });

});
