import React from 'react';
import styles from '../skill.module.scss';

export const ExceedMediumImg = (): JSX.Element => {
  return (
    <svg
      className={'exceed-medium-image'}
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={styles.skillExceedBackgroundColor}
        fill="currentColor"
        height="22"
        rx="11"
        width="22"
      />
      <path
        className={styles.skillExceedIconColor}
        d="M11.7019 16.4093H10.2982V7.85373L6.35465 11.7639L5.35205 10.7613L11.0001 5.11328L16.6481 10.7613L15.6455 11.7639L11.7019 7.85373V16.4093Z"
        fill="currentColor"
      />
    </svg>
  );
};
