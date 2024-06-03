import React from 'react';
import styles from '../skill.module.scss';

export const BelowLargeImg = (): JSX.Element => {
  return (
    <svg
      className={'below-large-image'}
      fill="none"
      height="26"
      viewBox="0 0 26 26"
      width="26"
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
        d="M12.1707 5.88498H13.8295V15.9961L18.4901 11.375L19.675 12.5599L13.0001 19.2348L6.3252 12.5599L7.51009 11.375L12.1707 15.9961V5.88498Z"
        fill="currentColor"
      />
    </svg>
  );
};
