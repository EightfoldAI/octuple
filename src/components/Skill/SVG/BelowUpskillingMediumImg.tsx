import React from 'react';
import styles from '../skill.module.scss';

export const BelowUpskillingMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'below-upskilling-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 39 22"
      width="39"
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
        d="M10.2982 4.97949H11.7019V13.535L15.6455 9.62489L16.6481 10.6275L11.0001 16.2755L5.35205 10.6275L6.35465 9.62489L10.2982 13.535V4.97949Z"
        fill="currentColor"
      />
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
        x="17"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M23.0205 14.9771L30.5735 7.42415H25.8612V6.02051H32.9797V13.139H31.5761V8.42676L24.0231 15.9797L23.0205 14.9771Z"
        fill="currentColor"
      />
    </svg>
  );
};
