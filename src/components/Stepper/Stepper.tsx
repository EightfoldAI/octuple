'use client';

import React, {
  FC,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import {
  Step,
  StepIndex,
  StepSize,
  StepperLineStyle,
  StepperLocale,
  StepperProps,
  StepperSize,
  StepperThemeName,
  StepperVariant,
  StepperValidationStatus,
} from './Stepper.types';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { Icon, IconName, IconSize } from '../Icon';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses, SELECTORS, focusable } from '../../shared/utilities';
import enUS from './Locale/en_US';

import styles from './stepper.module.scss';

let scrollFocusTimeout: ReturnType<typeof setTimeout>;

export const Stepper: FC<StepperProps> = React.forwardRef(
  (props: StepperProps, ref: Ref<HTMLDivElement>) => {
    const {
      activeStepIndex = 0,
      classNames,
      completeAriaLabelText: defaultCompleteAriaLabelText,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      gradient = false,
      height,
      index = 0,
      layout = 'horizontal',
      lineStyle,
      locale = enUS,
      onChange,
      readonly = true,
      required = false,
      scrollable,
      enableScrollToSection = false,
      scrollDownAriaLabelText: defaultScrollDownAriaLabelText,
      scrollLeftAriaLabelText: defaultScrollLeftAriaLabelText,
      scrollRightAriaLabelText: defaultScrollRightAriaLabelText,
      scrollUpAriaLabelText: defaultScrollUpAriaLabelText,
      navigateToStepAriaLabelText: defaultNavigateToStepAriaLabelText,
      showActiveStepIndex,
      size = StepperSize.Medium,
      status,
      steps,
      style,
      theme, // TODO: migrate to theme context.
      themeContainerId,
      variant = StepperVariant.Default,
      width,
      'data-test-id': dataTestId,
      scrollToActiveStep,
      stepsContainerProps = {},
      ...rest
    } = props;
    const htmlDir: string = useCanvasDirection();

    const stepsContainerRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const stepsRef: React.MutableRefObject<HTMLUListElement> =
      useRef<HTMLUListElement>(null);
    const currentActiveStepRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const [currentActiveStep, setCurrentActiveStep] =
      useState<StepIndex>(index);
    const [_scrollable, setScrollable] = useState<boolean>(false);
    const [nextDisabled, setNextDisabled] = useState<boolean>(false);
    const [previousDisabled, setPreviousDisabled] = useState<boolean>(false);

    const mergedScrollable: boolean = props.scrollable
      ? props.scrollable
      : _scrollable;

    useEffect(() => {
      setCurrentActiveStep(index);
    }, [index]);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    // ============================ Strings ===========================
    const [stepperLocale] = useLocaleReceiver('Stepper');
    let mergedLocale: StepperLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = stepperLocale || props.locale;
    }

    const [completeAriaLabelText, setCompleteAriaLabelText] = useState<string>(
      defaultCompleteAriaLabelText
    );

    const [scrollDownAriaLabelText, setScrollDownAriaLabelText] =
      useState<string>(defaultScrollDownAriaLabelText);
    const [scrollLeftAriaLabelText, setScrollLeftAriaLabelText] =
      useState<string>(defaultScrollLeftAriaLabelText);
    const [scrollRightAriaLabelText, setScrollRightAriaLabelText] =
      useState<string>(defaultScrollRightAriaLabelText);
    const [scrollUpAriaLabelText, setScrollUpAriaLabelText] = useState<string>(
      defaultScrollUpAriaLabelText
    );
    const [navigateToStepAriaLabelText, setNavigateToStepAriaLabelText] =
      useState<string>(defaultNavigateToStepAriaLabelText);

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCompleteAriaLabelText(
        props.completeAriaLabelText
          ? props.completeAriaLabelText
          : mergedLocale.lang!.completeAriaLabelText
      );
      setScrollDownAriaLabelText(
        props.scrollDownAriaLabelText
          ? props.scrollDownAriaLabelText
          : mergedLocale.lang!.scrollDownAriaLabelText
      );
      setScrollLeftAriaLabelText(
        props.scrollLeftAriaLabelText
          ? props.scrollLeftAriaLabelText
          : mergedLocale.lang!.scrollLeftAriaLabelText
      );
      setScrollRightAriaLabelText(
        props.scrollRightAriaLabelText
          ? props.scrollRightAriaLabelText
          : mergedLocale.lang!.scrollRightAriaLabelText
      );
      setScrollUpAriaLabelText(
        props.scrollUpAriaLabelText
          ? props.scrollUpAriaLabelText
          : mergedLocale.lang!.scrollUpAriaLabelText
      );
      setNavigateToStepAriaLabelText(
        props.navigateToStepAriaLabelText
          ? props.navigateToStepAriaLabelText
          : mergedLocale.lang!.navigateToStepAriaLabelText
      );
    }, [mergedLocale]);

    const innerSeparatorClassNames: string = mergeClasses([
      styles.innerSeparator,
      {
        [styles.dash]: lineStyle === StepperLineStyle.Dash,
        [styles.dot]: lineStyle === StepperLineStyle.Dot,
        [styles.solid]: lineStyle === StepperLineStyle.Solid,
        [styles.timeline]: variant === StepperVariant.Timeline,
      },
    ]);

    const stepperClassNames: string = mergeClasses([
      styles.stepper,
      {
        [styles.timeline]: variant === StepperVariant.Timeline,
        [styles.gradient]: mergedGradient,
        [styles.medium]: size === StepperSize.Medium,
        [styles.small]: size === StepperSize.Small,
        [styles.vertical]: layout === 'vertical',
        [styles.stepperRtl]: htmlDir === 'rtl',
      },
      classNames,
    ]);

    const stepSizeToIconSizeMap = new Map<StepSize, IconSize>([
      [StepSize.Large, IconSize.Large],
      [StepSize.Medium, IconSize.Medium],
      [StepSize.Small, IconSize.Small],
    ]);

    const getIcon = (
      customIcon: IconName,
      active?: boolean,
      complete?: boolean
    ): IconName => {
      let icon: IconName;
      if (active || complete) {
        icon = customIcon ? customIcon : IconName.mdiCircle;
      } else {
        icon = customIcon ? customIcon : IconName.mdiCircleOutline;
      }
      return icon;
    };

    const circle = (
      index: number,
      classes: string,
      complete: boolean,
      size: StepSize,
      active?: boolean,
      icon?: IconName
    ): JSX.Element => {
      if (variant === StepperVariant.Default) {
        return <div className={classes}>{index + 1}</div>;
      }
      return (
        <div className={classes}>
          <Icon
            path={getIcon(icon, active, complete)}
            size={stepSizeToIconSizeMap.get(size)}
            classNames={styles.checkIcon}
          />
        </div>
      );
    };

    const handleOnClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      index?: number
    ): void => {
      setCurrentActiveStep(index);
      onChange?.(index, event);
    };

    const scrollToSectionAndFocus = useCallback(
      (targetSectionId: string) => {
        if (!enableScrollToSection || !targetSectionId) return;

        const sectionElement = document.getElementById(
          targetSectionId
        ) as HTMLElement;

        if (!sectionElement) return;

        sectionElement.scrollIntoView({ behavior: 'smooth' });

        if (scrollFocusTimeout) {
          clearTimeout(scrollFocusTimeout);
        }

        scrollFocusTimeout = setTimeout(() => {
          const focusableElements = Array.from(
            sectionElement.querySelectorAll(SELECTORS)
          ).filter((el: HTMLElement) => focusable(el));

          if (focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          } else {
            sectionElement.focus();
          }
        }, 100);
      },
      [enableScrollToSection]
    );

    const handleStepContentKeyDown = (
      event: React.KeyboardEvent<HTMLElement>,
      targetSectionId: string
    ): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToSectionAndFocus(targetSectionId);
      }
    };

    const handleScroll = (): void => {
      const steps: HTMLDivElement = stepsContainerRef.current;
      if (layout === 'horizontal') {
        setNextDisabled(
          htmlDir === 'rtl'
            ? steps?.scrollLeft === steps?.offsetWidth - steps?.scrollWidth
            : Math.abs(
                steps?.scrollWidth - steps?.offsetWidth - steps?.scrollLeft
              ) < 1
        );
        setPreviousDisabled(steps?.scrollLeft === 0);
      } else {
        setNextDisabled(
          Math.abs(
            steps?.scrollHeight - steps?.offsetHeight - steps?.scrollTop
          ) < 1
        );
        setPreviousDisabled(steps?.scrollTop === 0);
      }
    };

    const onNextClick = (_event: React.MouseEvent<HTMLButtonElement>): void => {
      if (layout === 'horizontal') {
        stepsContainerRef.current?.scrollBy({
          left: stepsContainerRef.current?.offsetWidth,
          behavior: 'smooth',
        });
      } else {
        stepsContainerRef.current?.scrollBy({
          top: stepsContainerRef.current?.offsetHeight,
          behavior: 'smooth',
        });
      }
    };

    const onPreviousClick = (
      _event: React.MouseEvent<HTMLButtonElement>
    ): void => {
      if (layout === 'horizontal') {
        stepsContainerRef.current?.scrollBy({
          left: -stepsContainerRef.current?.offsetWidth,
          behavior: 'smooth',
        });
      } else {
        stepsContainerRef.current?.scrollBy({
          top: -stepsContainerRef.current?.offsetHeight,
          behavior: 'smooth',
        });
      }
    };

    const stepSizeToButtonSizeMap = new Map<StepSize, ButtonSize>([
      [StepSize.Large, ButtonSize.Large],
      [StepSize.Medium, ButtonSize.Medium],
      [StepSize.Small, ButtonSize.Small],
    ]);

    const defaultButton = (
      index: number,
      complete: boolean,
      size: StepSize,
      active?: boolean,
      ariaLabel?: string,
      icon?: IconName,
      status?: StepperValidationStatus,
      theme?: StepperThemeName
    ): JSX.Element => (
      <Button
        ariaLabel={ariaLabel}
        classNames={mergeClasses([
          styles.circleButton,
          styles.circleDefaultButton,
          { [styles.active]: !!active },
          (styles as any)[`${size}`],
          (styles as any)[`${theme}`],
          (styles as any)[`${status}`],
        ])}
        configContextProps={configContextProps}
        gradient={mergedGradient}
        iconProps={
          active && showActiveStepIndex
            ? null
            : {
                path: getIcon(icon, active, complete),
                classNames: styles.checkIcon,
              }
        }
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleOnClick(event, index)
        }
        shape={ButtonShape.Round}
        size={stepSizeToButtonSizeMap.get(size)}
        theme={theme}
        themeContainerId={themeContainerId}
        text={active && showActiveStepIndex ? `${index + 1}` : null}
      />
    );

    const primaryButton = (
      index: number,
      complete: boolean,
      size: StepSize,
      active?: boolean,
      status?: StepperValidationStatus,
      theme?: StepperThemeName
    ): JSX.Element => (
      <Button
        ariaLabel={
          complete
            ? htmlDir === 'rtl'
              ? `${completeAriaLabelText} ${index + 1}`
              : `${index + 1} ${completeAriaLabelText}`
            : `${index + 1}`
        }
        classNames={mergeClasses([
          styles.circleButton,
          styles.circlePrimaryButton,
          { [styles.active]: !!active },
          { [styles.complete]: !!complete },
          (styles as any)[`${size}`],
          (styles as any)[`${theme}`],
          (styles as any)[`${status}`],
        ])}
        configContextProps={configContextProps}
        gradient={mergedGradient}
        iconProps={
          complete
            ? {
                path: IconName.mdiCheck,
                classNames: styles.checkIcon,
              }
            : null
        }
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleOnClick(event, index)
        }
        shape={ButtonShape.Round}
        size={stepSizeToButtonSizeMap.get(size)}
        text={complete ? null : `${index + 1}`}
        theme={theme}
        themeContainerId={themeContainerId}
        variant={ButtonVariant.Primary}
      />
    );

    const secondaryButton = (
      index: number,
      size: StepSize,
      status?: StepperValidationStatus,
      theme?: StepperThemeName
    ): JSX.Element => (
      <Button
        ariaLabel={`${index + 1}`}
        classNames={mergeClasses([
          styles.circleButton,
          styles.circleSecondaryButton,
          (styles as any)[`${size}`],
          (styles as any)[`${theme}`],
          (styles as any)[`${status}`],
        ])}
        configContextProps={configContextProps}
        gradient={mergedGradient}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleOnClick(event, index)
        }
        shape={ButtonShape.Round}
        size={stepSizeToButtonSizeMap.get(size)}
        text={`${index + 1}`}
        theme={theme}
        themeContainerId={themeContainerId}
        variant={ButtonVariant.Secondary}
      />
    );

    const nextAriaLabel = (): string => {
      let labelText: string;
      if (layout === 'horizontal') {
        if (htmlDir === 'rtl') {
          labelText = scrollLeftAriaLabelText;
        } else {
          labelText = scrollRightAriaLabelText;
        }
      } else {
        labelText = scrollDownAriaLabelText;
      }
      return labelText;
    };

    const previousAriaLabel = (): string => {
      let labelText: string;
      if (layout === 'horizontal') {
        if (htmlDir === 'rtl') {
          labelText = scrollRightAriaLabelText;
        } else {
          labelText = scrollLeftAriaLabelText;
        }
      } else {
        labelText = scrollUpAriaLabelText;
      }
      return labelText;
    };

    // Takes the unique size of each step and returns a combined value
    // used to determine the overall layout of the Stepper.
    const getCombinedStepSize = (current: StepSize): StepSize => {
      let size: StepSize;
      steps?.forEach((step: Step) => {
        if (step.size === StepSize.Medium && current !== StepSize.Medium) {
          size = StepSize.Medium;
        } else if (step.size === StepSize.Large && current !== StepSize.Large) {
          size = StepSize.Large;
        }
      });
      return size;
    };

    const updateLayout = (): void => {
      const steps: HTMLUListElement = stepsRef.current;

      if (layout === 'horizontal') {
        setScrollable(steps?.scrollWidth > steps?.clientWidth);
      }

      if (layout === 'vertical') {
        setScrollable(steps?.scrollHeight > steps?.clientHeight);
      }

      handleScroll();
    };

    useLayoutEffect(() => {
      updateLayout();
    }, [mergedScrollable, steps]);

    useLayoutEffect(() => {
      if (scrollToActiveStep && currentActiveStepRef.current) {
        currentActiveStepRef.current.scrollIntoView({
          behavior: 'smooth',
          ...(layout === 'horizontal'
            ? {
                inline: 'start',
                block: 'nearest',
              }
            : {
                inline: 'nearest',
                block: 'start',
              }),
        });
      }
    }, []);

    return (
      <LocaleReceiver componentName={'Stepper'} defaultLocale={enUS}>
        {(contextLocale: StepperLocale) => {
          const locale = { ...contextLocale, ...mergedLocale };

          return (
            <ResizeObserver onResize={updateLayout}>
              <div
                {...rest}
                className={stepperClassNames}
                ref={ref}
                style={{
                  height: height && layout === 'vertical' ? height : 'unset',
                  width: width && layout === 'horizontal' ? width : 'unset',
                }}
              >
                {mergedScrollable && (
                  <Button
                    ariaLabel={previousAriaLabel()}
                    classNames={styles.previous}
                    configContextProps={configContextProps}
                    disabled={previousDisabled}
                    gradient={mergedGradient}
                    iconProps={{
                      path:
                        htmlDir === 'rtl'
                          ? IconName.mdiChevronRight
                          : IconName.mdiChevronLeft,
                      classNames: styles.checkIcon,
                    }}
                    onClick={
                      htmlDir === 'rtl' && layout === 'horizontal'
                        ? onNextClick
                        : onPreviousClick
                    }
                    shape={ButtonShape.Round}
                    size={ButtonSize.Large}
                    theme={theme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Neutral}
                  />
                )}
                <div
                  className={mergeClasses([
                    styles.stepsContainer,
                    stepsContainerProps?.classNames,
                  ])}
                  onScroll={(e) => {
                    handleScroll();
                    stepsContainerProps?.onScroll?.(e);
                  }}
                  ref={stepsContainerRef}
                  tabIndex={mergedScrollable ? 0 : null}
                  {...stepsContainerProps}
                >
                  <ul className={styles.steps} ref={stepsRef}>
                    {steps.map((step: Step, index: number) => {
                      const combinedStepSize: StepSize = getCombinedStepSize(
                        step.size
                      );
                      const mergedTheme: StepperThemeName = step.theme ?? theme;
                      const mergedStatus: StepperValidationStatus =
                        step.status ?? status;
                      let stepItem: JSX.Element;
                      let nodeAriaLabel: string = !step.nodeAriaLabelText
                        ? locale!.lang.nodeAriaLabelText
                        : step.nodeAriaLabelText;
                      if (variant === StepperVariant.Timeline && !step.size) {
                        step.size = StepSize.Small;
                      } else if (
                        variant === StepperVariant.Default &&
                        !step.size
                      ) {
                        step.size = StepSize.Large;
                      }
                      if (index < currentActiveStep) {
                        stepItem = (
                          <>
                            {readonly && (
                              <div
                                className={mergeClasses([
                                  styles.circle,
                                  styles.complete,
                                  (styles as any)[`${mergedTheme}`],
                                  (styles as any)[`${mergedStatus}`],
                                  (styles as any)[`${step.size}`],
                                ])}
                              >
                                <Icon
                                  path={
                                    variant === StepperVariant.Timeline
                                      ? step.nodeIcon
                                        ? step.nodeIcon
                                        : IconName.mdiCircle
                                      : IconName.mdiCheck
                                  }
                                  size={stepSizeToIconSizeMap.get(step.size)}
                                  classNames={styles.checkIcon}
                                />
                              </div>
                            )}
                            {!readonly && variant === StepperVariant.Default && (
                              <>
                                {!step.complete &&
                                  secondaryButton(
                                    index,
                                    step.size,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                                {step.complete &&
                                  primaryButton(
                                    index,
                                    step.complete,
                                    step.size,
                                    false,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                              </>
                            )}
                            {!readonly &&
                              variant === StepperVariant.Timeline &&
                              defaultButton(
                                index,
                                step.complete,
                                step.size,
                                false,
                                nodeAriaLabel,
                                step.nodeIcon,
                                mergedStatus,
                                mergedTheme
                              )}
                            {size === StepperSize.Medium && (
                              <div
                                className={mergeClasses([
                                  styles.contentInner,
                                  (styles as any)[`${combinedStepSize}`],
                                ])}
                                {...(enableScrollToSection && {
                                  role: 'button',
                                  'aria-label': `${navigateToStepAriaLabelText} ${
                                    index + 1
                                  }`,
                                  onClick: () =>
                                    scrollToSectionAndFocus(step.sectionId),
                                  onKeyDown: (event) =>
                                    handleStepContentKeyDown(
                                      event,
                                      step.sectionId
                                    ),
                                })}
                              >
                                {step.content}
                              </div>
                            )}
                          </>
                        );
                      } else if (index === currentActiveStep) {
                        stepItem = (
                          <>
                            {readonly &&
                              circle(
                                index,
                                mergeClasses([
                                  styles.circle,
                                  styles.active,
                                  (styles as any)[`${mergedTheme}`],
                                  (styles as any)[`${mergedStatus}`],
                                  (styles as any)[`${step.size}`],
                                ]),
                                step.complete,
                                step.size,
                                true,
                                step.nodeIcon
                              )}
                            {!readonly &&
                              variant === StepperVariant.Default &&
                              primaryButton(
                                index,
                                step.complete,
                                step.size,
                                true,
                                mergedStatus,
                                mergedTheme
                              )}
                            {!readonly &&
                              variant === StepperVariant.Timeline &&
                              defaultButton(
                                index,
                                step.complete,
                                step.size,
                                true,
                                nodeAriaLabel,
                                step.nodeIcon,
                                mergedStatus,
                                mergedTheme
                              )}
                            <div
                              className={mergeClasses([
                                styles.contentInner,
                                (styles as any)[`${combinedStepSize}`],
                              ])}
                              {...(enableScrollToSection && {
                                role: 'button',
                                'aria-label': `${navigateToStepAriaLabelText} ${
                                  index + 1
                                }`,
                                onClick: () =>
                                  scrollToSectionAndFocus(step.sectionId),
                                onKeyDown: (event) =>
                                  handleStepContentKeyDown(
                                    event,
                                    step.sectionId
                                  ),
                              })}
                            >
                              {step.content}
                            </div>
                          </>
                        );
                      } else {
                        stepItem = (
                          <>
                            {readonly &&
                              circle(
                                index,
                                mergeClasses([
                                  styles.circle,
                                  (styles as any)[`${mergedTheme}`],
                                  (styles as any)[`${mergedStatus}`],
                                  (styles as any)[`${step.size}`],
                                ]),
                                step.complete,
                                step.size,
                                false,
                                step.nodeIcon
                              )}
                            {!readonly && variant === StepperVariant.Default && (
                              <>
                                {!step.complete &&
                                  required &&
                                  index > activeStepIndex &&
                                  circle(
                                    index,
                                    mergeClasses([
                                      styles.circle,
                                      (styles as any)[`${mergedTheme}`],
                                      (styles as any)[`${mergedStatus}`],
                                      (styles as any)[`${step.size}`],
                                    ]),
                                    step.complete,
                                    step.size,
                                    false,
                                    step.nodeIcon
                                  )}
                                {!step.complete &&
                                  !required &&
                                  secondaryButton(
                                    index,
                                    step.size,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                                {!step.complete &&
                                  required &&
                                  index <= activeStepIndex &&
                                  secondaryButton(
                                    index,
                                    step.size,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                                {step.complete &&
                                  primaryButton(
                                    index,
                                    step.complete,
                                    step.size,
                                    false,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                              </>
                            )}
                            {!readonly && variant === StepperVariant.Timeline && (
                              <>
                                {!step.complete &&
                                  required &&
                                  index > activeStepIndex &&
                                  circle(
                                    index,
                                    mergeClasses([
                                      styles.circle,
                                      (styles as any)[`${mergedTheme}`],
                                      (styles as any)[`${mergedStatus}`],
                                      (styles as any)[`${step.size}`],
                                    ]),
                                    step.complete,
                                    step.size,
                                    false,
                                    step.nodeIcon
                                  )}
                                {!step.complete &&
                                  !required &&
                                  defaultButton(
                                    index,
                                    step.complete,
                                    step.size,
                                    false,
                                    nodeAriaLabel,
                                    step.nodeIcon,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                                {!step.complete &&
                                  required &&
                                  index <= activeStepIndex &&
                                  defaultButton(
                                    index,
                                    step.complete,
                                    step.size,
                                    false,
                                    nodeAriaLabel,
                                    step.nodeIcon,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                                {step.complete &&
                                  defaultButton(
                                    index,
                                    step.complete,
                                    step.size,
                                    false,
                                    nodeAriaLabel,
                                    step.nodeIcon,
                                    mergedStatus,
                                    mergedTheme
                                  )}
                              </>
                            )}
                            {size === StepperSize.Medium && (
                              <div
                                className={mergeClasses([
                                  styles.contentInner,
                                  (styles as any)[`${combinedStepSize}`],
                                ])}
                                {...(enableScrollToSection && {
                                  role: 'button',
                                  'aria-label': `${navigateToStepAriaLabelText} ${
                                    index + 1
                                  }`,
                                  onClick: () =>
                                    scrollToSectionAndFocus(step.sectionId),
                                  onKeyDown: (event) =>
                                    handleStepContentKeyDown(
                                      event,
                                      step.sectionId
                                    ),
                                })}
                              >
                                {step.content}
                              </div>
                            )}
                          </>
                        );
                      }
                      return (
                        <React.Fragment key={index}>
                          {index > 0 &&
                            size === StepperSize.Small &&
                            layout === 'horizontal' && (
                              <hr
                                aria-hidden="true"
                                className={mergeClasses([
                                  styles.separator,
                                  {
                                    [styles.dash]:
                                      lineStyle === StepperLineStyle.Dash,
                                    [styles.dot]:
                                      lineStyle === StepperLineStyle.Dot,
                                    [styles.solid]:
                                      lineStyle === StepperLineStyle.Solid,
                                    [styles.timeline]:
                                      variant === StepperVariant.Timeline,
                                  },
                                  (styles as any)[`${step.size}`],
                                  (styles as any)[`${theme}`],
                                  (styles as any)[`${status}`],
                                ])}
                              />
                            )}
                          <li className={styles.step}>
                            {layout === 'vertical' && (
                              <hr
                                role="presentation"
                                className={mergeClasses([
                                  innerSeparatorClassNames,
                                  (styles as any)[`${step.size}`],
                                  (styles as any)[`${theme}`],
                                  (styles as any)[`${status}`],
                                ])}
                              />
                            )}
                            {size !== StepperSize.Small && (
                              <hr
                                role="presentation"
                                className={mergeClasses([
                                  innerSeparatorClassNames,
                                  (styles as any)[`${step.size}`],
                                  (styles as any)[`${theme}`],
                                  (styles as any)[`${status}`],
                                ])}
                              />
                            )}
                            <div
                              className={styles.content}
                              ref={
                                index === currentActiveStep &&
                                currentActiveStepRef
                              }
                            >
                              {stepItem}
                            </div>
                          </li>
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
                {mergedScrollable && (
                  <Button
                    ariaLabel={nextAriaLabel()}
                    classNames={styles.next}
                    configContextProps={configContextProps}
                    disabled={nextDisabled}
                    gradient={mergedGradient}
                    iconProps={{
                      path:
                        htmlDir === 'rtl'
                          ? IconName.mdiChevronLeft
                          : IconName.mdiChevronRight,
                      classNames: styles.checkIcon,
                    }}
                    onClick={
                      htmlDir === 'rtl' && layout === 'horizontal'
                        ? onPreviousClick
                        : onNextClick
                    }
                    shape={ButtonShape.Round}
                    size={ButtonSize.Large}
                    theme={theme}
                    themeContainerId={themeContainerId}
                    variant={ButtonVariant.Neutral}
                  />
                )}
              </div>
            </ResizeObserver>
          );
        }}
      </LocaleReceiver>
    );
  }
);
