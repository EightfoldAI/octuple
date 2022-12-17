import React from 'react';

import styles from '../Styles/tree.module.scss';

export const offset = 4;

export default function dropIndicatorRender(props: {
  dropPosition: -1 | 0 | 1;
  dropLevelOffset: number;
  indent: number;
  direction: 'ltr' | 'rtl';
}) {
  const { dropPosition, dropLevelOffset, indent, direction = 'ltr' } = props;
  const startPosition = direction === 'ltr' ? 'left' : 'right';
  const endPosition = direction === 'ltr' ? 'right' : 'left';
  const style: React.CSSProperties = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0,
  };
  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      // dropPosition === 0
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }
  return <div style={style} className={styles.treeDropIndicator} />;
}
