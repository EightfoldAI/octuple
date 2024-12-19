import React from 'react';
import styles from '../skill.module.scss';

export const MeetUpskillingMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-upskilling-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 39 22"
      width="39"
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
        d="M23.0205 14.977L30.5735 7.42405H25.8612V6.0204H32.9797V13.1389H31.5761V8.42665L24.0231 15.9796L23.0205 14.977Z"
        fill="currentColor"
      />
    </svg>
  );
};
