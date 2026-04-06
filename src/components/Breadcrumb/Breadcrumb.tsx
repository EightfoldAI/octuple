'use client';

import React, { FC, Ref, useContext, useEffect, useRef, useState } from 'react';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  BreadcrumbLinkProps,
  BreadcrumbLocale,
  BreadcrumbProps,
} from './Breadcrumb.types';
import { Dropdown } from '../Dropdown';
import { Icon, IconName, IconSize } from '../Icon';
import { Link } from '../Link';
import {
  Menu,
  MenuItemCustomProps,
  MenuItemLinkProps,
  MenuItemType,
  MenuSize,
} from '../Menu';
import { Stack } from '../Stack';
import { Tooltip, TooltipTheme } from '../Tooltip';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { useMaxVisibleSections } from '../../hooks/useMaxVisibleSections';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { mergeClasses } from '../../shared/utilities';
import enUS from './Locale/en_US';

import styles from './Styles/breadcrumb.module.scss';
import themedComponentStyles from './Styles/breadcrumb.theme.module.scss';

export const Breadcrumb: FC<BreadcrumbProps> = React.forwardRef(
  (props: BreadcrumbProps, ref: Ref<HTMLDivElement>) => {
    const {
      ariaLabel: defaultAriaLabel,
      classNames,
      configContextProps = {
        noThemeContext: false,
      },
      displayCurrent = true,
      divider = {
        path: IconName.mdiSlashForward,
      },
      id,
      linkClassNames,
      links,
      locale = enUS,
      maxDisplayedLinks: defaultMaxDisplayedLinks,
      overflowAriaLabel: defaultOverflowAriaLabel,
      style,
      theme,
      themeContainerId,
      'data-testid': dataTestId,
      ...rest
    } = props;
    const internalRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const crumbRefs: React.MutableRefObject<HTMLElement[]> = useRef<
      HTMLElement[]
    >([]);
    const mergedRef: (node: HTMLDivElement) => void = useMergedRefs(
      internalRef,
      ref
    );
    const htmlDir: string = useCanvasDirection();
    const maxSections = useMaxVisibleSections(internalRef, crumbRefs);
    const [maxDisplayedLinks, setMaxDisplayedLinks] = useState<
      number | boolean
    >(defaultMaxDisplayedLinks);

    useEffect(() => {
      setMaxDisplayedLinks(
        props.maxDisplayedLinks !== null ? props.maxDisplayedLinks : 3
      );
    }, [maxSections.count]);

    useEffect(() => {
      if (maxSections.count !== maxDisplayedLinks) {
        setMaxDisplayedLinks(maxSections.count);
      }
    }, [maxSections.count]);

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [breadcrumbLocale] = useLocaleReceiver('Breadcrumb');
    let mergedLocale: BreadcrumbLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = breadcrumbLocale || props.locale;
    }

    const [ariaLabel, setAriaLabel] = useState<string>(defaultAriaLabel);
    const [overflowAriaLabel, setOverflowAriaLabel] = useState<string>(
      defaultOverflowAriaLabel
    );

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setAriaLabel(
        props.ariaLabel ? props.ariaLabel : mergedLocale.lang!.ariaLabelText
      );
      setOverflowAriaLabel(
        props.overflowAriaLabel
          ? props.overflowAriaLabel
          : mergedLocale.lang!.overflowAriaLabelText
      );
    }, [mergedLocale]);

    const breadCrumbClassNames: string = mergeClasses([
      styles.breadcrumb,
      { [themedComponentStyles.theme]: mergedTheme },
      classNames,
      { [styles.breadcrumbRtl]: htmlDir === 'rtl' },
    ]);

    const linkClasses: string = mergeClasses([
      styles.breadcrumbLink,
      { [themedComponentStyles.theme]: mergedTheme },
      linkClassNames,
    ]);

    const getDivider = (item?: BreadcrumbLinkProps): JSX.Element => (
      <Icon
        path={divider?.path}
        rotate={htmlDir === 'rtl' ? 180 : 0}
        size={IconSize.Small}
        {...item?.divider}
      />
    );

    const getLinkMenu = (items: BreadcrumbLinkProps[]): JSX.Element => {
      const getItems = (): MenuItemLinkProps[] | MenuItemCustomProps[] => {
        return items.map((item?: BreadcrumbLinkProps, idx?: number) =>
          !!item.dropdownChildren
            ? {
                key: idx,
                render: () => item.dropdownChildren,
                text: `${item.title}`,
                type: MenuItemType.custom,
                value: item,
              }
            : {
                href: item.url,
                key: idx,
                text: `${item.title}`,
                type: MenuItemType.link,
                value: item,
              }
        );
      };
      return (
        <li key="breadcrumb-link-menu">
          <Stack direction="horizontal" flexGap="xxxs">
            <Dropdown
              overlay={
                <Menu
                  classNames={styles.breadcrumbDropdownLinkMenu}
                  items={getItems()}
                  itemClassNames={styles.breadcrumbDropdownLink}
                  size={MenuSize.small}
                />
              }
              portal
            >
              <span
                aria-label={overflowAriaLabel}
                className={mergeClasses([
                  linkClasses,
                  styles.breadcrumbListOverflowMenu,
                ])}
              >
                ...
              </span>
            </Dropdown>
            {getDivider()}
          </Stack>
        </li>
      );
    };

    const getCrumbs = (): React.ReactNode[] => {
      const crumbs: React.ReactNode[] = [];
      const deleteCount: number = !displayCurrent ? 1 : 0;
      const visibleLinks: BreadcrumbLinkProps[] = links?.slice(
        0,
        links?.length - deleteCount
      );

      visibleLinks?.forEach(
        (
          item: BreadcrumbLinkProps,
          idx: number,
          items: BreadcrumbLinkProps[]
        ) => {
          let crumb: React.ReactNode;

          if (item.readonly) {
            crumb = (
              <li
                key={item.title + '-' + idx}
                ref={(ref) => (crumbRefs.current[idx] = ref)}
              >
                <Stack direction="horizontal" flexGap="xxxs">
                  <Tooltip
                    disabled={!item.tooltipprops}
                    theme={TooltipTheme.dark}
                    {...item.tooltipprops}
                  >
                    <span
                      aria-current={item.ariaCurrent ? 'page' : null}
                      className={mergeClasses([
                        linkClasses,
                        styles.breadcrumbLinkReadOnly,
                        item.classNames,
                      ])}
                    >
                      {item?.customCrumb ? item.customCrumb : item.title}
                    </span>
                  </Tooltip>
                  {idx < items.length - 1 && getDivider(item)}
                </Stack>
              </li>
            );
          } else {
            crumb = (
              <li
                key={item.title + '-' + idx}
                ref={(ref) => (crumbRefs.current[idx] = ref)}
              >
                <Stack direction="horizontal" flexGap="xxxs">
                  <Tooltip
                    disabled={!item.tooltipprops}
                    theme={TooltipTheme.dark}
                    {...item.tooltipprops}
                  >
                    {!!item.children ? (
                      item.children
                    ) : (
                      <Link
                        aria-current={item.ariaCurrent ? 'page' : null}
                        variant="primary"
                        {...item}
                        classNames={mergeClasses([
                          linkClasses,
                          item.classNames,
                        ])}
                      >
                        {item?.customCrumb ? item.customCrumb : item.title}
                      </Link>
                    )}
                  </Tooltip>
                  {idx < items.length - 1 && getDivider(item)}
                </Stack>
              </li>
            );
          }

          crumbs.push(crumb);
        }
      );

      if (maxDisplayedLinks && crumbs.length > Number(maxDisplayedLinks)) {
        const deleteCount: number = crumbs.length - Number(maxDisplayedLinks);
        const linkMenuItems: BreadcrumbLinkProps[] = visibleLinks.slice(
          1,
          deleteCount + 1
        );
        const linkMenu: JSX.Element = getLinkMenu(linkMenuItems);

        crumbs.splice(1, deleteCount, linkMenu);
      }

      return crumbs;
    };

    return (
      <LocaleReceiver componentName={'Breadcrumb'} defaultLocale={enUS}>
        {(_contextLocale: BreadcrumbLocale) => {
          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <div
                {...rest}
                aria-label={ariaLabel}
                className={breadCrumbClassNames}
                data-testId={dataTestId}
                id={id}
                ref={mergedRef}
                role="navigation"
                style={style}
              >
                <ol className={styles.breadcrumbList}>{getCrumbs()}</ol>
              </div>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
