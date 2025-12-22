'use client';

import React, { FC, Ref } from 'react';
import { mergeClasses } from '../../shared/utilities';
import { EmptyMode, EmptyProps } from './Empty.types';
import { DefaultEmptyDataImg } from './SVG/DefaultEmptyDataImg';
import { DefaultEmptyMessagesImg } from './SVG/DefaultEmptyMessagesImg';
import { DefaultEmptyPlanImg } from './SVG/DefaultEmptyPlanImg';
import { DefaultEmptyProfileImg } from './SVG/DefaultEmptyProfileImg';
import { DefaultEmptySearchImg } from './SVG/DefaultEmptySearchImg';
import { DefaultServerErrorImg } from './SVG/DefaultServerErrorImg';
import { DefaultTasksCompleteImg } from './SVG/DefaultTasksCompleteImg';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './empty.module.scss';

const defaultEmptyDataImg = <DefaultEmptyDataImg />;
const defaultEmptyMessagesImg = <DefaultEmptyMessagesImg />;
const defaultEmptyPlanImg = <DefaultEmptyPlanImg />;
const defaultEmptyProfileImg = <DefaultEmptyProfileImg />;
const defaultEmptySearchImg = <DefaultEmptySearchImg />;
const defaultServerErrorImg = <DefaultServerErrorImg />;
const defaultTasksCompleteImg = <DefaultTasksCompleteImg />;

export const Empty: FC<EmptyProps> = React.forwardRef(
  (
    {
      children,
      classNames,
      description,
      descriptionClassNames = '',
      titleClassNames = '',
      image,
      imageStyle,
      mode = EmptyMode.data,
      title,
      headingLevel,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const getDefaultImage = (mode: EmptyMode): JSX.Element => {
      switch (mode) {
        case EmptyMode.data:
          return defaultEmptyDataImg;
        case EmptyMode.error:
          return defaultServerErrorImg;
        case EmptyMode.messages:
          return defaultEmptyMessagesImg;
        case EmptyMode.plan:
          return defaultEmptyPlanImg;
        case EmptyMode.profile:
          return defaultEmptyProfileImg;
        case EmptyMode.search:
          return defaultEmptySearchImg;
        case EmptyMode.tasks:
          return defaultTasksCompleteImg;
        default:
          return defaultEmptyDataImg;
      }
    };

    let imageNode: React.ReactNode = null;

    if (image) {
      if (typeof image === 'string') {
        imageNode = <img alt="" src={image} />;
      } else {
        imageNode = image;
      }
    } else {
      imageNode = getDefaultImage(mode);
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={mergeClasses([
          styles.empty,
          { [styles.emptyDefault]: image === getDefaultImage(mode) },
          { [styles.emptyRtl]: htmlDir === 'rtl' },
          classNames,
        ])}
      >
        <div className={styles.emptyImage} style={imageStyle}>
          {imageNode}
        </div>
        {title && (
          <div className={mergeClasses([styles.emptyTitle, titleClassNames])}>
            {title}
          </div>
        )}
        {description && (
          <div
            className={mergeClasses([
              styles.emptyDescription,
              descriptionClassNames,
            ])}
          >
            {description}
          </div>
        )}
        {children && <div className={styles.emptyFooter}>{children}</div>}
      </div>
    );
  }
);
