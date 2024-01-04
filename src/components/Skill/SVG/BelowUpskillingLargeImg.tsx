import React from 'react';
import styles from '../skill.module.scss';

export const BelowUpskillingLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'below-upskilling-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 46 26"
      width="46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillBelowBackgroundColor}
        fill="currentColor"
        height="26"
        rx="13"
        width="26"
      />
      <path
        className={styles.skillBelowIconColor}
        d="M12.1707 5.88477H13.8295V15.9959L18.4901 11.3748L19.675 12.5597L13.0001 19.2346L6.3252 12.5597L7.51009 11.3748L12.1707 15.9959V5.88477Z"
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
        d="M27.115 17.7003L36.0412 8.77409H30.4722V7.11523H38.885V15.528H37.2261V9.95898L28.2999 18.8852L27.115 17.7003Z"
        fill="currentColor"
      />
    </svg>
  );
};
