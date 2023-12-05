import React from 'react';
import styles from '../skill.module.scss';

export const UpskillingLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'upskilling-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="26"
        rx="13"
        width="26"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M7.11523 17.7001L16.0415 8.77387H10.4724V7.11502H18.8852V15.5278H17.2263V9.95877L8.30013 18.885L7.11523 17.7001Z"
        fill="currentColor"
      />
    </svg>
  );
};
