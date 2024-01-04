import React from 'react';
import styles from '../skill.module.scss';

export const MeetLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
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
        d="M19.7258 11.059H6.27441V9.16321H19.7258V11.059ZM19.7258 16.8368H6.27441V14.941H19.7258V16.8368Z"
        fill="currentColor"
      />
    </svg>
  );
};
