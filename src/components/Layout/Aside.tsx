import React, {
  Ref,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AsideContext,
  AsideProps,
  CollapseType,
  LayoutContext,
} from './Layout.types';
import { Icon, IconName, IconSize } from '../Icon';
import {
  canUseDom,
  generateId,
  isNumeric,
  mergeClasses,
  omit,
} from '../../shared/utilities';

import styles from './layout.module.scss';

const dimensionMaxMap = {
  xs: '0',
  sm: '599.98px',
  md: '899.98px',
  lg: '1199.98px',
};

export const Aside = React.forwardRef<HTMLDivElement, AsideProps>(
  (
    {
      breakpoint,
      defaultCollapsed = false,
      children,
      classNames,
      collapsedWidth = 80,
      collapsible = false,
      onCollapse,
      onBreakpoint,
      trigger,
      reverseArrow = false,
      style = {},
      width = 200,
      zeroWidthTriggerStyle,
      ...props
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const { asideHook } = useContext(LayoutContext);

    const [collapsed, setCollapsed] = useState(
      'collapsed' in props ? props.collapsed : defaultCollapsed
    );
    const [below, setBelow] = useState(false);

    useEffect(() => {
      if ('collapsed' in props) {
        setCollapsed(props.collapsed);
      }
    }, [props.collapsed]);

    const handleSetCollapsed = (value: boolean, type: CollapseType): void => {
      if (!('collapsed' in props)) {
        setCollapsed(value);
      }
      onCollapse?.(value, type);
    };

    const responsiveHandlerRef =
      useRef<(mql: MediaQueryListEvent | MediaQueryList) => void>();

    responsiveHandlerRef.current = (
      mql: MediaQueryListEvent | MediaQueryList
    ) => {
      setBelow(mql.matches);
      onBreakpoint?.(mql.matches);

      if (collapsed !== mql.matches) {
        handleSetCollapsed(mql.matches, 'responsive');
      }
    };

    useEffect(() => {
      function responsiveHandler(
        mql: MediaQueryListEvent | MediaQueryList
      ): void {
        return responsiveHandlerRef.current!(mql);
      }

      let mql: MediaQueryList;

      if (canUseDom()) {
        const { matchMedia } = window;
        if (matchMedia! && breakpoint && breakpoint in dimensionMaxMap) {
          mql = matchMedia(
            `(max-width: ${(dimensionMaxMap as any)[breakpoint]})`
          );
          try {
            mql.addEventListener('change', responsiveHandler);
          } catch (error) {
            mql.addListener(responsiveHandler);
          }
          responsiveHandler(mql);
        }
      }
      return () => {
        try {
          mql?.removeEventListener('change', responsiveHandler);
        } catch (error) {
          mql?.removeListener(responsiveHandler);
        }
      };
    }, [breakpoint]);

    useEffect(() => {
      const uniqueId = generateId('oc-aside-');
      asideHook.addAside(uniqueId);
      return () => asideHook.removeAside(uniqueId);
    }, []);

    const toggle = () => {
      handleSetCollapsed(!collapsed, 'clickTrigger');
    };

    const renderAside = () => {
      const divProps = omit(props, ['collapsed']);
      const rawWidth = collapsed ? collapsedWidth : width;
      const asideWidth = isNumeric(rawWidth)
        ? `${rawWidth}px`
        : String(rawWidth);
      const menuIcon = {
        expanded: reverseArrow ? (
          <Icon
            path={IconName.mdiBackBurger}
            size={IconSize.Large}
            rotate={180}
          />
        ) : (
          <Icon path={IconName.mdiBackBurger} size={IconSize.Large} />
        ),
        collapsed: reverseArrow ? (
          <Icon
            path={IconName.mdiBackBurger}
            size={IconSize.Large}
            rotate={180}
          />
        ) : (
          <Icon
            path={IconName.mdiBackBurger}
            size={IconSize.Large}
            rotate={180}
          />
        ),
      };
      const status = collapsed ? 'collapsed' : 'expanded';
      const defaultTrigger = menuIcon[status];
      const zeroWidthTrigger =
        parseFloat(String(collapsedWidth || 0)) === 0 ? (
          <span
            onClick={toggle}
            className={mergeClasses([
              styles.layoutAsideZeroWidthTrigger,
              {
                [styles.layoutAsideZeroWidthTriggerRight]: reverseArrow,
              },
              {
                [styles.layoutAsideZeroWidthTriggerLeft]: !reverseArrow,
              },
            ])}
            style={zeroWidthTriggerStyle}
          >
            {defaultTrigger}
          </span>
        ) : null;

      const triggerDom =
        trigger !== null
          ? zeroWidthTrigger || (
              <div
                className={styles.layoutAsideTrigger}
                onClick={toggle}
                style={{ width: asideWidth }}
              >
                {defaultTrigger}
              </div>
            )
          : null;
      const divStyle = {
        ...style,
        flex: `0 0 ${asideWidth}`,
        maxWidth: asideWidth, // Fix width transition bug in IE11
        minWidth: asideWidth,
        width: asideWidth,
      };
      const asideClassNames = mergeClasses([
        styles.layoutAside,
        { [styles.layoutAsideCollapsed]: !!collapsed },
        {
          [styles.layoutAsideHasTrigger]:
            collapsible && trigger !== null && !zeroWidthTrigger,
        },
        { [styles.layoutAsideBelow]: !!below },
        { [styles.layoutAsideZeroWidth]: parseFloat(asideWidth) === 0 },
        classNames,
      ]);
      return (
        <aside
          className={asideClassNames}
          {...divProps}
          style={divStyle}
          ref={ref}
        >
          {collapsible || (below && zeroWidthTrigger) ? triggerDom : null}
          <div className={styles.layoutAsideChildren}>{children}</div>
        </aside>
      );
    };

    const contextValue = useMemo(
      () => ({
        asideCollapsed: collapsed,
      }),
      [collapsed]
    );

    return (
      <AsideContext.Provider value={contextValue}>
        {renderAside()}
      </AsideContext.Provider>
    );
  }
);
