import React from 'react';
import styles from '../skill.module.scss';

export const MeetSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillMeetBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
      />
      <path
        className={styles.skillMeetIconColor}
        d="M13.6562 7.65625H4.34375V6.34375H13.6562V7.65625ZM13.6562 11.6562H4.34375V10.3438H13.6562V11.6562Z"
        fill="currentColor"
      />
    </svg>
  );
};
