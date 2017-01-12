import React, {PropTypes} from 'react';
import Logo from './logo';
import IconButton from 'components/ui/icon-button';
import styles from './header.scss';

export default class Header extends React.PureComponent {
  static propTypes = {
    channelsCount: PropTypes.number.isRequired,
    isDiscoverVisible: PropTypes.bool.isRequired,
    onToggleDiscover: PropTypes.func.isRequired,
  }

  render() {
    const {channelsCount, isDiscoverVisible, onToggleDiscover} = this.props;

    return <div className={styles.root}>
      <Logo className={styles.logo}/>
      <div className={styles.channels}>{channelsCount} channels</div>
      {isDiscoverVisible ||
        <IconButton glyph="add" onClick={onToggleDiscover} className={styles.icon} />}
    </div>;
  }
}
