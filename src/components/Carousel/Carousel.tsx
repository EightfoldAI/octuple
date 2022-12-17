import React, {
  Children,
  FC,
  Ref,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  CarouselContext,
  CarouselProps,
  CustomScrollBehavior,
  DataType,
  scrollToItemOptions,
} from './Carousel.types';
import { ScrollMenu, VisibilityContext } from './ScrollMenu/ScrollMenu';
import { ButtonShape, ButtonSize, SecondaryButton } from '../Button';
import { IconName } from '../Icon';
import {
  Pagination,
  PaginationLayoutOptions,
  PaginationLocale,
} from '../Pagination';
import { useForkedRef } from '../../hooks/useForkedRef';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from '../Pagination/Locale/en_US';
import { mergeClasses } from '../../shared/utilities';

import styles from './carousel.module.scss';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const isVisible = (element: HTMLDivElement): boolean => {
  const rect: DOMRect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const Carousel: FC<CarouselProps> = React.forwardRef(
  (props: CarouselProps, ref: Ref<HTMLDivElement>) => {
    const {
      activeIndex = 0,
      auto = true,
      carouselScrollMenuProps,
      children,
      classNames,
      controls = true,
      interval = 5000,
      locale = enUS,
      loop = true,
      nextIconButtonAriaLabel: defaultNextIconButtonAriaLabel,
      onMouseEnter,
      onMouseLeave,
      onPivotEnd,
      onPivotStart,
      pagination = true,
      pause = 'hover',
      previousIconButtonAriaLabel: defaultPreviousIconButtonAriaLabel,
      style,
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
    const forkedRef: (node: any) => void = useForkedRef(ref, carouselRef);
    const data: DataType = useRef<DataType>({}).current;
    const [active, setActive] = useState<number>(activeIndex);
    const [animating, setAnimating] = useState<boolean>(false);
    const [customInterval, setCustomInterval] = useState<boolean | number>();
    const [direction, setDirection] = useState<string>('next');
    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>();

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
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

    const carouselClassNames: string = mergeClasses(
      styles.carousel,
      { [styles.carouselRtl]: htmlDir === 'rtl' },
      { [styles.carouselSlider]: type === 'slide' },
      { [styles.carouselFade]: transition === 'crossfade' },
      classNames
    );

    const handleCycle = useCallback((): void => {
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
    }, [onMouseLeave]);

    const handlePause = useCallback(
      (): void => pause && data.timeout && clearTimeout(data.timeout),
      [onMouseEnter]
    );

    const nextItemWhenVisible = (): void => {
      if (
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
        !document.hidden &&
        carouselRef.current &&
        isVisible(carouselRef.current)
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleOnWheel = (
      apiObj: scrollVisibilityApiType,
      ev: React.WheelEvent
    ): void => {
      const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

      if (isTouchpad) {
        ev.stopPropagation();
        return;
      }

      if (ev.deltaY < 0) {
        apiObj.scrollNext();
      } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
      }
    };

    const nextButton = (
      nextDisabled?: boolean,
      scrollNext?: <T>(
        behavior?: CustomScrollBehavior<T>,
        inline?: ScrollLogicalPosition,
        block?: ScrollLogicalPosition,
        { duration, ease, boundary }?: scrollToItemOptions
      ) => unknown
    ): JSX.Element => {
      return (
        <>
          {!nextDisabled && (
            <>
              {props.type === 'scroll' && (
                <div
                  className={styles.carouselNextMask}
                  ref={nextButtonMaskRef}
                />
              )}
              <SecondaryButton
                ariaLabel={nextIconButtonAriaLabel}
                classNames={styles.carouselNext}
                disabled={
                  props.type === 'slide' &&
                  !props.loop &&
                  active === itemsNumber - 1
                    ? true
                    : false
                }
                iconProps={{
                  role: 'presentation',
                  path:
                    htmlDir === 'rtl'
                      ? IconName.mdiChevronLeft
                      : IconName.mdiChevronRight,
                }}
                key="carousel-next"
                onClick={() =>
                  props.type === 'scroll'
                    ? scrollNext()
                    : handleControlClick('next')
                }
                ref={nextButtonRef}
                shape={ButtonShape.Rectangle}
                size={ButtonSize.Medium}
              />
            </>
          )}
        </>
      );
    };

    const previousButton = (
      previousDisabled?: boolean,
      scrollPrev?: <T>(
        behavior?: CustomScrollBehavior<T>,
        inline?: ScrollLogicalPosition,
        block?: ScrollLogicalPosition,
        { duration, ease, boundary }?: scrollToItemOptions
      ) => unknown
    ): JSX.Element => {
      return (
        <>
          {!previousDisabled && (
            <>
              {props.type === 'scroll' && (
                <div
                  className={styles.carouselPreviousMask}
                  ref={previousButtonMaskRef}
                />
              )}
              <SecondaryButton
                ariaLabel={previousIconButtonAriaLabel}
                classNames={styles.carouselPrevious}
                disabled={
                  props.type === 'slide' && !props.loop && active === 0
                    ? true
                    : false
                }
                iconProps={{
                  role: 'presentation',
                  path:
                    htmlDir === 'rtl'
                      ? IconName.mdiChevronRight
                      : IconName.mdiChevronLeft,
                }}
                key="carousel-previous"
                onClick={() =>
                  props.type === 'scroll'
                    ? scrollPrev()
                    : handleControlClick('previous')
                }
                ref={previousButtonRef}
                shape={ButtonShape.Rectangle}
                size={ButtonSize.Medium}
              />
            </>
          )}
        </>
      );
    };

    const autoScrollButton = (direction?: string): JSX.Element => {
      const {
        initComplete,
        isFirstItemVisible,
        isLastItemVisible,
        scrollNext,
        scrollPrev,
        visibleElements,
      } = React.useContext(VisibilityContext);

      const [nextDisabled, setNextDisabled] = useState(
        !visibleElements?.length && isLastItemVisible
      );

      const [previousDisabled, setPreviousDisabled] = useState(
        !initComplete || (initComplete && isFirstItemVisible)
      );

      useEffect(() => {
        if (initComplete && visibleElements?.length) {
          setPreviousDisabled(isFirstItemVisible);
          setNextDisabled(isLastItemVisible);
        }
      }, [
        initComplete,
        isFirstItemVisible,
        isLastItemVisible,
        visibleElements,
      ]);

      if (direction === 'next') {
        return nextButton(nextDisabled, scrollNext);
      }

      return previousButton(previousDisabled, scrollPrev);
    };

    return (
      <LocaleReceiver componentName={'Pagination'} defaultLocale={enUS}>
        {(_contextLocale: PaginationLocale) => {
          return (
            <div
              className={carouselClassNames}
              data-test-id={dataTestId}
              onMouseEnter={type === 'slide' ? handlePause : null}
              onMouseLeave={type === 'slide' ? handleCycle : null}
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
                    currentPage={active + 1}
                    dots
                    layout={[
                      PaginationLayoutOptions.Previous,
                      PaginationLayoutOptions.Pager,
                      PaginationLayoutOptions.Next,
                    ]}
                    loop={loop}
                    onCurrentChange={(currentPage: number) =>
                      handleIndicatorClick(currentPage - 1)
                    }
                    pageSizes={[1]}
                    total={itemsNumber}
                  />
                )}
                <div className={styles.carouselInner} ref={carouselInnerRef}>
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
                    <ScrollMenu
                      nextButton={() => autoScrollButton('next')}
                      onWheel={handleOnWheel}
                      previousButton={() => autoScrollButton('previous')}
                      rtl={htmlDir === 'rtl'}
                      {...carouselScrollMenuProps}
                    >
                      {carouselScrollMenuProps?.children}
                    </ScrollMenu>
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
          );
        }}
      </LocaleReceiver>
    );
  }
);
