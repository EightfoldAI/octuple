import React, { FC, Ref, useEffect, useRef } from 'react';
import { BaseDialogProps } from './BaseDialog.types';
import { Portal } from '../../Portal';
import {
  mergeClasses,
  stopPropagation,
  uniqueId,
} from '../../../shared/utilities';
import { IconName } from '../../Icon';
import { Button, ButtonShape, ButtonVariant } from '../../Button';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { FocusTrap } from '../../../shared/FocusTrap';
import { NoFormStyle } from '../../Form/Context';
import { useCanvasDirection } from '../../../hooks/useCanvasDirection';

import styles from './base-dialog.module.scss';
import { useScrollShadow } from '../../../hooks/useScrollShadows';

export const BaseDialog: FC<BaseDialogProps> = React.forwardRef(
  (
    {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      actions,
      actionsClassNames,
      body,
      bodyClassNames,
      bodyPadding = true,
      closable = true,
      closeButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      dialogClassNames,
      dialogWrapperClassNames,
      firstFocusableSelector,
      focusTrap = true,
      gradient = false,
      header,
      headerButtonProps,
      headerClassNames,
      headerIcon = IconName.mdiArrowLeftThick,
      height,
      lastFocusableSelector,
      maskClosable = true,
      onClose,
      onVisibleChange,
      overlay = true,
      parent = typeof document !== 'undefined' ? document.body : null,
      positionStrategy = 'fixed',
      renderContentAlways = true,
      skipFocusableSelectorsFromIndex,
      style,
      theme,
      themeContainerId,
      visible,
      width,
      zIndex,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const labelId = uniqueId('dialog-label-');
    const bodyRef = useRef<HTMLDivElement>(null);

    useScrollLock(parent, visible);
    const { showBottomShadow, showTopShadow, scrollRef } =
      useScrollShadow(bodyRef);

    const dialogBackdropClasses: string = mergeClasses([
      styles.dialogBackdrop,
      dialogWrapperClassNames,
      { [styles.visible]: visible },
      {
        [styles.modeless]: overlay === false,
        [styles.modelessMask]: overlay === false && maskClosable,
      },
    ]);

    const dialogClasses: string = mergeClasses([
      styles.dialog,
      { [styles.noBodyPadding]: bodyPadding === false },
      { [styles.dialogRtl]: htmlDir === 'rtl' },
      dialogClassNames,
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([
      styles.body,
      bodyClassNames,
      {
        [styles.bodyBottomShadow]: showBottomShadow,
        [styles.bodyTopShadow]: showTopShadow,
        [styles.bodyTopBottomShadow]: showTopShadow && showBottomShadow,
      },
    ]);

    const actionsClasses: string = mergeClasses([
      styles.footer,
      actionsClassNames,
    ]);

    const dialogBackdropStyle: React.CSSProperties = {
      position: positionStrategy,
      ...style,
    };

    const dialogStyle: React.CSSProperties = {
      zIndex,
      height,
      width,
    };

    useEffect(() => {
      onVisibleChange?.(visible);
    }, [visible]);

    const getDialog = (): JSX.Element => (
      <NoFormStyle status override>
        <FocusTrap
          firstFocusableSelector={firstFocusableSelector}
          lastFocusableSelector={lastFocusableSelector}
          skipFocusableSelectorsFromIndex={skipFocusableSelectorsFromIndex}
          trap={visible && focusTrap}
          {...rest}
          ref={ref}
          role="dialog"
          aria-modal={true}
          aria-labelledby={labelId}
          style={dialogBackdropStyle}
          className={dialogBackdropClasses}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            maskClosable && onClose?.(e);
          }}
        >
          <div
            className={dialogClasses}
            style={dialogStyle}
            onClick={stopPropagation}
          >
            {renderContentAlways && (
              <>
                <div className={headerClasses}>
                  <span id={labelId}>
                    {headerButtonProps && (
                      <Button
                        classNames={styles.headerButton}
                        configContextProps={configContextProps}
                        gradient={gradient}
                        shape={ButtonShape.Round}
                        iconProps={{ path: headerIcon }}
                        style={{
                          transform:
                            htmlDir === 'rtl' ? 'rotate(180deg)' : 'none',
                        }}
                        theme={theme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Neutral}
                        {...headerButtonProps}
                      />
                    )}
                    {header}
                  </span>
                  <span className={styles.headerButtons}>
                    {actionButtonThreeProps && (
                      <Button
                        configContextProps={configContextProps}
                        gradient={gradient}
                        shape={ButtonShape.Round}
                        theme={theme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Neutral}
                        {...actionButtonThreeProps}
                      />
                    )}
                    {actionButtonTwoProps && (
                      <Button
                        configContextProps={configContextProps}
                        gradient={gradient}
                        shape={ButtonShape.Round}
                        theme={theme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Neutral}
                        {...actionButtonTwoProps}
                      />
                    )}
                    {actionButtonOneProps && (
                      <Button
                        configContextProps={configContextProps}
                        gradient={gradient}
                        shape={ButtonShape.Round}
                        theme={theme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Neutral}
                        {...actionButtonOneProps}
                      />
                    )}
                    {closable && (
                      <Button
                        ariaLabel={closeButtonAriaLabelText}
                        configContextProps={configContextProps}
                        gradient={gradient}
                        iconProps={{ path: closeIcon }}
                        onClick={onClose}
                        shape={ButtonShape.Round}
                        theme={theme}
                        themeContainerId={themeContainerId}
                        variant={ButtonVariant.Neutral}
                        {...closeButtonProps}
                      />
                    )}
                  </span>
                </div>
                <div ref={scrollRef} className={bodyClasses}>
                  {body}
                </div>
                {actions && <div className={actionsClasses}>{actions}</div>}
              </>
            )}
          </div>
        </FocusTrap>
      </NoFormStyle>
    );
    return <Portal getContainer={() => parent}>{getDialog()}</Portal>;
  }
);
