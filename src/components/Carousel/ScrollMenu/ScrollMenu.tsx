import React, {
  FC,
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  innerWrapperClassName,
  ScrollMenuProps,
  VisibilityContext,
} from '../Carousel.types';
import type { Refs } from '../Carousel.types';
import { ScrollContainer } from '../ScrollContainer';
import { MenuItems } from '../MenuItems';
import { autoScrollApi, autoScrollApiType } from '../autoScrollApi';
import ItemsMap from '../ItemsMap';
import { observerOptions as defaultObserverOptions } from '../Settings';
import { useIntersectionObserver } from '../Hooks/useIntersectionObserver';
import { useItemsChanged } from '../Hooks/useItemsChanged';
import { useOnInitCallback } from '../Hooks/useOnInitCallback';
import { useOnUpdate } from '../Hooks/useOnUpdate';
import { getElementOrConstructor } from '../Utilities';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../carousel.module.scss';

export const ScrollMenu: FC<ScrollMenuProps> = forwardRef(
  (props: ScrollMenuProps, ref: Ref<HTMLDivElement>) => {
    const {
      apiRef = { current: {} as autoScrollApiType },
      children,
      containerPadding = 0,
      controls = true,
      gap = 8,
      itemClassNames,
      nextButton: _rightArrow,
      noPolyfill,
      onInit = (): void => void 0,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onScroll,
      onUpdate = (): void => void 0,
      onWheel = (): void => void 0,
      options = defaultObserverOptions,
      previousButton: _leftArrow,
      rtl,
      scrollContainerClassNames,
      scrollWrapperClassNames,
      separatorClassNames,
      transitionBehavior,
      transitionDuration = 400,
      transitionEase,
      'data-test-id': dataTestId,
      ...rest
    } = props;
    const LeftArrow: JSX.Element = getElementOrConstructor(_leftArrow);
    const RightArrow: JSX.Element = getElementOrConstructor(_rightArrow);

    const scrollContainerRef: React.MutableRefObject<HTMLUListElement> =
      useRef(null);
    const [menuItemsRefs] = useState<Refs>({});

    const observerOptions = useMemo(
      () => ({
        ...defaultObserverOptions,
        ...options,
        root: scrollContainerRef.current,
      }),
      [options, scrollContainerRef.current]
    );

    const items: ItemsMap = useRef(new ItemsMap()).current;

    const itemsChanged: string = useItemsChanged(children, items);

    const { visibleElementsWithSeparators } = useIntersectionObserver({
      items,
      itemsChanged,
      options: observerOptions,
      refs: menuItemsRefs,
    });

    const mounted: boolean = !!visibleElementsWithSeparators.length;

    const api = useMemo(
      () =>
        autoScrollApi(
          items,
          visibleElementsWithSeparators,
          scrollContainerRef,
          {
            duration: transitionDuration,
            ease: transitionEase,
            behavior: transitionBehavior!,
          },
          rtl,
          noPolyfill
        ),
      [items, visibleElementsWithSeparators, itemsChanged, rtl, noPolyfill]
    );

    const getContext = useCallback(
      () => ({
        ...api,
        initComplete: mounted,
        items,
        visibleElementsWithSeparators,
        scrollContainer: scrollContainerRef,
      }),
      [api, mounted, items, visibleElementsWithSeparators, scrollContainerRef]
    );

    const [context, setContext] = useState<autoScrollApiType>(getContext);

    const onInitCallbackTriggered = useOnInitCallback({
      callback: () => onInit(context),
      condition: mounted,
    });

    useOnUpdate({
      callback: () => onUpdate?.(context),
      condition: onInitCallbackTriggered,
      hash: JSON.stringify(
        visibleElementsWithSeparators
          .concat(String(context?.isFirstItemVisible))
          .concat(String(context?.isLastItemVisible))
      ),
    });

    useEffect(() => setContext(getContext()), [getContext]);

    apiRef.current = context;

    const scrollHandler = useCallback(
      (event: React.UIEvent) => onScroll?.(context, event),
      [onScroll, context]
    );

    const onWheelHandler = useCallback(
      (event: React.WheelEvent) => onWheel?.(context, event),
      [onWheel, context]
    );

    const wrapperClassNames: string = mergeClasses([
      styles.carouselAutoScroll,
      scrollWrapperClassNames,
    ]);

    return (
      <div
        {...rest}
        className={wrapperClassNames}
        onMouseDown={onMouseDown?.(context)}
        onMouseMove={onMouseMove?.(context)}
        onMouseUp={onMouseUp?.(context)}
        onWheel={onWheelHandler}
        ref={ref}
        data-test-id={dataTestId}
      >
        <VisibilityContext.Provider value={context}>
          <div className={innerWrapperClassName}>
            {!context?.isFirstItemVisible && controls && LeftArrow}
            <ScrollContainer
              classNames={scrollContainerClassNames}
              containerPadding={containerPadding}
              onScroll={() => scrollHandler}
              ref={scrollContainerRef}
              rtl={rtl}
            >
              <MenuItems
                gap={gap}
                itemClassNames={itemClassNames}
                refs={menuItemsRefs}
                rtl={rtl}
                separatorClassNames={separatorClassNames}
              >
                {children}
              </MenuItems>
            </ScrollContainer>
            {!context?.isLastItemVisible && controls && RightArrow}
          </div>
        </VisibilityContext.Provider>
      </div>
    );
  }
);

export { VisibilityContext };
