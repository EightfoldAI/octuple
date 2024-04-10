'use client';

import React, { FC, Ref, useContext } from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { BaseDialog } from '../Dialog/BaseDialog/BaseDialog';
import { ModalProps, ModalSize } from './Modal.types';
import { mergeClasses } from '../../shared/utilities';

import styles from './modal.module.scss';
import themedComponentStyles from './modal.theme.module.scss';

export const Modal: FC<ModalProps> = React.forwardRef(
  (
    {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      actionsClassNames,
      bodyClassNames,
      bodyPadding = true,
      closeButtonProps,
      closeIcon,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      gradient = false,
      headerButtonProps,
      headerClassNames,
      headerIcon,
      height,
      modalClassNames,
      modalWrapperClassNames,
      overlay,
      size = ModalSize.medium,
      theme,
      themeContainerId,
      width,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    const modalClasses: string = mergeClasses([
      styles.modal,
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.noBodyPadding]: bodyPadding === false },
      modalClassNames,
      { [styles.small]: size === ModalSize.small },
      { [styles.medium]: size === ModalSize.medium },
      { [styles.large]: size === ModalSize.large },
      { [styles.xLarge]: size === ModalSize.xLarge },
      { [styles.fullscreen]: size === ModalSize.fullscreen },
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const actionsClasses: string = mergeClasses([
      styles.footer,
      actionsClassNames,
    ]);

    return (
      <ThemeContextProvider
        componentClassName={themedComponentStyles.theme}
        containerId={themeContainerId}
        theme={mergedTheme}
      >
        <BaseDialog
          {...rest}
          ref={ref}
          actionButtonOneProps={actionButtonOneProps}
          actionButtonTwoProps={actionButtonTwoProps}
          actionButtonThreeProps={actionButtonThreeProps}
          actionsClassNames={actionsClasses}
          bodyClassNames={bodyClasses}
          bodyPadding={bodyPadding}
          closeButtonProps={closeButtonProps}
          closeIcon={closeIcon}
          configContextProps={configContextProps}
          dialogClassNames={modalClasses}
          dialogWrapperClassNames={modalWrapperClassNames}
          gradient={mergedGradient}
          headerButtonProps={headerButtonProps}
          headerClassNames={headerClasses}
          headerIcon={headerIcon}
          height={height}
          overlay={overlay}
          theme={mergedTheme}
          themeContainerId={themeContainerId}
          width={width}
        />
      </ThemeContextProvider>
    );
  }
);
