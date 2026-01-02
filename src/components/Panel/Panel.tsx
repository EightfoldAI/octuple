'use client';

import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { PanelLocale, PanelProps, PanelRef, PanelSize } from './Panel.types';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { Portal } from '../Portal';
import { FocusTrap } from '../../shared/FocusTrap';
import { useFeatureFlags } from '../ConfigProvider/FeatureFlagProvider';
import { NoFormStyle } from '../Form/Context';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useScrollLock } from '../../hooks/useScrollLock';
import {
  mergeClasses,
  stopPropagation,
  canUseDocElement,
  eventKeys,
} from '../../shared/utilities';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './panel.module.scss';
import themedComponentStyles from './panel.theme.module.scss';

const PanelContext = React.createContext<PanelRef | null>(null);

const PANEL_WIDTHS: Record<PanelSize, number> = Object.freeze({
  small: 480,
  medium: 640,
  large: 860,
});

export const Panel = React.forwardRef<PanelRef, PanelProps>(
  (props: PanelProps, ref: React.ForwardedRef<PanelRef>) => {
    const {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      autoFocus = true,
      bodyClassNames,
      bodyPadding = true,
      children,
      closable = true,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      firstFocusableSelector,
      footer,
      footerClassNames,
      gradient = false,
      headerButtonProps,
      headerClassNames,
      headerIcon = IconName.mdiArrowLeftThick,
      headerPadding = true,
      height,
      lastFocusableSelector,
      locale = enUS,
      maskClosable = true,
      onClose = () => {},
      onVisibleChange,
      overlay = true,
      zIndex,
      panelClassNames,
      panelStyle,
      panelWrapperClassNames,
      parent = typeof document !== 'undefined' ? document.body : null,
      placement = 'right',
      push = true,
      renderContentAlways = true,
      size = PanelSize.medium,
      skipFocusableSelectorsFromIndex,
      title,
      visible = false,
      width,
      panelHeader,
      scrollLock = true,
      theme,
      themeContainerId,
      focusTrap = true,
      escapeTargetSelector = '[role="listbox"], [role="menu"], [role="tooltip"], .dropdown-wrapper, .tooltip-wrapper',
      ...rest
    } = props;

    const htmlDir: string = useCanvasDirection();

    const panelRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const parentPanel = useContext<PanelRef>(PanelContext);
    const [internalPush, setPush] = useState<boolean>(false);

    useScrollLock(parent, !scrollLock ? false : visible);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [panelLocale] = useLocaleReceiver('Panel');
    let mergedLocale: PanelLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = panelLocale || props.locale;
    }

    const { panelLazyLoadContent } = useFeatureFlags();
    const renderContent = panelLazyLoadContent ? visible : renderContentAlways;

    const [closeButtonAriaLabelText, setCloseButtonAriaLabelText] =
      useState<string>(defaultCloseButtonAriaLabelText);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCloseButtonAriaLabelText(
        props.closeButtonAriaLabelText
          ? props.closeButtonAriaLabelText
          : mergedLocale.lang!.closeButtonAriaLabelText
      );
    }, [mergedLocale]);

    const panelBackdropClasses: string = mergeClasses([
      styles.panelBackdrop,
      panelWrapperClassNames,
      { [styles.visible]: visible },
      { [styles.modeless]: overlay === false },
      { [styles.modelessMask]: overlay === false && maskClosable },
      { [styles.panelBackdropRtl]: htmlDir === 'rtl' },
    ]);

    const panelClasses: string = mergeClasses([
      styles.panel,
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.noBodyPadding]: bodyPadding === false },
      { [styles.noHeaderPadding]: headerPadding === false },
      panelClassNames,
      { [styles.right]: placement === 'right' },
      { [styles.left]: placement === 'left' },
      { [styles.bottom]: placement === 'bottom' },
      { [styles.top]: placement === 'top' },
      { [styles.large]: size === PanelSize.large },
      { [styles.medium]: size === PanelSize.medium },
      { [styles.small]: size === PanelSize.small },
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const footerClasses: string = mergeClasses([
      styles.footer,
      footerClassNames,
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    useEffect(() => {
      if (parentPanel) {
        if (visible) {
          parentPanel.push();
        } else {
          parentPanel.pull();
        }
      }
      if (autoFocus) {
        setTimeout(() => {
          containerRef.current?.focus();
        }, 200);
      }
      onVisibleChange?.(visible);
    }, [visible]);

    const handleGlobalEscape = (event: KeyboardEvent) => {
      if (!canUseDocElement() || !visible) {
        return;
      }

      if (event.key === eventKeys.ESCAPE) {
        if (
          panelRef.current &&
          panelRef.current.contains(event.target as Node)
        ) {
          const target = event.target as HTMLElement;
          const isNestedComponent = target.closest(escapeTargetSelector);

          if (!isNestedComponent) {
            onClose(event as any);
          }
        }
      }
    };

    useEffect(() => {
      document.addEventListener('keydown', handleGlobalEscape, true);

      return () => {
        document.removeEventListener('keydown', handleGlobalEscape, true);
      };
    }, [visible, onClose, escapeTargetSelector]);

    const getDefaultHeader = (): JSX.Element => (
      <div className={headerClasses}>
        <div>
          {headerButtonProps && (
            <Button
              classNames={styles.headerButton}
              configContextProps={configContextProps}
              gradient={mergedGradient}
              iconProps={{
                path: headerIcon,
              }}
              style={{
                transform: htmlDir === 'rtl' ? 'rotate(180deg)' : 'none',
              }}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              {...headerButtonProps}
            />
          )}
          {title}
        </div>
        <span className={styles.headerButtons}>
          {actionButtonThreeProps && (
            <Button
              configContextProps={configContextProps}
              gradient={mergedGradient}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              {...actionButtonThreeProps}
            />
          )}
          {actionButtonTwoProps && (
            <Button
              configContextProps={configContextProps}
              gradient={mergedGradient}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              {...actionButtonTwoProps}
            />
          )}
          {actionButtonOneProps && (
            <Button
              configContextProps={configContextProps}
              gradient={mergedGradient}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              {...actionButtonOneProps}
            />
          )}
          {closable && (
            <Button
              configContextProps={configContextProps}
              gradient={mergedGradient}
              iconProps={{ path: closeIcon }}
              ariaLabel={closeButtonAriaLabelText}
              onClick={onClose}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Neutral}
              {...closeButtonProps}
            />
          )}
        </span>
      </div>
    );

    const getHeader = (): JSX.Element => {
      if (!!panelHeader) return panelHeader;
      return getDefaultHeader();
    };

    const getBody = (): JSX.Element => (
      <div className={bodyClasses}>{children}</div>
    );

    const getFooter = (): JSX.Element => (
      <div className={footerClasses}>{footer}</div>
    );

    const getPushTransform = (): React.CSSProperties => {
      const panelWidth: number = width || PANEL_WIDTHS[size];
      let distance: number = visible ? 0 : panelWidth;

      if (internalPush) {
        distance -= panelWidth / 3;
      }

      if (['left', 'right'].includes(placement)) {
        if (htmlDir === 'rtl') {
          return {
            transform: `translateX(${
              placement === 'right' ? -distance : distance
            }px)`,
          };
        } else {
          return {
            transform: `translateX(${
              placement === 'left' ? -distance : distance
            }px)`,
          };
        }
      } else if (['top', 'bottom'].includes(placement)) {
        return {
          transform: `translateY(${
            placement === 'top' ? -distance : distance
          }px)`,
        };
      }
      return {};
    };

    const getPanelStyle = (): React.CSSProperties => ({
      zIndex,
      ...getPushTransform(),
      ...panelStyle,
      height,
      width,
    });

    const operations = React.useMemo(
      () => ({
        push() {
          push && setPush(true);
        },
        pull() {
          push && setPush(false);
        },
      }),
      [push]
    );

    useImperativeHandle(ref, () => operations);

    const getPanel = (): JSX.Element => {
      return (
        <LocaleReceiver componentName={'Panel'} defaultLocale={enUS}>
          {(_contextLocale: PanelLocale) => {
            return (
              <PanelContext.Provider value={operations}>
                <NoFormStyle status override>
                  <FocusTrap
                    firstFocusableSelector={firstFocusableSelector}
                    lastFocusableSelector={lastFocusableSelector}
                    skipFocusableSelectorsFromIndex={
                      skipFocusableSelectorsFromIndex
                    }
                    trap={visible && focusTrap}
                    {...rest}
                    ref={containerRef}
                    classNames={panelBackdropClasses}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      maskClosable && onClose(e);
                    }}
                    aria-hidden={!visible}
                  >
                    <ThemeContextProvider
                      componentClassName={themedComponentStyles.theme}
                      containerId={themeContainerId}
                      theme={mergedTheme}
                    >
                      <div
                        ref={panelRef}
                        role="dialog"
                        aria-modal={true}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        className={panelClasses}
                        onClick={stopPropagation}
                        style={getPanelStyle()}
                      >
                        {renderContent && (
                          <>
                            {getHeader()}
                            {getBody()}
                            {!!footer && getFooter()}
                          </>
                        )}
                      </div>
                    </ThemeContextProvider>
                  </FocusTrap>
                </NoFormStyle>
              </PanelContext.Provider>
            );
          }}
        </LocaleReceiver>
      );
    };

    return <Portal getContainer={() => parent}>{getPanel()}</Portal>;
  }
);
