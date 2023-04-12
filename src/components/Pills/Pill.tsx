import React, { FC, Ref, useContext } from 'react';
import { PillIconAlign, PillProps, PillSize, PillType } from './Pills.types';
import DisabledContext, { Disabled } from '../ConfigProvider/DisabledContext';
import { ButtonSize, DefaultButton } from '../Button';
import { Icon, IconName, IconSize } from '../Icon';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';

import styles from './pills.module.scss';

export const Pill: FC<PillProps> = React.forwardRef(
  (
    {
      alignIcon = PillIconAlign.Left,
      classNames,
      color,
      configContextProps = {
        noDisabledContext: false,
        noSizeContext: false,
      },
      disabled = false,
      label,
      lineClamp,
      iconProps,
      theme = 'blue',
      onClose,
      onClick,
      closeButtonProps,
      pillButtonProps,
      type = PillType.default,
      size = PillSize.Medium,
      style,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const contextuallyDisabled: Disabled = useContext(DisabledContext);
    const mergedDisabled: boolean = configContextProps.noDisabledContext
      ? disabled
      : contextuallyDisabled || disabled;

    const pillSizeToButtonSizeMap = new Map<PillSize, ButtonSize>([
      [PillSize.Large, ButtonSize.Medium],
      [PillSize.Medium, ButtonSize.Small],
      [PillSize.Small, ButtonSize.Small],
      [PillSize.XSmall, ButtonSize.Small],
    ]);

    const pillSizeToIconSizeMap = new Map<PillSize, IconSize>([
      [PillSize.Large, IconSize.Medium],
      [PillSize.Medium, IconSize.Small],
      [PillSize.Small, IconSize.XSmall],
      [PillSize.XSmall, IconSize.XSmall],
    ]);

    const iconClassNames: string = mergeClasses([
      styles.icon,
      { [styles.iconLeft]: alignIcon === PillIconAlign.Left },
      { [styles.iconRight]: alignIcon === PillIconAlign.Right },
    ]);

    const labelClassNames: string = mergeClasses([
      styles.label,
      { [styles.medium]: size === PillSize.Medium },
      { [styles.small]: size === PillSize.Small },
      { [styles.xsmall]: size === PillSize.XSmall },
      { [styles.lineClamp]: lineClamp },
    ]);

    const tagClassNames: string = mergeClasses([
      styles.tagPills,
      classNames,
      (styles as any)[theme],
      { [styles.xsmall]: size === PillSize.XSmall },
      { [styles.tagPillsDisabled]: mergedDisabled },
      { [styles.tagPillsRtl]: htmlDir === 'rtl' },
      {
        [styles.readOnly]:
          type !== PillType.withButton && type !== PillType.closable,
      },
    ]);

    const getIcon = (): JSX.Element => (
      <Icon
        {...iconProps}
        size={pillSizeToIconSizeMap.get(size)}
        classNames={iconClassNames}
      />
    );

    return (
      <div
        {...rest}
        className={tagClassNames}
        style={{ ...style, color }}
        ref={ref}
      >
        {iconProps && alignIcon === PillIconAlign.Left && getIcon()}
        <span
          className={labelClassNames}
          style={lineClamp ? { WebkitLineClamp: lineClamp } : null}
        >
          {label}
        </span>
        {iconProps && alignIcon === PillIconAlign.Right && getIcon()}
        {type === PillType.withButton && (
          <DefaultButton
            {...pillButtonProps}
            onClick={!mergedDisabled ? onClick : null}
            size={pillSizeToButtonSizeMap.get(size)}
            classNames={styles.button}
          />
        )}
        {type === PillType.closable && (
          <DefaultButton
            iconProps={{ path: IconName.mdiClose }}
            {...closeButtonProps}
            onClick={!mergedDisabled ? onClose : null}
            size={pillSizeToButtonSizeMap.get(size)}
            classNames={styles.closeButton}
          />
        )}
      </div>
    );
  }
);
