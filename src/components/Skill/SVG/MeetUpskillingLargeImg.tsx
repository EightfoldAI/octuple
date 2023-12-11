import React from 'react';
import styles from '../skill.module.scss';

export const MeetUpskillingLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-upskilling-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 46 26"
      width="46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillMeetBackgroundColor}
        fill="currentColor"
        height="26"
        rx="13"
        width="26"
      />
      <path
        className={styles.skillMeetIconColor}
        d="M19.7258 11.059H6.27441V9.16319H19.7258V11.059ZM19.7258 16.8368H6.27441V14.941H19.7258V16.8368Z"
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
        d="M27.1152 17.7001L36.0415 8.77388H30.4724V7.11502H38.8852V15.5278H37.2263V9.95877L28.3001 18.885L27.1152 17.7001Z"
        fill="currentColor"
      />
    </svg>
  );
};
