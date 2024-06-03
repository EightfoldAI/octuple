import React from 'react';
import styles from '../skill.module.scss';

export const MeetUpskillingSmallImg = (): JSX.Element => {
  return (
    <svg
      className={'meet-upskilling-small-image'}
      fill="none"
      height="18"
      viewBox="0 0 32 18"
      width="32"
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
      <rect
        className={styles.skillUpskillingBackgroundColor}
        fill="currentColor"
        height="18"
        rx="9"
        width="18"
        x="14"
      />
      <path
        className={styles.skillUpskillingIconColor}
        d="M18.9258 12.2539L25.1055 6.07422H21.25V4.92578H27.0742V10.75H25.9258V6.89453L19.7461 13.0742L18.9258 12.2539Z"
        fill="currentColor"
      />
    </svg>
  );
};
