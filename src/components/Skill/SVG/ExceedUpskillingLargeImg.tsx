import React from 'react';
import styles from '../skill.module.scss';

export const ExceedUpskillingLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-upskilling-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 46 26"
      width="46"
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
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="26"
        rx="13"
        width="26"
        x="20"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M27.1152 17.7003L36.0415 8.77409H30.4724V7.11523H38.8852V15.528H37.2263V9.95898L28.3001 18.8852L27.1152 17.7003Z"
        fill="currentColor"
      />
    </svg>
  );
};
