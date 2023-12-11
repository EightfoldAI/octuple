import React from 'react';
import styles from '../skill.module.scss';

export const BelowMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'below-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillBelowBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
      />
      <path
        className={styles.skillBelowIconColor}
        d="M10.2982 4.97961H11.7019V13.5352L15.6455 9.62501L16.6481 10.6276L11.0001 16.2756L5.35205 10.6276L6.35465 9.62501L10.2982 13.5352V4.97961Z"
        fill="currentColor"
      />
    </svg>
  );
};
