import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { mergeClasses, stopPropagation } from '../../shared/utilities';
import { PanelLocale, PanelProps, PanelRef, PanelSize } from './';
import { IconName } from '../Icon';
import { ButtonShape, NeutralButton } from '../Button';
import { Portal } from '../Portal';
import { useScrollLock } from '../../hooks/useScrollLock';
import { FocusTrap } from '../../shared/FocusTrap';
import { NoFormStyle } from '../Form/Context';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './panel.module.scss';

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
      autoFocus = true,
      bodyClassNames,
      bodyPadding = true,
      headerPadding = true,
      children,
      closable = true,
      closeButtonAriaLabelText: defaultCloseButtonAriaLabelText,
      closeButtonProps,
      closeIcon = IconName.mdiClose,
      footer,
      footerClassNames,
      headerButtonProps,
      headerClassNames,
      headerIcon = IconName.mdiArrowLeftThick,
      height,
      locale = enUS,
      maskClosable = true,
      onClose = () => {},
      onVisibleChange,
      overlay = true,
      zIndex,
      panelClassNames,
      panelStyle,
      panelWrapperClassNames,
      parent = document.body,
      placement = 'right',
      push = true,
      size = PanelSize.medium,
      title,
      visible = false,
      width,
      panelHeader,
      scrollLock = true,
      focusTrap = true,
      ...rest
    } = props;

    const htmlDir: string = useCanvasDirection();

    const panelRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const parentPanel = useContext<PanelRef>(PanelContext);
    const [internalPush, setPush] = useState<boolean>(false);

    useScrollLock(parent, !scrollLock ? false : visible);

    // ============================ Strings ===========================
    const [panelLocale] = useLocaleReceiver('Panel');
    let mergedLocale: PanelLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = panelLocale || props.locale;
    }

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

    const getDefaultHeader = (): JSX.Element => (
      <div className={headerClasses}>
        <div>
          {headerButtonProps && (
            <NeutralButton
              classNames={styles.headerButton}
              iconProps={{
                path: headerIcon,
              }}
              style={{
                transform: htmlDir === 'rtl' ? 'rotate(180deg)' : 'none',
              }}
              shape={ButtonShape.Round}
              {...headerButtonProps}
            />
          )}
          {title}
        </div>
        <span className={styles.headerButtons}>
          {actionButtonThreeProps && (
            <NeutralButton
              shape={ButtonShape.Round}
              {...actionButtonThreeProps}
            />
          )}
          {actionButtonTwoProps && (
            <NeutralButton
              shape={ButtonShape.Round}
              {...actionButtonTwoProps}
            />
          )}
          {actionButtonOneProps && (
            <NeutralButton
              shape={ButtonShape.Round}
              {...actionButtonOneProps}
            />
          )}
          {closable && (
            <NeutralButton
              iconProps={{ path: closeIcon }}
              ariaLabel={closeButtonAriaLabelText}
              onClick={onClose}
              shape={ButtonShape.Round}
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
                    trap={visible && focusTrap}
                    {...rest}
                    ref={containerRef}
                    classNames={panelBackdropClasses}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      maskClosable && onClose(e);
                    }}
                    aria-hidden={!visible}
                  >
                    <div
                      ref={panelRef}
                      className={panelClasses}
                      onClick={stopPropagation}
                      style={getPanelStyle()}
                    >
                      {getHeader()}
                      {getBody()}
                      {!!footer && getFooter()}
                    </div>
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
