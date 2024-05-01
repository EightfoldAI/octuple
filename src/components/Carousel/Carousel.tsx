'use client';

import React, {
  Children,
  FC,
  Ref,
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName, Size } from '../ConfigProvider';
import { ParentComponentsContextProvider } from '../ConfigProvider/ParentComponentsContext';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  CarouselContext,
  CarouselProps,
  CarouselSize,
  CustomScrollBehavior,
  DataType,
  DEFAULT_GAP_WIDTH,
  DEFAULT_TRANSITION_DURATION,
  IntersectionObserverItem,
  ItemOrElement,
  OCCLUSION_AVOIDANCE_BUFFER_LARGE,
  OCCLUSION_AVOIDANCE_BUFFER_MEDIUM,
  OCCLUSION_AVOIDANCE_BUFFER_SMALL,
  scrollToItemOptions,
} from './Carousel.types';
import { ScrollMenu, VisibilityContext } from './ScrollMenu/ScrollMenu';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import {
  Pagination,
  PaginationLayoutOptions,
  PaginationLocale,
} from '../Pagination';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useForkedRef } from '../../hooks/useForkedRef';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from '../Pagination/Locale/en_US';
import {
  canUseDocElement,
  canUseDom,
  mergeClasses,
} from '../../shared/utilities';

import styles from './carousel.module.scss';
import themedComponentStyles from './carousel.theme.module.scss';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const isVisible = (element: HTMLDivElement): boolean => {
  const rect: DOMRect = element.getBoundingClientRect() || {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
  const containerHeight: number = canUseDom()
    ? window.innerHeight
    : 0 || typeof document !== 'undefined'
    ? document.documentElement.clientHeight
    : 0;
  const containerWidth: number = canUseDom()
    ? window.innerWidth
    : 0 || typeof document !== 'undefined'
    ? document.documentElement.clientWidth
    : 0;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= containerHeight &&
    rect.right <= containerWidth
  );
};

export const Carousel: FC<CarouselProps> = React.forwardRef(
  (props: CarouselProps, ref: Ref<HTMLDivElement>) => {
    const {
      activeIndex = 0,
      auto = true,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      carouselScrollMenuProps,
      children,
      classNames,
      controls = true,
      gradient = false,
      interval = 5000,
      locale = enUS,
      loop = true,
      nextIconButtonAriaLabel: defaultNextIconButtonAriaLabel,
      nextButtonProps,
      onMouseEnter,
      onMouseLeave,
      onPivotEnd,
      onPivotStart,
      overlayControls = true,
      pagination = true,
      pause = 'hover',
      previousIconButtonAriaLabel: defaultPreviousIconButtonAriaLabel,
      previousButtonProps,
      single = false,
      size = CarouselSize.Large,
      theme,
      themeContainerId,
      transition = 'push',
      type = 'slide',
      'data-test-id': dataTestId,
      ...rest
    } = props;
    const htmlDir: string = useCanvasDirection();

    const carouselRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const carouselInnerRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const nextButtonMaskRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const nextButtonRef: React.MutableRefObject<HTMLButtonElement> =
      useRef<HTMLButtonElement>(null);
    const previousButtonMaskRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const previousButtonRef: React.MutableRefObject<HTMLButtonElement> =
      useRef<HTMLButtonElement>(null);
    const scrollMenuRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const forkedRef: (node: any) => void = useForkedRef(ref, carouselRef);
    const data: DataType = useRef<DataType>({}).current;
    const [active, setActive] = useState<number>(activeIndex);
    const [animating, setAnimating] = useState<boolean>(false);
    const [customInterval, setCustomInterval] = useState<boolean | number>();
    const [direction, setDirection] = useState<string>('next');
    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>();
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const [scrollLock, setScrollLock] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout>();
    const [_single, setSingle] = useState<boolean>(single);
    const [_visibleElements, setVisibleElements] = useState<number>(0);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    // ============================ Strings ===========================
    const [paginationLocale] = useLocaleReceiver('Pagination');
    let mergedLocale: PaginationLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = paginationLocale || props.locale;
    }

    const [nextIconButtonAriaLabel, setNextIconButtonAriaLabel] =
      useState<string>(defaultNextIconButtonAriaLabel);
    const [previousIconButtonAriaLabel, setPreviousIconButtonAriaLabel] =
      useState<string>(defaultPreviousIconButtonAriaLabel);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect((): void => {
      setNextIconButtonAriaLabel(
        props.nextIconButtonAriaLabel
          ? props.nextIconButtonAriaLabel
          : mergedLocale.lang!.nextIconButtonAriaLabel
      );
      setPreviousIconButtonAriaLabel(
        props.previousIconButtonAriaLabel
          ? props.previousIconButtonAriaLabel
          : mergedLocale.lang!.previousIconButtonAriaLabel
      );
    }, [mergedLocale]);

    useEffect((): void => {
      if (type === 'slide') {
        setItemsNumber(Children.toArray(children).length);
      }
    });

    useEffect((): void => {
      visible && handleCycle();
    }, [visible]);

    useEffect((): void => {
      !animating && handleCycle();
      !animating && onPivotEnd?.(active, direction);
      animating && onPivotStart?.(active, direction);
    }, [animating]);

    useEffect(() => {
      window?.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window?.removeEventListener('scroll', handleScroll);
      };
    });

    useEffect(() => {
      if (scrollMenuRef?.current) {
        // passive: false, to ensure prevent default
        scrollMenuRef.current.addEventListener('wheel', preventYScroll, {
          passive: false,
        });
      }

      return () => {
        if (scrollMenuRef?.current) {
          scrollMenuRef.current.removeEventListener('wheel', preventYScroll);
        }
      };
    });

    const carouselClassNames: string = mergeClasses(
      styles.carousel,
      { [styles.carouselLarge]: size === CarouselSize.Large },
      { [styles.carouselMedium]: size === CarouselSize.Medium },
      { [styles.carouselSmall]: size === CarouselSize.Small },
      { [styles.carouselOverlayControls]: !!overlayControls },
      { [styles.carouselRtl]: htmlDir === 'rtl' },
      { [styles.carouselSlider]: type === 'slide' },
      { [styles.carouselFade]: transition === 'crossfade' },
      { [themedComponentStyles.theme]: mergedTheme },
      { [styles.gradient]: mergedGradient },
      classNames
    );

    const carouselSizeToButtonSizeMap = new Map<
      CarouselSize,
      ButtonSize | Size
    >([
      [CarouselSize.Large, ButtonSize.Large],
      [CarouselSize.Medium, ButtonSize.Medium],
      [CarouselSize.Small, ButtonSize.Small],
    ]);

    const carouselSizeToOcclusionBufferMap = new Map<CarouselSize, number>([
      [CarouselSize.Large, OCCLUSION_AVOIDANCE_BUFFER_LARGE],
      [CarouselSize.Medium, OCCLUSION_AVOIDANCE_BUFFER_MEDIUM],
      [CarouselSize.Small, OCCLUSION_AVOIDANCE_BUFFER_SMALL],
    ]);

    const getFirstItemScrollOffset = (
      gapWidth: number,
      overlay: boolean,
      size: CarouselSize
    ): number => {
      let offset: number = 0;
      if (overlay) {
        offset = gapWidth * 2 - carouselSizeToOcclusionBufferMap.get(size);
      } else {
        offset = gapWidth;
      }
      return offset;
    };

    const getLastItemScrollOffset = (
      containerPadding: number,
      gapWidth: number,
      overlay: boolean
    ): number => {
      let offset: number = 0;
      if (overlay) {
        offset =
          gapWidth * 3 -
          containerPadding -
          carouselSizeToOcclusionBufferMap.get(size);
      } else {
        offset = gapWidth * 2 - containerPadding;
      }
      return offset;
    };

    const getItemScrollOffset = (
      gapWidth: number,
      overlay: boolean
    ): number => {
      let offset: number = 0;
      if (overlay) {
        // When overlayControls is true, the gapWidth is doubled.
        // This was previously handled by the scrollBySingleItem utility, but now it's handled here.
        // To avoid occlusion, the offset is increased by the gapWidth on both sides of each inner item.
        offset = gapWidth * 2;
      } else {
        offset = gapWidth;
      }
      return offset;
    };

    const handleCycle = useCallback((): void => {
      if (type === 'scroll') {
        return;
      }
      handlePause();

      if (!auto || (!loop && active === itemsNumber - 1)) {
        return;
      }

      if (typeof interval === 'number') {
        data.timeout = setTimeout(
          () => nextItemWhenVisible(),
          typeof customInterval === 'number' ? customInterval : interval
        );
      }
    }, [
      onMouseLeave,
      loop,
      active,
      itemsNumber,
      interval,
      customInterval,
      data.timeout,
    ]);

    const handlePause = useCallback((): void => {
      if (type === 'scroll') {
        return;
      }
      pause && data.timeout && clearTimeout(data.timeout);
    }, [onMouseEnter, pause, data.timeout]);

    const nextItemWhenVisible = (): void => {
      if (
        canUseDocElement() &&
        !document.hidden &&
        carouselRef.current &&
        isVisible(carouselRef.current)
      ) {
        if (animating) {
          return;
        }
        handleControlClick('next');
      }
    };

    const handleControlClick = (direction: string): void => {
      if (animating) {
        return;
      }

      setDirection(direction);

      if (direction === 'next') {
        active === itemsNumber - 1 ? setActive(0) : setActive(active + 1);
      } else {
        active === 0 ? setActive(itemsNumber - 1) : setActive(active - 1);
      }
    };

    const handleIndicatorClick = (currentPage: number): void => {
      if (active === currentPage) {
        return;
      }

      if (loop && active === itemsNumber - 1 && currentPage === 0) {
        setActive(currentPage);
        setDirection('next');
        return;
      }

      if (loop && active === 0 && currentPage === itemsNumber - 1) {
        setActive(currentPage);
        setDirection('previous');
        return;
      }

      if (active < currentPage) {
        setActive(currentPage);
        setDirection('next');
        return;
      }

      if (active > currentPage) {
        setActive(currentPage);
        setDirection('previous');
      }
    };

    const handleScroll = (): void => {
      if (
        canUseDocElement() &&
        !document.hidden &&
        carouselRef.current &&
        isVisible(carouselRef.current)
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const isTouchpadVerticalScroll = async (
      event: React.WheelEvent | WheelEvent
    ): Promise<boolean> => {
      const { deltaY } = event;
      if (deltaY && !Number.isInteger(deltaY)) {
        return false;
      }
      return true;
    };

    const isTouchpadHorizontalScroll = async (
      event: React.WheelEvent | WheelEvent
    ): Promise<boolean> => {
      const { deltaX } = event;
      if (deltaX && !Number.isInteger(deltaX)) {
        return false;
      }
      return true;
    };

    const handleGroupScrollOnWheel = async (
      apiObj: scrollVisibilityApiType,
      event: React.WheelEvent
    ): Promise<void> => {
      if (scrollLock) {
        return Promise.resolve();
      }
      setScrollLock(true);
      const touchpadHorizontal: boolean = await isTouchpadHorizontalScroll(
        event
      );
      const touchpadVertical: boolean = await isTouchpadVerticalScroll(event);
      const transitionDuration: number =
        props.carouselScrollMenuProps?.transitionDuration ||
        DEFAULT_TRANSITION_DURATION;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => setScrollLock(false),
        transitionDuration
      );
      if (event.deltaY < 0 || event.deltaX < 0) {
        // When not touchpad, handle the scroll
        if (!touchpadHorizontal || !touchpadVertical) {
          apiObj.scrollNextGroup();
        }
      } else if (event.deltaY > 0 || event.deltaX > 0) {
        // When not touchpad, handle the scroll
        if (!touchpadHorizontal || !touchpadVertical) {
          apiObj.scrollPrevGroup();
        }
      }
    };

    const handleSingleItemScrollOnWheel = async (
      apiObj: scrollVisibilityApiType,
      event: React.WheelEvent
    ): Promise<void> => {
      if (scrollLock) {
        return Promise.resolve();
      }
      setScrollLock(true);
      const gapWidth: number =
        props.carouselScrollMenuProps?.gap || DEFAULT_GAP_WIDTH;
      const touchpadHorizontal: boolean = await isTouchpadHorizontalScroll(
        event
      );
      const touchpadVertical: boolean = await isTouchpadVerticalScroll(event);
      const transitionDuration: number =
        props.carouselScrollMenuProps?.transitionDuration ||
        DEFAULT_TRANSITION_DURATION;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => setScrollLock(false),
        transitionDuration
      );
      if (event.deltaY < 0 || event.deltaX < 0) {
        // When not touchpad, handle the scroll
        if (!touchpadHorizontal || !touchpadVertical) {
          apiObj.scrollBySingleItem(
            apiObj.getNextElement(),
            'smooth',
            htmlDir === 'rtl' ? 'previous' : 'next',
            overlayControls ? gapWidth : 0,
            apiObj.isFirstItemVisible
              ? getFirstItemScrollOffset(gapWidth, overlayControls, size)
              : getItemScrollOffset(gapWidth, overlayControls)
          );
        }
      } else if (event.deltaY > 0 || event.deltaX > 0) {
        // When not touchpad, handle the scroll
        if (!touchpadHorizontal || !touchpadVertical) {
          apiObj.scrollBySingleItem(
            apiObj.getPrevElement(),
            'smooth',
            htmlDir === 'rtl' ? 'next' : 'previous',
            overlayControls ? gapWidth : 0,
            apiObj.isLastItemVisible
              ? getLastItemScrollOffset(
                  props.carouselScrollMenuProps?.containerPadding || 8,
                  gapWidth,
                  overlayControls
                )
              : getItemScrollOffset(gapWidth, overlayControls)
          );
        }
      }
    };

    const handleOnWheel = (
      apiObj: scrollVisibilityApiType,
      event: React.WheelEvent
    ): void => {
      if (scrollLock) {
        return;
      }
      setScrollLock(true);
      const transitionDuration: number =
        props.carouselScrollMenuProps?.transitionDuration ||
        DEFAULT_TRANSITION_DURATION;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => setScrollLock(false),
        transitionDuration
      );
      if (_single) {
        handleSingleItemScrollOnWheel(apiObj, event);
      } else {
        handleGroupScrollOnWheel(apiObj, event);
      }
    };

    const preventYScroll = async (event: WheelEvent): Promise<void> => {
      const touchpadVertical: boolean = await isTouchpadVerticalScroll(event);
      // Prevent document scroll only when hovering over a carousel that may be scrolled and when not using touchpad.
      if (
        mouseEnter &&
        (previousButtonRef.current || nextButtonRef.current) &&
        !touchpadVertical
      ) {
        event.preventDefault();
      }
    };

    const nextButton = (
      getNextElement?: () => IntersectionObserverItem,
      isFirstItemVisible?: boolean,
      disabled?: boolean,
      scrollBySingleItem?: <T>(
        target?: ItemOrElement,
        behavior?: CustomScrollBehavior<T>,
        direction?: string,
        gap?: number,
        offset?: number
      ) => void | T | Promise<T>,
      scrollNextGroup?: <T>(
        behavior?: CustomScrollBehavior<T>,
        inline?: ScrollLogicalPosition,
        block?: ScrollLogicalPosition,
        { duration, ease, boundary }?: scrollToItemOptions
      ) => unknown
    ): JSX.Element => {
      const gapWidth: number =
        props.carouselScrollMenuProps?.gap || DEFAULT_GAP_WIDTH;
      const nextDisabled = (): boolean => {
        return props.type === 'slide'
          ? !props.loop && active === itemsNumber - 1
          : disabled;
      };
      const nextHidden = (): boolean => {
        return overlayControls ? disabled : false;
      };
      const transitionDuration: number =
        props.carouselScrollMenuProps?.transitionDuration ||
        DEFAULT_TRANSITION_DURATION;
      return (
        <>
          {!nextHidden() && (
            <>
              {props.type === 'scroll' && overlayControls && (
                <div
                  className={styles.carouselNextMask}
                  ref={nextButtonMaskRef}
                />
              )}
              <Button
                ariaLabel={nextIconButtonAriaLabel}
                classNames={styles.carouselNext}
                configContextProps={configContextProps}
                disabled={nextDisabled()}
                gradient={mergedGradient}
                iconProps={{
                  role: 'presentation',
                  path:
                    htmlDir === 'rtl'
                      ? IconName.mdiChevronLeft
                      : IconName.mdiChevronRight,
                }}
                key="carousel-next"
                onClick={() => {
                  if (scrollLock) {
                    return;
                  }
                  setScrollLock(true);
                  clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(
                    () => setScrollLock(false),
                    transitionDuration
                  );
                  props.type === 'scroll'
                    ? _single
                      ? scrollBySingleItem(
                          getNextElement(),
                          'smooth',
                          htmlDir === 'rtl' ? 'previous' : 'next',
                          overlayControls ? gapWidth : 0,
                          isFirstItemVisible
                            ? getFirstItemScrollOffset(
                                gapWidth,
                                overlayControls,
                                size
                              )
                            : getItemScrollOffset(gapWidth, overlayControls)
                        )
                      : scrollNextGroup()
                    : handleControlClick('next');
                }}
                shape={ButtonShape.Rectangle}
                size={carouselSizeToButtonSizeMap.get(size)}
                theme={mergedTheme}
                themeContainerId={themeContainerId}
                variant={ButtonVariant.Secondary}
                {...nextButtonProps}
                ref={nextButtonRef}
              />
            </>
          )}
        </>
      );
    };

    const previousButton = (
      getPrevElement?: () => IntersectionObserverItem,
      isLastItemVisible?: boolean,
      disabled?: boolean,
      scrollBySingleItem?: <T>(
        target?: ItemOrElement,
        behavior?: CustomScrollBehavior<T>,
        direction?: string,
        gap?: number,
        offset?: number
      ) => void | T | Promise<T>,
      scrollPrevGroup?: <T>(
        behavior?: CustomScrollBehavior<T>,
        inline?: ScrollLogicalPosition,
        block?: ScrollLogicalPosition,
        { duration, ease, boundary }?: scrollToItemOptions
      ) => unknown
    ): JSX.Element => {
      const gapWidth: number =
        props.carouselScrollMenuProps?.gap || DEFAULT_GAP_WIDTH;
      const previousDisabled = (): boolean => {
        return props.type === 'slide' ? !props.loop && active === 0 : disabled;
      };
      const previousHidden = (): boolean => {
        return overlayControls ? disabled : false;
      };
      const transitionDuration: number =
        props.carouselScrollMenuProps?.transitionDuration ||
        DEFAULT_TRANSITION_DURATION;
      return (
        <>
          {!previousHidden() && (
            <>
              {props.type === 'scroll' && overlayControls && (
                <div
                  className={styles.carouselPreviousMask}
                  ref={previousButtonMaskRef}
                />
              )}
              <Button
                ariaLabel={previousIconButtonAriaLabel}
                classNames={styles.carouselPrevious}
                configContextProps={configContextProps}
                disabled={previousDisabled()}
                gradient={mergedGradient}
                iconProps={{
                  role: 'presentation',
                  path:
                    htmlDir === 'rtl'
                      ? IconName.mdiChevronRight
                      : IconName.mdiChevronLeft,
                }}
                key="carousel-previous"
                onClick={() => {
                  if (scrollLock) {
                    return;
                  }
                  setScrollLock(true);
                  clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(
                    () => setScrollLock(false),
                    transitionDuration
                  );
                  props.type === 'scroll'
                    ? _single
                      ? scrollBySingleItem(
                          getPrevElement(),
                          'smooth',
                          htmlDir === 'rtl' ? 'next' : 'previous',
                          overlayControls ? gapWidth : 0,
                          isLastItemVisible
                            ? getLastItemScrollOffset(
                                props.carouselScrollMenuProps
                                  ?.containerPadding || 8,
                                gapWidth,
                                overlayControls
                              )
                            : getItemScrollOffset(gapWidth, overlayControls)
                        )
                      : scrollPrevGroup()
                    : handleControlClick('previous');
                }}
                shape={ButtonShape.Rectangle}
                size={carouselSizeToButtonSizeMap.get(size)}
                theme={mergedTheme}
                themeContainerId={themeContainerId}
                variant={ButtonVariant.Secondary}
                {...previousButtonProps}
                ref={previousButtonRef}
              />
            </>
          )}
        </>
      );
    };

    const autoScrollButton = (direction?: string): JSX.Element => {
      const {
        getNextElement,
        getPrevElement,
        initComplete,
        isFirstItemVisible,
        isLastItemVisible,
        scrollBySingleItem,
        scrollNextGroup,
        scrollPrevGroup,
        visibleElements,
      } = React.useContext(VisibilityContext);

      const [nextDisabled, setNextDisabled] = useState(
        !initComplete ||
          (initComplete && !visibleElements?.length && isLastItemVisible)
      );

      const [previousDisabled, setPreviousDisabled] = useState(
        !initComplete || (initComplete && isFirstItemVisible)
      );

      useEffect(() => {
        if (initComplete && visibleElements?.length) {
          setPreviousDisabled(isFirstItemVisible);
          setNextDisabled(isLastItemVisible);
          setVisibleElements(visibleElements.length);
        }
      }, [
        initComplete,
        isFirstItemVisible,
        isLastItemVisible,
        visibleElements,
      ]);

      if (direction === 'next') {
        return nextButton(
          getNextElement,
          isFirstItemVisible,
          nextDisabled,
          scrollBySingleItem,
          scrollNextGroup
        );
      }

      return previousButton(
        getPrevElement,
        isLastItemVisible,
        previousDisabled,
        scrollBySingleItem,
        scrollPrevGroup
      );
    };

    const updateScrollMode = (): void => {
      if (type !== 'scroll') {
        return;
      }

      if (!single) {
        // If the number of visible elements is less than 3, swap to single scroll.
        setSingle(_visibleElements < 3);
      }
    };

    useLayoutEffect(() => {
      if (type !== 'scroll') {
        return;
      }
      updateScrollMode();
    }, [_single, _visibleElements]);

    return (
      <LocaleReceiver componentName={'Pagination'} defaultLocale={enUS}>
        {(_contextLocale: PaginationLocale) => {
          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <ParentComponentsContextProvider componentName="Carousel">
                <div
                  className={carouselClassNames}
                  data-test-id={dataTestId}
                  onMouseEnter={
                    type === 'slide' ? handlePause : () => setMouseEnter(true)
                  }
                  onMouseLeave={
                    type === 'slide' ? handleCycle : () => setMouseEnter(false)
                  }
                  {...rest}
                  ref={forkedRef}
                >
                  <CarouselContext.Provider
                    value={{
                      setAnimating,
                      setCustomInterval,
                    }}
                  >
                    {pagination && (
                      <Pagination
                        classNames={styles.carouselPagination}
                        configContextProps={configContextProps}
                        currentPage={active + 1}
                        dots
                        gradient={gradient}
                        layout={[
                          PaginationLayoutOptions.Previous,
                          PaginationLayoutOptions.Pager,
                          PaginationLayoutOptions.Next,
                        ]}
                        loop={loop}
                        onCurrentChange={(currentPage: number) =>
                          handleIndicatorClick(currentPage - 1)
                        }
                        restrictPageSizesPropToSizesLayout
                        pageSize={1}
                        theme={mergedTheme}
                        themeContainerId={themeContainerId}
                        total={itemsNumber}
                      />
                    )}
                    <div
                      className={styles.carouselInner}
                      ref={carouselInnerRef}
                    >
                      {type === 'slide' &&
                        Children?.map(children, (child, index) => {
                          if (React.isValidElement(child)) {
                            return React.cloneElement(
                              child as React.ReactElement<any>,
                              {
                                active: active === index ? true : false,
                                direction: direction,
                                key: index,
                              }
                            );
                          }
                          return null;
                        })}
                      {type === 'scroll' && (
                        <ResizeObserver onResize={updateScrollMode}>
                          <ScrollMenu
                            controls={controls}
                            nextButton={() => autoScrollButton('next')}
                            onWheel={handleOnWheel}
                            overlayControls={overlayControls}
                            previousButton={() => autoScrollButton('previous')}
                            rtl={htmlDir === 'rtl'}
                            {...carouselScrollMenuProps}
                            ref={scrollMenuRef}
                          >
                            {carouselScrollMenuProps?.children}
                          </ScrollMenu>
                        </ResizeObserver>
                      )}
                    </div>
                    {controls && type === 'slide' && (
                      <>
                        {previousButton()}
                        {nextButton()}
                      </>
                    )}
                  </CarouselContext.Provider>
                </div>
              </ParentComponentsContextProvider>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
