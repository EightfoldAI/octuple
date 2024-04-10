'use client';

import React, {
  FC,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  BUTTON_MENU_AFFORDANCE,
  BUTTON_PADDING,
  LINES_TO_SHOW,
  PersistentBarLocale,
  PersistentBarsProps,
  PersistentBarType,
} from './PersistentBar.types';
import {
  Button,
  ButtonProps,
  ButtonShape,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { Dropdown } from '../Dropdown';
import Grid from '../Grid';
import { IconName } from '../Icon';
import { Menu, MenuItemCustomProps, MenuItemType, MenuSize } from '../Menu';
import {
  PagerSizeOptions,
  Pagination,
  PaginationLayoutOptions,
} from '../Pagination';
import { Stack } from '../Stack';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMaxVisibleSections } from '../../hooks/useMaxVisibleSections';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { Breakpoint, mergeClasses } from '../../shared/utilities';
import enUS from './Locale/en_US';

import styles from './persistentBar.module.scss';
import themedComponentStyles from './persistentBar.theme.module.scss';

const { useBreakpoint } = Grid;

export const PersistentBar: FC<PersistentBarsProps> = React.forwardRef(
  (props: PersistentBarsProps, ref: Ref<HTMLDivElement>) => {
    const {
      buttonMenuProps,
      bordered = false,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      content,
      gradient = false,
      icon,
      type = PersistentBarType.bottomBarWithText,
      closable, // TODO: implement close support when vscode instances are updated
      children,
      onClose,
      style,
      classNames,
      closeIcon = IconName.mdiClose,
      closeButtonProps,
      actionButtonOneProps,
      actionButtonTwoProps,
      actionButtonThreeProps,
      role = 'toolbar',
      theme,
      themeContainerId,
      title,
      overflowAriaLabel: defaultOverflowAriaLabel,
      paginationArgs, // TODO: Remove in Octuple v3
      paginationProps,
      paginationTotal,
      ...rest
    } = props;
    const htmlDir: string = useCanvasDirection();
    const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();
    const internalRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const buttonRefs: React.MutableRefObject<HTMLElement[]> = useRef<
      HTMLElement[]
    >([]);
    const mergedRef: (node: HTMLDivElement) => void = useMergedRefs(
      internalRef,
      ref
    );
    const maxSections = useMaxVisibleSections(
      internalRef,
      buttonRefs,
      BUTTON_MENU_AFFORDANCE,
      BUTTON_PADDING,
      LINES_TO_SHOW,
      buttonMenuProps?.length
    );

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [persistentBarLocale] = useLocaleReceiver('PersistentBar');
    let mergedLocale: PersistentBarLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = persistentBarLocale || props.locale;
    }

    const [overflowAriaLabel, setOverflowAriaLabel] = useState<string>(
      defaultOverflowAriaLabel
    );

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect((): void => {
      setOverflowAriaLabel(
        props.overflowAriaLabel
          ? props.overflowAriaLabel
          : mergedLocale.lang!.overflowAriaLabelText
      );
    }, [mergedLocale]);

    const persistentBarClassNames: string = mergeClasses([
      styles.persistentBar,
      classNames,
      { [themedComponentStyles.theme]: mergedTheme },
      {
        [styles.bordered]: !!bordered,
      },
      {
        [styles.bottomWithText]: type === PersistentBarType.bottomBarWithText,
      },
      {
        [styles.bottomSecondaryButtons]:
          type === PersistentBarType.bottomBarSecondaryButtons,
      },
      {
        [styles.bottomLeftAlign]:
          type === PersistentBarType.bottomBarButtonsOnLeft,
      },
      {
        [styles.bottomRightAlign]:
          type === PersistentBarType.bottomBarButtonsOnRight,
      },
      {
        [styles.topButtonMenu]: type === PersistentBarType.topBarButtons,
      },
      { [styles.topWithText]: type === PersistentBarType.topBarWithText },
      {
        [styles.topPagination]: type === PersistentBarType.topBarPagination,
      },
      { [styles.persistentBarRtl]: htmlDir === 'rtl' },
    ]);

    const getIconName = (): IconName => {
      if (icon) {
        return icon;
      }
      switch (type) {
        case PersistentBarType.topBarWithText:
          return htmlDir === 'rtl'
            ? IconName.mdiArrowRight
            : IconName.mdiArrowLeft;
        default:
          return null;
      }
    };

    const getContent = (): ReactNode => {
      switch (type) {
        case PersistentBarType.bottomBarWithText:
        case PersistentBarType.topBarWithText:
          return (
            <div>
              <h4>{title}</h4>
              <div className={styles.content}>{content}</div>
            </div>
          );
        default:
          return null;
      }
    };

    const getPersistentBarLayout = (): ReactNode => {
      const breakPoints: string[] = Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0]);
      const smallScreens: boolean = !breakPoints.includes('md');
      const xSmallScreens: boolean = !breakPoints.includes('sm');

      switch (type) {
        case PersistentBarType.bottomBarWithText:
          if (breakPoints.length && xSmallScreens) {
            return (
              <Stack
                direction="vertical"
                flexGap="m"
                fullWidth
                justify="space-between"
              >
                {getContent()}
                {actionButtonTwoProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={
                      mergedGradient
                        ? ButtonVariant.Secondary
                        : ButtonVariant.Default
                    }
                    {...actionButtonTwoProps}
                    classNames={styles.defaultButton}
                  />
                )}
                {actionButtonOneProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Primary}
                    {...actionButtonOneProps}
                  />
                )}
              </Stack>
            );
          }
          return (
            <>
              {getContent()}
              <div>
                {actionButtonTwoProps && (
                  <Button
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={
                      mergedGradient
                        ? ButtonVariant.Secondary
                        : ButtonVariant.Default
                    }
                    {...actionButtonTwoProps}
                    classNames={styles.defaultButton}
                  />
                )}
                {actionButtonOneProps && (
                  <Button
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Primary}
                    {...actionButtonOneProps}
                  />
                )}
              </div>
            </>
          );
        case PersistentBarType.bottomBarSecondaryButtons:
          if (breakPoints.length && xSmallScreens) {
            return (
              <Stack
                direction="vertical"
                flexGap="m"
                fullWidth
                justify="space-between"
              >
                {actionButtonOneProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Secondary}
                    {...actionButtonOneProps}
                  />
                )}
                {actionButtonTwoProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Secondary}
                    {...actionButtonTwoProps}
                  />
                )}
                {actionButtonThreeProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Secondary}
                    {...actionButtonThreeProps}
                  />
                )}
              </Stack>
            );
          }

          return (
            <>
              {actionButtonOneProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={ButtonVariant.Secondary}
                  {...actionButtonOneProps}
                />
              )}
              {actionButtonTwoProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={ButtonVariant.Secondary}
                  {...actionButtonTwoProps}
                />
              )}
              {actionButtonThreeProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={ButtonVariant.Secondary}
                  {...actionButtonThreeProps}
                />
              )}
            </>
          );
        case PersistentBarType.bottomBarButtonsOnLeft:
        case PersistentBarType.bottomBarButtonsOnRight:
          if (breakPoints.length && xSmallScreens) {
            return (
              <Stack
                direction="vertical"
                flexGap="m"
                fullWidth
                justify="space-between"
              >
                {actionButtonOneProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={
                      mergedGradient
                        ? ButtonVariant.Secondary
                        : ButtonVariant.Default
                    }
                    {...actionButtonOneProps}
                  />
                )}
                {actionButtonTwoProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={
                      mergedGradient
                        ? ButtonVariant.Secondary
                        : ButtonVariant.Default
                    }
                    {...actionButtonTwoProps}
                  />
                )}
                {actionButtonThreeProps && (
                  <Button
                    buttonWidth={ButtonWidth.fill}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Primary}
                    {...actionButtonThreeProps}
                  />
                )}
              </Stack>
            );
          }

          return (
            <>
              {actionButtonOneProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={
                    mergedGradient
                      ? ButtonVariant.Secondary
                      : ButtonVariant.Default
                  }
                  {...actionButtonOneProps}
                />
              )}
              {actionButtonTwoProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={
                    mergedGradient
                      ? ButtonVariant.Secondary
                      : ButtonVariant.Default
                  }
                  {...actionButtonTwoProps}
                />
              )}
              {actionButtonThreeProps && (
                <Button
                  configContextProps={configContextProps}
                  gradient={mergedGradient}
                  theme={mergedTheme}
                  themeContainerId={themeContainerId}
                  variant={ButtonVariant.Primary}
                  {...actionButtonThreeProps}
                />
              )}
            </>
          );
        case PersistentBarType.topBarWithText:
          if (breakPoints.length && xSmallScreens) {
            return (
              <Stack direction="vertical" fullWidth justify="space-between">
                <Stack direction="horizontal" fullWidth justify="space-between">
                  <Button
                    classNames={styles.iconButton}
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    iconProps={{ path: getIconName() }}
                    shape={ButtonShape.Round}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.SystemUI}
                    {...actionButtonOneProps}
                  />
                  <Pagination
                    configContextProps={configContextProps}
                    gradient={mergedGradient}
                    layout={[
                      PaginationLayoutOptions.Previous,
                      PaginationLayoutOptions.Pager,
                      PaginationLayoutOptions.Next,
                      PaginationLayoutOptions.Simplified,
                    ]}
                    theme={mergedTheme}
                    themeContainerId={themeContainerId}
                    total={paginationTotal}
                    {...paginationArgs}
                    {...paginationProps}
                  />
                </Stack>
                {getContent()}
              </Stack>
            );
          }

          return (
            <Stack
              direction="horizontal"
              flexGap="m"
              fullWidth
              justify="space-between"
            >
              <Button
                configContextProps={configContextProps}
                gradient={mergedGradient}
                classNames={styles.iconButton}
                iconProps={{ path: getIconName() }}
                shape={ButtonShape.Round}
                theme={mergedTheme}
                themeContainerId={themeContainerId}
                variant={ButtonVariant.SystemUI}
                {...actionButtonOneProps}
              />
              {getContent()}
              <Pagination
                configContextProps={configContextProps}
                gradient={mergedGradient}
                layout={[
                  PaginationLayoutOptions.Previous,
                  PaginationLayoutOptions.Pager,
                  PaginationLayoutOptions.Next,
                  PaginationLayoutOptions.Simplified,
                ]}
                theme={mergedTheme}
                themeContainerId={themeContainerId}
                total={paginationTotal}
                {...paginationArgs}
                {...paginationProps}
              />
            </Stack>
          );
        case PersistentBarType.topBarPagination:
          return (
            <Pagination
              configContextProps={configContextProps}
              gradient={mergedGradient}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              total={paginationTotal}
              {...paginationArgs}
              {...paginationProps}
              classNames={
                breakPoints.length && xSmallScreens
                  ? styles.persistentBarPaginationXsmall
                  : ''
              }
              pagerSize={
                breakPoints.length && smallScreens
                  ? PagerSizeOptions.Small
                  : PagerSizeOptions.Medium
              }
            />
          );
        default:
          return null;
      }
    };

    const getButtonMenu = (buttonMenuProps: ButtonProps[]): JSX.Element => {
      const getItems = (): MenuItemCustomProps[] => {
        return buttonMenuProps?.map((button?: ButtonProps, idx?: number) => ({
          classNames: styles.persistentBarMenuItem,
          render: () => (
            <Button
              buttonWidth={ButtonWidth.fill}
              configContextProps={configContextProps}
              gradient={mergedGradient}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Secondary}
              {...button}
              iconProps={{ ...button.iconProps }}
              key={'buttonMenuItem-' + idx}
              shape={ButtonShape.Pill}
              text={
                !!button.iconProps && !button.text
                  ? `${button.ariaLabel}`
                  : `${button.text}`
              }
            />
          ),
          type: MenuItemType.custom,
        }));
      };

      return (
        <li key="button-menu">
          <Dropdown
            overlay={<Menu items={getItems()} size={MenuSize.small} />}
            portal
          >
            <Button
              ariaLabel={overflowAriaLabel}
              configContextProps={configContextProps}
              gradient={mergedGradient}
              iconProps={{ path: IconName.mdiDotsVertical }}
              shape={ButtonShape.Round}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.Secondary}
            />
          </Dropdown>
        </li>
      );
    };

    const getButtons = (): ReactNode => {
      const maxSectionsCount: number = maxSections.count;

      let buttons: React.ReactElement[] = [];

      buttonMenuProps?.forEach((item: ButtonProps, idx: number) => {
        const button: JSX.Element = (
          <li
            className={mergeClasses([
              styles.persistentBarListItem,
              { [styles.visuallyHidden]: idx >= maxSectionsCount },
            ])}
            key={'buttonItem-' + idx}
            ref={(ref) => (buttonRefs.current[idx] = ref)}
          >
            <Button
              configContextProps={configContextProps}
              gradient={mergedGradient}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              {...item}
            />
          </li>
        );

        buttons.push(button);

        if (buttons.length === maxSectionsCount && maxSections.filled) {
          const buttonMenuItems: Array<ButtonProps> =
            buttonMenuProps?.slice(maxSectionsCount);
          buttons.push(getButtonMenu(buttonMenuItems));
        }
      });

      return <>{buttons}</>;
    };

    return (
      <LocaleReceiver componentName={'PersistentBar'} defaultLocale={enUS}>
        {(_contextLocale: PersistentBarLocale) => {
          if (children) {
            return (
              <ThemeContextProvider
                componentClassName={themedComponentStyles.theme}
                containerId={themeContainerId}
                theme={mergedTheme}
              >
                <div
                  {...rest}
                  className={persistentBarClassNames}
                  ref={ref}
                  style={style}
                  role={role}
                >
                  {children}
                </div>
              </ThemeContextProvider>
            );
          }

          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <div
                {...rest}
                className={persistentBarClassNames}
                ref={mergedRef}
                style={style}
                role={role}
              >
                {buttonMenuProps && (
                  <ul className={styles.persistentBarList}>{getButtons()}</ul>
                )}
                {getPersistentBarLayout()}
              </div>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
