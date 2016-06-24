import React from 'react';
import cn from 'classnames';
import styles from './grid.scss';

export default function Cell(props) {
  const className = cn(
    styles.cell,
    styles['cellLarge' + props.large],
    styles['cellMedium' + props.medium],
    styles['cellSmall' + props.small],
    props.className
  );

  return <div className={className}>{props.children}</div>;
}
