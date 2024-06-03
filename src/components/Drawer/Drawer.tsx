import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import { DrawerLocale, DrawerProps, DrawerVariant } from './';
import { defaultSnapBreakPoints, hintSnapBreakPoints } from './';
import { ANIMATION_DURATION, useDrawer } from './';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { Portal } from '../Portal';
import { FocusTrap } from '../../shared/FocusTrap';
import { NoFormStyle } from '../Form/Context';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useScrollShadow } from '../../hooks/useScrollShadows';
import {
  eventKeys,
  mergeClasses,
  stopPropagation,
} from '../../shared/utilities';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './drawer.module.scss';
import themedComponentStyles from './drawer.theme.module.scss';

export const Drawer: FC<DrawerProps> = React.forwardRef(
  (props: DrawerProps, ref: Ref<HTMLDivElement>) => {
    const {
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      autoFocus = true,
      bodyClassNames,
      bodyPadding = true,
      children,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      draggerAriaLabelText: defaultDraggerAriaLabelText,
      firstFocusableSelector,
      footer,
      footerClassNames,
      gradient = false,
      headerClassNames,
      headerPadding = true,
      height,
      initialPlacement = 0,
      lastFocusableSelector,
      locale = enUS,
      onClose = () => {},
      onDraggerClick,
      onDraggerKeyDown,
      onVisibleChange,
      draggerProps,
      drawerClassNames,
      drawerStyle,
      drawerWrapperClassNames,
      parent = typeof document !== 'undefined' ? document.body : null,
      renderContentAlways = true,
      skipFocusableSelectorsFromIndex,
      theme,
      themeContainerId,
      title,
      visible = false,
      drawerHeader,
      scrollLock = true,
      snapBreakPoints,
      subTitle,
      focusTrap = true,
      zIndex,
      variant = DrawerVariant.Default,
      maskClosable = true,
      overlay = true,
      ...rest
    } = props;

    const bodyRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const containerRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const draggerRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);

    const getSnapBreakPoints = (): {
      breakpoint: number;
      position: {
        top: string;
      };
    }[] => {
      let snapBreakPoints: {
        breakpoint: number;
        position: {
          top: string;
        };
      }[] = props.snapBreakPoints;
      if (variant === DrawerVariant.Hint && !snapBreakPoints) {
        snapBreakPoints = hintSnapBreakPoints;
      } else if (variant === DrawerVariant.Default && !snapBreakPoints) {
        snapBreakPoints = defaultSnapBreakPoints;
      }
      return snapBreakPoints;
    };

    const [internal, setInternal] = useState<boolean>(false);

    const drawer = useDrawer({
      initialPlacement: initialPlacement,
      initialVisibility: visible,
      snapBreakPoints: getSnapBreakPoints(),
    });

    const mergedRef: (node: HTMLDivElement) => void = useMergedRefs(
      drawer?.drawerRef,
      ref
    );

    useScrollLock(parent, !scrollLock ? false : drawer?.drawerVisible);
    const { showBottomShadow, showTopShadow, scrollRef } =
      useScrollShadow(bodyRef);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [drawerLocale] = useLocaleReceiver('Drawer');
    let mergedLocale: DrawerLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = drawerLocale || props.locale;
    }

    const [draggerAriaLabelText, setDraggerAriaLabelText] = useState<string>(
      defaultDraggerAriaLabelText
    );

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setDraggerAriaLabelText(
        props.draggerAriaLabelText
          ? props.draggerAriaLabelText
          : mergedLocale.lang!.draggerAriaLabelText
      );
    }, [mergedLocale]);

    const drawerBackdropClasses: string = mergeClasses([
      styles.drawerBackdrop,
      drawerWrapperClassNames,
      { [styles.expand]: drawer?.drawerLevel > 0 },
      { [styles.visible]: drawer?.drawerVisible },
      { [styles.modeless]: overlay === false },
      { [styles.modelessMask]: overlay === false && maskClosable },
    ]);

    const drawerClasses: string = mergeClasses([
      styles.drawer,
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.noBodyPadding]: bodyPadding === false },
      { [styles.noHeaderPadding]: headerPadding === false },
      drawerClassNames,
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

    const footerClasses: string = mergeClasses([
      styles.footer,
      footerClassNames,
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      headerClassNames,
    ]);

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const toggleDrawerVisibility = (isVisible: boolean): void => {
      drawer?.setDrawerVisibility(isVisible);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        onVisibleChange?.(isVisible);
        if (autoFocus && isVisible) {
          containerRef.current?.focus();
        }
        setInternal(false);
      }, ANIMATION_DURATION);
    };

    const stepDrawerLevel = async (
      isVisible: boolean = true
    ): Promise<void> => {
      if (!isVisible) {
        drawer?.setDrawerLevel(0);
        onClose?.();
        return;
      }
      const snapBreakPoints = getSnapBreakPoints();
      if (
        drawer?.isSnapped ===
        snapBreakPoints?.[snapBreakPoints?.length - 1]?.position
      ) {
        drawer?.setDrawerLevel(0);
        onClose?.();
      } else {
        drawer?.setDrawerLevel(snapBreakPoints?.length - 1);
      }
    };

    useEffect(() => {
      if (internal) {
        return;
      }
      stepDrawerLevel(visible);
      toggleDrawerVisibility(visible);
      if (!visible) {
        onClose?.();
      }
    }, [visible]);

    const handleDraggerClick = async (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): Promise<void> => {
      onDraggerClick?.(event);
      if (!drawer?.drawerVisible) {
        await stepDrawerLevel();
      } else {
        await stepDrawerLevel(false);
      }
      setInternal(true);
      toggleDrawerVisibility(!drawer?.drawerVisible);
    };

    const handleMaskClick = async (
      _event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): Promise<void> => {
      await stepDrawerLevel(false);
      setInternal(true);
      toggleDrawerVisibility(false);
    };

    const handleDraggerKeyDown = async (
      event: React.KeyboardEvent<HTMLDivElement>
    ): Promise<void> => {
      if ([eventKeys.ENTER, eventKeys.SPACE, ' '].includes(event?.key)) {
        onDraggerKeyDown?.(event);
        await stepDrawerLevel();
        setInternal(true);
        toggleDrawerVisibility(!drawer?.drawerVisible);
      }
    };

    const getDefaultHeader = (): JSX.Element => (
      <div className={headerClasses}>
        {title && <div className={styles.headerTitle}>{title}</div>}
        {subTitle && <div className={styles.headerSubTitle}>{subTitle}</div>}
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
        </span>
      </div>
    );

    const getHeader = (): JSX.Element => {
      if (!!drawerHeader) return drawerHeader;
      return getDefaultHeader();
    };

    const getBody = (): JSX.Element => (
      <div ref={scrollRef} className={bodyClasses}>
        {children}
      </div>
    );

    const getFooter = (): JSX.Element => (
      <div className={footerClasses}>{footer}</div>
    );

    const getDrawerStyle = (): React.CSSProperties => ({
      zIndex,
      ...(Object.keys(drawerStyle || {}).length > 0
        ? drawerStyle
        : drawer?.drawerStyle),
      height,
    });

    const getDrawer = (): JSX.Element => {
      return (
        <LocaleReceiver componentName={'Drawer'} defaultLocale={enUS}>
          {(_contextLocale: DrawerLocale) => {
            return (
              <NoFormStyle status override>
                <FocusTrap
                  firstFocusableSelector={firstFocusableSelector}
                  lastFocusableSelector={lastFocusableSelector}
                  skipFocusableSelectorsFromIndex={
                    skipFocusableSelectorsFromIndex
                  }
                  trap={drawer?.drawerVisible && focusTrap}
                  {...rest}
                  ref={containerRef}
                  classNames={drawerBackdropClasses}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    if (maskClosable && drawer?.drawerVisible) {
                      handleMaskClick(event);
                    }
                  }}
                  aria-hidden={!drawer?.drawerVisible}
                >
                  <ThemeContextProvider
                    componentClassName={themedComponentStyles.theme}
                    containerId={themeContainerId}
                    theme={mergedTheme}
                  >
                    <div
                      ref={mergedRef}
                      className={drawerClasses}
                      onClick={stopPropagation}
                      style={getDrawerStyle()}
                    >
                      <div
                        aria-label={draggerAriaLabelText}
                        className={styles.dragger}
                        draggable="true"
                        onClick={(
                          event: React.MouseEvent<HTMLDivElement, MouseEvent>
                        ) => handleDraggerClick(event)}
                        onKeyDown={(
                          event: React.KeyboardEvent<HTMLDivElement>
                        ) => handleDraggerKeyDown(event)}
                        ref={draggerRef}
                        role="button"
                        tabIndex={0}
                        {...(draggerProps || { ...drawer?.draggerProps })}
                        onDragEnd={async (): Promise<void> => {
                          await stepDrawerLevel();
                          const snapBreakPoints = getSnapBreakPoints();
                          const dragToCloseBuffer: number = 80;
                          if (
                            drawer?.drawerRef.current.getBoundingClientRect()
                              .top -
                              dragToCloseBuffer >
                            parseInt(snapBreakPoints?.[1]?.position.top, 10)
                          ) {
                            setInternal(true);
                            toggleDrawerVisibility(false);
                            onClose?.();
                          } else {
                            setInternal(true);
                            toggleDrawerVisibility(true);
                          }
                          if (draggerProps?.onDragEnd) {
                            draggerProps.onDragEnd();
                            return;
                          }
                          drawer?.draggerProps.onDragEnd();
                        }}
                        onTouchEnd={async (): Promise<void> => {
                          await stepDrawerLevel();
                          const snapBreakPoints = getSnapBreakPoints();
                          const touchToCloseBuffer: number = 80;
                          if (
                            drawer?.drawerRef.current.getBoundingClientRect()
                              .top -
                              touchToCloseBuffer >
                            parseInt(snapBreakPoints?.[1]?.position.top, 10)
                          ) {
                            setInternal(true);
                            toggleDrawerVisibility(false);
                            onClose?.();
                          } else {
                            setInternal(true);
                            toggleDrawerVisibility(true);
                          }
                          if (draggerProps?.onTouchEnd) {
                            draggerProps.onTouchEnd();
                            return;
                          }
                          drawer?.draggerProps.onTouchEnd();
                        }}
                      >
                        <div className={styles.handle} />
                      </div>
                      {renderContentAlways && (
                        <div className={styles.content}>
                          {getHeader()}
                          {getBody()}
                          {!!footer && getFooter()}
                        </div>
                      )}
                    </div>
                  </ThemeContextProvider>
                </FocusTrap>
              </NoFormStyle>
            );
          }}
        </LocaleReceiver>
      );
    };

    return <Portal getContainer={() => parent}>{getDrawer()}</Portal>;
  }
);
