import React from 'react';
import styles from '../skill.module.scss';

export const MeetMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillMeetBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
      />
      <path
        className={styles.skillMeetIconColor}
        d="M16.691 9.35765H5.30908V7.75348H16.691V9.35765ZM16.691 14.2465H5.30908V12.6424H16.691V14.2465Z"
        fill="currentColor"
      />
    </svg>
  );
};
