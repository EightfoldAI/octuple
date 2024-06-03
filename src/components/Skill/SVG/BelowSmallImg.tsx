import React from 'react';
import styles from '../skill.module.scss';

export const BelowSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'below-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillBelowBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
      />
      <path
        className={styles.skillBelowIconColor}
        d="M8.42578 4.07422H9.57422V11.0742L12.8008 7.875L13.6211 8.69531L9 13.3164L4.37891 8.69531L5.19922 7.875L8.42578 11.0742V4.07422Z"
        fill="currentColor"
      />
    </svg>
  );
};
