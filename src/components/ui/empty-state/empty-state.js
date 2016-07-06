import React from 'react';
import Icon from '../icon/icon';
import cn from 'classnames';
import styles from './empty-state.scss';

export default function EmptyState(props) {
  return <div className={cn(styles.root, props.className, {
    [styles.rootSmall]: props.small,
  })}>
    <Icon className={styles.icon} size={props.small ? 36 : 72} glyph={props.glyph} />
    <h2 className={styles.primaryText}>{props.primaryText}</h2>
    {props.secondaryText
      ? <span className={styles.secondaryText}>{props.secondaryText}</span>
      : null}
  </div>;
}
