import React from 'react';
import styles from '../skill.module.scss';

export const UpskillingSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'upskilling-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M4.92578 12.2539L11.1055 6.07422H7.25V4.92578H13.0742V10.75H11.9258V6.89453L5.74609 13.0742L4.92578 12.2539Z"
        fill="currentColor"
      />
    </svg>
  );
};
