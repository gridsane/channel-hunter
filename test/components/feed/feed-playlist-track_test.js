import React from 'react';
import Track from '../../../src/components/feed/feed-playlist-track';
import {Avatar, Icon} from '../../../src/components/ui';
import {shallowRender, renderDOM} from '../../utils';
import {Simulate} from 'react-addons-test-utils';
import {findAllWithClass} from 'react-shallow-testutils';
import styles from '../../../src/components/feed/feed.scss';

describe('Playlist track component', () => {
  const defaultProps = {
    id: '1',
    artist: 'Foo',
    title: 'Bar',
    channelImage: 'foo_image.jpg',
    duration: 65,
    onClick: () => null,
  };

  it('renders title, artist and duration', () => {
    const dom = renderDOM(<Track  {...defaultProps} />);

    expect(dom.textContent).toContain('Bar by Foo01:05');
  });

  it('renders channel image', () => {
    const track = shallowRender(<Track {...defaultProps} />);
    const channelImage = track.props.rightElement;

    expect(channelImage.type).toBe(Avatar);
    expect(channelImage.props.url).toBe('foo_image.jpg');
    expect(channelImage.props.size).toBe(32);
    expect(channelImage.props.className).toBe(styles.trackChannelImage);

  });

  it('renders idle state', () => {
    const track = shallowRender(<Track {...defaultProps} />);

    expect(track.props.leftElement).toBe(null);
    expect(track.props.className).toBe(styles.track);
  });

  it('renders selected state', () => {
    const track = shallowRender(<Track {...defaultProps} isCurrent={true} />);

    expect(track.props.className).toContain(styles.trackCurrent);
    expect(track.props.leftElement.type).toBe(Icon);
    expect(track.props.leftElement.props.glyph).toBe('play_arrow');
    expect(track.props.leftElement.props.className).toBe(styles.trackCurrentIcon);
  });

  it('renders error state', () => {
    const track = shallowRender(<Track {...defaultProps} error={'some error'} />);
    const errorIcon = track.props.leftElement;

    expect(errorIcon.type).toBe(Icon);
    expect(errorIcon.props.glyph).toBe('error');
    expect(errorIcon.props.className).toContain(styles.trackErrorIcon);
  });

  it('responds with id to onClick callback', () => {
    const spy = expect.createSpy();
    const props = {...defaultProps, onClick: spy};
    const dom = renderDOM(<Track {...props} />);

    Simulate.click(dom);

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments[0]).toBe('1');
  });

  it('does not render channel image if image is empty', () => {
    const track = shallowRender(<Track {...defaultProps} channelImage={null} />);

    expect(track.props.rightElement).toBe(null);
  });

  it('does not render artist if artist is empty', () => {
    const track = shallowRender(<Track {...defaultProps} artist={null} />);

    expect(
      findAllWithClass(track.props.primaryText, styles.trackArtist).length
    ).toBe(0);

  });
});
