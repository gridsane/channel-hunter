import React from 'react';
import cn from 'classnames';
import styles from './grid.scss';

export default function Grid(props) {
  return <div className={cn(styles.grid, props.className)}>
    {props.children}
  </div>;
}
