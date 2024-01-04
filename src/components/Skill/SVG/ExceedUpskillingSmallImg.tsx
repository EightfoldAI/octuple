import React from 'react';
import styles from '../skill.module.scss';

export const ExceedUpskillingSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-upskilling-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 32 18"
      width="32"
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
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
        x="14"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M18.9258 12.2539L25.1055 6.07422H21.25V4.92578H27.0742V10.75H25.9258V6.89453L19.7461 13.0742L18.9258 12.2539Z"
        fill="currentColor"
      />
    </svg>
  );
};
