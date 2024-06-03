import React from 'react';
import styles from '../skill.module.scss';

export const ExceedUpskillingMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-upskilling-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 39 22"
      width="39"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillExceedBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
      />
      <path
        className={styles.skillExceedIconColor}
        d="M11.7019 16.4093H10.2982V7.85373L6.35465 11.7639L5.35205 10.7613L11.0001 5.11328L16.6481 10.7613L15.6455 11.7639L11.7019 7.85373V16.4093Z"
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
