import React from 'react';
import styles from '../skill.module.scss';

export const UpskillingMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'upskilling-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M6.02051 14.977L13.5735 7.42403H8.86122V6.02039H15.9797V13.1389H14.5761V8.42664L7.02311 15.9796L6.02051 14.977Z"
        fill="currentColor"
      />
    </svg>
  );
};
