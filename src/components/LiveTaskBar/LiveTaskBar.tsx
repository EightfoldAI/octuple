'use client';

import React, { FC, Ref, useContext, useState } from 'react';
import { Button, ButtonProps, ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { Dropdown } from '../Dropdown';
import { Panel } from '../Panel';
import { ThemeNames } from '../ConfigProvider';
import ThemeContext from '../ConfigProvider/ThemeContext';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';
import { LiveTaskBarProps } from './LiveTaskBar.types';

import styles from './liveTaskBar.module.scss';
import themedComponentStyles from './liveTaskBar.theme.module.scss';

export const LiveTaskBar: FC<LiveTaskBarProps> = React.forwardRef(
  (props: LiveTaskBarProps, ref: Ref<HTMLDivElement>) => {
    const {
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      header,
      tasks = [],
      panel,
      panelButton,
      dropdown,
      dropdownButton,
      theme,
      style,
      classNames,
      ...rest
    } = props;

    // State for panel visibility
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    const htmlDir: string = useCanvasDirection();

    // Context support
    const contextualTheme = useContext(ThemeContext);
    const mergedTheme = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // Compute component class names for main container
    const liveTaskBarClassNames: string = mergeClasses([
      styles.liveTaskBar,
      styles.horizontal,
      { [styles.aiAgent]: mergedTheme === ThemeNames.AIAgent },
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.liveTaskBarRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    // Compute component class names for content wrapper
    const componentWrapperClassNames: string = mergeClasses([
      styles.liveTaskBarWrapper,
    ]);

    // Handle panel toggle
    const handlePanelToggle = () => {
      setIsPanelVisible(!isPanelVisible);
    };

    // Handle panel close
    const handlePanelClose = () => {
      setIsPanelVisible(false);
    };

    // Default panel button props
    const defaultPanelButtonProps: ButtonProps = {
      text: 'Ask AIR',
      iconProps: { path: IconName.mdiLightbulb },
      variant: ButtonVariant.Primary,
      onClick: handlePanelToggle,
      shape: ButtonShape.Pill,
      ariaLabel: 'Open assistant panel',
    };

    // Default dropdown button props
    const defaultDropdownButtonProps: ButtonProps = {
      ariaLabel: 'More options',
      shape: ButtonShape.Round,
      variant: ButtonVariant.Secondary,
      iconProps: { path: IconName.mdiDotsHorizontal },
    };

    // Merge default button props with provided button props
    const mergedPanelButtonProps = {
      ...defaultPanelButtonProps,
      ...panelButton,
    };
    const mergedDropdownButtonProps = {
      ...defaultDropdownButtonProps,
      ...dropdownButton,
    };

    return (
      <div
        className={componentWrapperClassNames}
        ref={ref}
        role="region"
        aria-label="Live task status"
        {...rest}
      >
        <div className={liveTaskBarClassNames} style={style}>
          <div className={styles.leftSection}>
            {header && (
              <div className={styles.headerSection} aria-hidden={false}>
                {header}
              </div>
            )}
            {tasks?.length > 0 && (
              <div
                className={styles.taskItems}
                role="group"
                aria-label="Task items"
              >
                {tasks.map((task, index) => (
                  <div key={`task-${index}`}>{task}</div>
                ))}
              </div>
            )}
          </div>
          <div
            className={styles.actionItems}
            role="group"
            aria-label="Action items"
          >
            {panel && panelButton && <Button {...mergedPanelButtonProps} />}
            {panel && (
              <Panel
                {...panel}
                visible={isPanelVisible}
                onClose={handlePanelClose}
              />
            )}
            {dropdown && dropdown.overlay && (
              <Dropdown {...dropdown}>
                <Button {...mergedDropdownButtonProps} />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    );
  }
);

LiveTaskBar.displayName = 'LiveTaskBar';
