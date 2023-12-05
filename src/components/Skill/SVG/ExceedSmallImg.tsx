import React from 'react';
import styles from '../skill.module.scss';

export const ExceedSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillExceedBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
      />
      <path
        className={styles.skillExceedIconColor}
        d="M9.57422 13.4258H8.42578V6.42578L5.19922 9.625L4.37891 8.80469L9 4.18359L13.6211 8.80469L12.8008 9.625L9.57422 6.42578V13.4258Z"
        fill="currentColor"
      />
    </svg>
  );
};
