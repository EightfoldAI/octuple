import React, {
  FC,
  Ref,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Step,
  StepIndex,
  StepperLocale,
  StepperProps,
  StepperSize,
  StepperVariant,
} from './Stepper.types';
import {
  ButtonShape,
  ButtonSize,
  NeutralButton,
  PrimaryButton,
  SecondaryButton,
} from '../Button';
import { Icon, IconName, IconSize } from '../Icon';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';
import enUS from './Locale/en_US';

import styles from './stepper.module.scss';

export const Stepper: FC<StepperProps> = React.forwardRef(
  (props: StepperProps, ref: Ref<HTMLDivElement>) => {
    const {
      activeStepIndex = 0,
      completeAriaLabelText: defaultCompleteAriaLabelText,
      classNames,
      height,
      index = 0,
      layout = 'horizontal',
      locale = enUS,
      nodeAriaLabelText: defaultNodeAriaLabelText,
      onChange,
      readonly = true,
      required = false,
      scrollable,
      scrollDownAriaLabelText: defaultScrollDownAriaLabelText,
      scrollLeftAriaLabelText: defaultScrollLeftAriaLabelText,
      scrollRightAriaLabelText: defaultScrollRightAriaLabelText,
      scrollUpAriaLabelText: defaultScrollUpAriaLabelText,
      size = StepperSize.Medium,
      steps,
      style,
      variant = StepperVariant.Default,
      width,
      'data-test-id': dataTestId,
      ...rest
    } = props;
    const htmlDir: string = useCanvasDirection();

    const stepsContainerRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const stepsRef: React.MutableRefObject<HTMLUListElement> =
      useRef<HTMLUListElement>(null);
    const [currentActiveStep, setCurrentActiveStep] =
      useState<StepIndex>(index);
    const [_scrollable, setScrollable] = useState<boolean>(false);
    const [nextDisabled, setNextDisabled] = useState<boolean>(false);
    const [previousDisabled, setPreviousDisabled] = useState<boolean>(false);

    const mergedScrollabe: boolean = props.scrollable
      ? props.scrollable
      : _scrollable;

    useEffect(() => {
      setCurrentActiveStep(index);
    }, [index]);

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

    // TODO: Use when Timeline variant is ready
    const [nodeAriaLabelText, setNodeAriaLabelText] = useState<string>(
      defaultNodeAriaLabelText
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

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCompleteAriaLabelText(
        props.completeAriaLabelText
          ? props.completeAriaLabelText
          : mergedLocale.lang!.completeAriaLabelText
      );
      setNodeAriaLabelText(
        props.nodeAriaLabelText
          ? props.nodeAriaLabelText
          : mergedLocale.lang!.nodeAriaLabelText
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
    }, [mergedLocale]);

    const stepperClassNames: string = mergeClasses([
      styles.stepper,
      {
        [styles.medium]: size === StepperSize.Medium,
        [styles.small]: size === StepperSize.Small,
        [styles.vertical]: layout === 'vertical',
        [styles.stepperRtl]: htmlDir === 'rtl',
      },
    ]);

    const activeCircleClassNames: string = mergeClasses([
      styles.circle,
      styles.active,
    ]);

    const visitedCircleClassNames: string = mergeClasses([
      styles.circle,
      styles.visited,
    ]);

    const circle = (index: number, classes: string): JSX.Element => (
      <div className={classes}>{index + 1}</div>
    );

    const handleOnClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      index?: number
    ): void => {
      setCurrentActiveStep(index);
      onChange?.(index, event);
    };

    const handleScroll = (): void => {
      const steps: HTMLDivElement = stepsContainerRef.current;
      if (layout === 'horizontal') {
        setNextDisabled(
          htmlDir === 'rtl'
            ? steps?.scrollLeft === steps?.offsetWidth - steps?.scrollWidth
            : steps?.scrollLeft === steps?.scrollWidth - steps?.offsetWidth
        );
        setPreviousDisabled(steps?.scrollLeft === 0);
      } else {
        setNextDisabled(
          steps?.scrollTop === steps?.scrollHeight - steps?.offsetHeight
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

    const primaryButton = (
      index: number,
      complete: boolean,
      active?: boolean
    ): JSX.Element => (
      <PrimaryButton
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
        ])}
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
        size={ButtonSize.Large}
        text={complete ? null : `${index + 1}`}
      />
    );

    const secondaryButton = (index: number): JSX.Element => (
      <SecondaryButton
        ariaLabel={`${index + 1}`}
        classNames={styles.circleButton}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleOnClick(event, index)
        }
        shape={ButtonShape.Round}
        size={ButtonSize.Large}
        text={`${index + 1}`}
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
    }, [mergedScrollabe, steps]);

    return (
      <LocaleReceiver componentName={'Stepper'} defaultLocale={enUS}>
        {(_contextLocale: StepperLocale) => {
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
                {mergedScrollabe && (
                  <NeutralButton
                    ariaLabel={previousAriaLabel()}
                    classNames={styles.previous}
                    disabled={previousDisabled}
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
                  />
                )}
                <div
                  className={styles.stepsContainer}
                  onScroll={handleScroll}
                  ref={stepsContainerRef}
                >
                  <ul className={styles.steps} ref={stepsRef}>
                    {steps.map((step: Step, index: number) => {
                      let stepItem = null;
                      if (index < currentActiveStep) {
                        stepItem = (
                          <>
                            {readonly && (
                              <div className={visitedCircleClassNames}>
                                <Icon
                                  path={IconName.mdiCheck}
                                  size={IconSize.Large}
                                  classNames={styles.checkIcon}
                                />
                              </div>
                            )}
                            {!readonly && (
                              <>
                                {!step.complete && secondaryButton(index)}
                                {step.complete &&
                                  primaryButton(index, step.complete)}
                              </>
                            )}
                            {size === StepperSize.Medium && (
                              <div className={styles.contentInner}>
                                {step.content}
                              </div>
                            )}
                          </>
                        );
                      } else if (index === currentActiveStep) {
                        stepItem = (
                          <>
                            {readonly && circle(index, activeCircleClassNames)}
                            {!readonly &&
                              primaryButton(index, step.complete, true)}
                            <div className={styles.contentInner}>
                              {step.content}
                            </div>
                          </>
                        );
                      } else {
                        stepItem = (
                          <>
                            {readonly && circle(index, styles.circle)}
                            {!readonly && (
                              <>
                                {!step.complete &&
                                  required &&
                                  index > activeStepIndex &&
                                  circle(index, styles.circle)}
                                {!step.complete &&
                                  !required &&
                                  secondaryButton(index)}
                                {!step.complete &&
                                  required &&
                                  index <= activeStepIndex &&
                                  secondaryButton(index)}
                                {step.complete &&
                                  primaryButton(index, step.complete)}
                              </>
                            )}
                            {size === StepperSize.Medium && (
                              <div className={styles.contentInner}>
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
                              <hr className={styles.separator} />
                            )}
                          <li className={styles.step}>
                            {layout === 'vertical' && (
                              <hr className={styles.innerSeparator} />
                            )}
                            {size !== StepperSize.Small && (
                              <hr className={styles.innerSeparator} />
                            )}
                            <div className={styles.content}>{stepItem}</div>
                          </li>
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
                {mergedScrollabe && (
                  <NeutralButton
                    ariaLabel={nextAriaLabel()}
                    classNames={styles.next}
                    disabled={nextDisabled}
                    iconProps={{
                      path:
                        htmlDir === 'rtl'
                          ? IconName.mdiChevronLeft
                          : IconName.mdiChevronRight,
                      size: IconSize.Large,
                      classNames: styles.checkIcon,
                    }}
                    onClick={
                      htmlDir === 'rtl' && layout === 'horizontal'
                        ? onPreviousClick
                        : onNextClick
                    }
                    shape={ButtonShape.Round}
                    size={ButtonSize.Large}
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
