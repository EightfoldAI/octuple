import React, { Ref, FC } from 'react';

import { LinkProps } from './Link.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './link.module.scss';

export const Link: FC<LinkProps> = React.forwardRef(
  (
    {
      href,
      classNames,
      children,
      disabled = false,
      fullWidth = true,
      onClick,
      target = '_self',
      underline,
      variant = 'default',
      style,
      'data-test-id': dataTestId,
      ...rest
    },
    ref: Ref<HTMLAnchorElement>
  ) => {
    const linkClassNames: string = mergeClasses([
      styles.linkStyle,
      { [styles.fullWidth]: !!fullWidth },
      { [styles.neutral]: variant === 'neutral' },
      { [styles.primary]: variant === 'primary' },
      { [styles.secondary]: variant === 'secondary' },
      { [styles.disruptive]: variant === 'disruptive' },
      { [styles.underline]: !!underline },
      { [styles.disabled]: disabled },
      classNames,
    ]);

    const handleOnClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <a
        {...rest}
        ref={ref}
        role="link"
        aria-disabled={disabled}
        className={linkClassNames}
        href={href}
        onClick={handleOnClick}
        style={style}
        target={target}
        data-test-id={dataTestId}
      >
        {children}
      </a>
    );
  }
);
