import React from 'react';
import styles from '../skill.module.scss';

export const BelowUpskillingSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'below-upskilling-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 32 18"
      width="32"
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
