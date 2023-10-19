import React, { FC, ReactNode, Ref, useRef, useState } from 'react';
import {
  SkillTagProps,
  SkillSize,
  SkillStatus,
  skillStatusToIconNameMap,
} from './Skill.types';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Icon, IconName, IconSize } from '../Icon';
import { Popup, PopupProps } from '../Popup';
import { Tooltip, TooltipProps } from '../Tooltip';
import { generateId, mergeClasses } from '../../shared/utilities';

import styles from './skill.module.scss';

export const SkillTag: FC<SkillTagProps> = React.forwardRef(
  (props: SkillTagProps, ref: Ref<HTMLDivElement>) => {
    const {
      allowDisabledFocus = false,
      background,
      classNames,
      clickable = false,
      color,
      customButtonProps,
      disabled = false,
      dropdownProps,
      endorseButtonProps,
      endorsement = false,
      iconProps,
      id,
      key,
      label,
      lineClamp,
      onClick,
      onKeyDown,
      onRemove,
      popupProps,
      readonly = false,
      removable = false,
      removeButtonAriaLabel,
      removeButtonProps,
      role,
      size = SkillSize.Medium,
      status = SkillStatus.Default,
      style,
      tabIndex = 0,
      theme = 'white',
      title,
      tooltipProps,
      ...rest
    } = props;
    const skillId: React.MutableRefObject<string> = useRef<string>(
      id || generateId()
    );

    const skillSizeToButtonSizeMap: Map<SkillSize, ButtonSize> = new Map<
      SkillSize,
      ButtonSize
    >([
      [SkillSize.Large, ButtonSize.Medium],
      [SkillSize.Medium, ButtonSize.Small],
      [SkillSize.Small, ButtonSize.Small],
      [SkillSize.XSmall, ButtonSize.Small],
    ]);

    const skillSizeToIconSizeMap: Map<SkillSize, IconSize> = new Map<
      SkillSize,
      IconSize
    >([
      [SkillSize.Large, IconSize.Medium],
      [SkillSize.Medium, IconSize.Small],
      [SkillSize.Small, IconSize.XSmall],
      [SkillSize.XSmall, IconSize.XSmall],
    ]);

    const tagLabelClassNames: string = mergeClasses([
      styles.label,
      { [styles.large]: size === SkillSize.Large },
      { [styles.medium]: size === SkillSize.Medium },
      { [styles.small]: size === SkillSize.Small },
      { [styles.xsmall]: size === SkillSize.XSmall },
      { [styles.lineClamp]: lineClamp },
    ]);

    const skillClassNames: string = mergeClasses([
      styles.skill,
      styles.tag,
      styles.bordered,
      { [styles.clickable]: !!clickable },
      classNames,
      {
        [(styles as any)[theme]]:
          status !== SkillStatus.Highlight && status !== SkillStatus.Match,
      },
      { [styles.match]: status === SkillStatus.Match },
      { [styles.highlight]: status === SkillStatus.Highlight },
      { [styles.large]: size === SkillSize.Large },
      { [styles.medium]: size === SkillSize.Medium },
      { [styles.small]: size === SkillSize.Small },
      { [styles.xsmall]: size === SkillSize.XSmall },
      { [styles.disabled]: !!disabled },
      { [styles.readonly]: !!readonly },
    ]);

    const getSkill = (children: ReactNode): ReactNode => (
      <div
        {...rest}
        aria-disabled={disabled}
        className={skillClassNames}
        id={skillId.current}
        key={key || `${skillId.current}-key`}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (disabled || readonly) {
            return;
          }
          onKeyDown?.(e);
        }}
        style={{ ...style, color }}
        tabIndex={!allowDisabledFocus && disabled ? null : tabIndex}
        title={title}
        ref={ref}
        role={clickable ? 'button' : role}
      >
        <div
          className={styles.background}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (
              readonly ||
              disabled ||
              !clickable ||
              size === SkillSize.XSmall ||
              e.target !== e.currentTarget
            ) {
              return;
            }
            onClick?.(e);
          }}
          style={{ background }}
        ></div>
        <div className={styles.content}>{children}</div>
      </div>
    );

    const getTag = (): ReactNode => (
      <>
        <div className={styles.blockStart}>
          {!!iconProps && status === SkillStatus.Default && (
            <Icon
              style={{ color }}
              {...iconProps}
              size={skillSizeToIconSizeMap.get(size)}
              classNames={styles.icon}
            />
          )}
          {status !== SkillStatus.Default && (
            <Icon
              classNames={styles.icon}
              path={skillStatusToIconNameMap.get(status)}
              size={skillSizeToIconSizeMap.get(size)}
              style={{ color }}
            />
          )}
          <span
            className={tagLabelClassNames}
            style={
              lineClamp ? { WebkitLineClamp: lineClamp, color } : { color }
            }
          >
            {label}
          </span>
        </div>
        {size !== SkillSize.Small &&
          size !== SkillSize.XSmall &&
          (!!customButtonProps || !!endorseButtonProps || !!removable) && (
            <div className={styles.blockEnd}>
              <ul className={styles.buttonList}>
                {!!endorseButtonProps && (
                  <li key="endorsement-button">
                    <Button
                      checked={endorsement}
                      iconProps={{
                        path: endorsement
                          ? IconName.mdiThumbUp
                          : IconName.mdiThumbUpOutline,
                      }}
                      shape={
                        parseInt(endorseButtonProps?.counter, 10) > 0
                          ? ButtonShape.Pill
                          : ButtonShape.Round
                      }
                      toggle
                      variant={ButtonVariant.Neutral}
                      {...endorseButtonProps}
                      classNames={styles.button}
                      onClick={
                        !disabled
                          ? (
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => {
                              e.stopPropagation();
                              endorseButtonProps?.onClick(e);
                            }
                          : null
                      }
                      size={skillSizeToButtonSizeMap.get(size)}
                    />
                  </li>
                )}
                {!!customButtonProps && (
                  <li key="custom-button">
                    <Button
                      shape={ButtonShape.Round}
                      variant={ButtonVariant.Neutral}
                      {...customButtonProps}
                      classNames={styles.button}
                      onClick={
                        !disabled
                          ? (
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => {
                              e.stopPropagation();
                              customButtonProps?.onClick(e);
                            }
                          : null
                      }
                      size={skillSizeToButtonSizeMap.get(size)}
                    />
                  </li>
                )}
                {!!removable && (
                  <li key="close-button">
                    <Button
                      ariaLabel={removeButtonAriaLabel}
                      iconProps={{ path: IconName.mdiClose }}
                      shape={ButtonShape.Round}
                      variant={ButtonVariant.Neutral}
                      {...removeButtonProps}
                      classNames={styles.button}
                      onClick={
                        !disabled
                          ? (
                              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ) => {
                              e.stopPropagation();
                              onRemove?.(e);
                            }
                          : null
                      }
                      size={skillSizeToButtonSizeMap.get(size)}
                    />
                  </li>
                )}
              </ul>
            </div>
          )}
      </>
    );

    const getDropdown = (props: DropdownProps): JSX.Element => (
      <Dropdown
        referenceWrapperClassNames={styles.dropdown}
        disabled={disabled || readonly || size === SkillSize.XSmall}
        key={`${key}-dropdown`}
        portal
        {...props}
      >
        {getSkill(getTag())}
      </Dropdown>
    );

    const getPopup = (props: PopupProps): JSX.Element => (
      <Popup
        disabled={disabled || readonly || size === SkillSize.XSmall}
        key={`${key}-popup`}
        portal
        {...props}
      >
        {getSkill(getTag())}
      </Popup>
    );

    const getTooltip = (props: TooltipProps): JSX.Element => (
      <Tooltip
        disabled={disabled || readonly || size === SkillSize.XSmall}
        key={`${key}-tooltip`}
        portal
        {...props}
      >
        {getSkill(getTag())}
      </Tooltip>
    );

    return (
      <>
        {!dropdownProps && !popupProps && !tooltipProps && getSkill(getTag())}
        {!!dropdownProps && getDropdown(dropdownProps)}
        {!!popupProps && getPopup(popupProps)}
        {!!tooltipProps && getTooltip(tooltipProps)}
      </>
    );
  }
);
