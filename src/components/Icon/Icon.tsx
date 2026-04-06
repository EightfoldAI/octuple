'use client';

import React, { FC } from 'react';
import IcomoonReact from 'icomoon-react';

import { mergeClasses } from '../../shared/utilities';
import { Icon as MdiIcon } from '@mdi/react';
import { IconProps, IconSize } from './Icon.types';

import styles from './icon.module.scss';
import { useConfig } from '../ConfigProvider';

export const Icon: FC<IconProps> = ({
  ariaHidden = false,
  classNames,
  color,
  description,
  horizontal,
  id,
  path,
  role = 'presentation',
  rotate,
  size = IconSize.Medium,
  spin,
  style,
  title,
  vertical,
  'data-test-id': dataTestId,
  icomoonIconName,
}) => {
  const { icomoonIconSet } = useConfig();

  const iconClassNames: string = mergeClasses([classNames, styles.iconWrapper]);

  if (!icomoonIconName && !path) {
    return null;
  }

  const iconProps = ariaHidden ? { 'aria-hidden': true } : { role };

  const iconComponent = icomoonIconName ? (
    <IcomoonReact
      iconSet={icomoonIconSet}
      size={size}
      color={color}
      icon={icomoonIconName}
      {...iconProps}
    />
  ) : (
    <MdiIcon
      color={color}
      description={description}
      horizontal={horizontal}
      path={path}
      rotate={rotate}
      size={size}
      title={title}
      vertical={vertical}
      spin={spin}
      // @ts-ignore
      {...iconProps}
    />
  );

  return (
    <span
      data-test-id={dataTestId}
      className={iconClassNames}
      id={id}
      style={style ? style : null}
    >
      {iconComponent}
    </span>
  );
};

Icon.displayName = 'Icon';
