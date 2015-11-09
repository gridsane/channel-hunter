import React from 'react';
import Navigation from '../../../src/components/common/Navigation';
import {renderDOM} from '../../utils';

describe('Navigation component', () => {

  it('renders children', () => {

    const dom = renderDOM(
      <Navigation>
        <span>foo</span>
        <span>bar</span>
      </Navigation>
    );

    expect(dom.textContent).to.be('foobar');

  });

  it('visible when opened', () => {

    const dom = renderDOM(<Navigation open={true} />);

    expect(dom.style.getPropertyValue('visibility')).to.be('visible');

  });

  it('not visible when closed', () => {

    const dom = renderDOM(<Navigation open={false} />);

    expect(dom.style.getPropertyValue('visibility')).to.be('hidden');

  });

  it('merges panel style with component style', () => {

    const dom = renderDOM(<Navigation open={true} style={{opacity: .5}} />);
    const panelDom = dom.children[0];

    expect(panelDom.style.getPropertyValue('position')).to.be('fixed');
    expect(panelDom.style.getPropertyValue('opacity')).to.be('0.5');

  });

  it('stretches the container, when not docked', () => {

    const dom = renderDOM(<Navigation open={true} docked={false} />);

    expect(dom.style.getPropertyValue('right')).to.be('0px');

  });

  it('do not stretches the container, when docked', () => {

    const dom = renderDOM(<Navigation open={true} docked={true} />);

    expect(dom.style.getPropertyValue('right')).to.be('');

  });

  it('has panel shadow, when not docked', () => {

    const dom = renderDOM(<Navigation open={true} docked={false} />);
    const panelDom = dom.children[0];

    expect(panelDom.style.getPropertyValue('box-shadow')).to.not.be('none');

  });

  it('has no panel shadow, when docked', () => {

    const dom = renderDOM(<Navigation open={true} docked={true} />);
    const panelDom = dom.children[0];

    expect(panelDom.style.getPropertyValue('box-shadow')).to.be('none');

  });

});
