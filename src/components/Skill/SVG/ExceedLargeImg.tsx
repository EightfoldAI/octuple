import React from 'react';
import styles from '../skill.module.scss';

export const ExceedLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillExceedBackgroundColor}
        fill="currentColor"
        height="26"
        rx="13"
        width="26"
      />
      <path
        className={styles.skillExceedIconColor}
        d="M13.8295 19.3928H12.1707V9.28168L7.51009 13.9028L6.3252 12.7179L13.0001 6.04297L19.675 12.7179L18.4901 13.9028L13.8295 9.28168V19.3928Z"
        fill="currentColor"
      />
    </svg>
  );
};
