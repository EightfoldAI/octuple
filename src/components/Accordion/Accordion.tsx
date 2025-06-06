'use client';

import React, {
  FC,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName, ThemeNames } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  AccordionBodyProps,
  AccordionLocale,
  AccordionProps,
  AccordionShape,
  AccordionSize,
  AccordionSummaryProps,
} from './Accordion.types';
import { Badge } from '../Badge';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { Icon, IconName } from '../Icon';
import { eventKeys, mergeClasses, uniqueId } from '../../shared/utilities';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../LocaleProvider/LocaleReceiver';
import enUS from './Locale/en_US';

import styles from './accordion.module.scss';
import themedComponentStyles from './accordion.theme.module.scss';

const ANIMATION_DURATION: number = 400;

export const AccordionSummary: FC<AccordionSummaryProps> = ({
  badgeProps,
  children,
  classNames,
  collapseAriaLabelText,
  disabled,
  expandAriaLabelText,
  expandButtonDescribedBy,
  expandButtonProps,
  expanded,
  expandIconProps,
  fullWidth = false,
  gradient,
  iconProps,
  id,
  onClick,
  size,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.removeAttribute('aria-disabled');
    }
  }, []);

  const headerClassnames = mergeClasses([
    styles.accordionSummary,
    classNames,
    {
      [styles.accordionSummaryFullWidth]: fullWidth,
      [styles.medium]: size === AccordionSize.Medium,
      [styles.large]: size === AccordionSize.Large,
      [styles.accordionSummaryExpanded]: expanded,
      [styles.disabled]: disabled,
    },
  ]);

  const iconButtonClassNames: string = mergeClasses([
    styles.accordionIconButton,
    // Conditional classes can also be handled as follows
    { [styles.expandedIconButton]: expanded },
  ]);

  // to handle enter press on accordion header
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === eventKeys.ENTER || event.key === eventKeys.SPACE) {
        event.preventDefault();
        onClick?.(event);
      }
    },
    [onClick]
  );
  const { classNames: expandButtonClassNames = '', ...restExpandButtonProps } =
    expandButtonProps || {};

  const buttonClassNames: string = mergeClasses([
    styles.accordionIconButton,
    expandButtonClassNames,
  ]);

  return (
    <div className={headerClassnames} id={`${id}-header`} {...rest}>
      <div
        aria-controls={`${id}-content`}
        aria-expanded={expanded}
        aria-labelledby={expandButtonDescribedBy || `${id}-header-content`}
        className={styles.clickableArea}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      ></div>
      <div
        id={`${id}-header-content`}
        className={styles.accordionHeaderContainer}
      >
        {iconProps && <Icon {...iconProps} />}
        <div className={styles.accordionHeader}>
          {typeof children === 'string' ? <span>{children}</span> : children}
        </div>
        {badgeProps && <Badge classNames={styles.badge} {...badgeProps} />}
      </div>
      <Button
        data-testid="accordian-arrow-button"
        ref={buttonRef}
        tabIndex={-1}
        gradient={gradient}
        classNames={buttonClassNames}
        iconProps={{ classNames: iconButtonClassNames, ...expandIconProps }}
        shape={ButtonShape.Round}
        disabled
        variant={gradient ? ButtonVariant.Secondary : ButtonVariant.Neutral}
        aria-hidden={true}
        {...restExpandButtonProps}
      />
    </div>
  );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
  bordered = true,
  children,
  classNames,
  expanded,
  gradient,
  id,
  size,
  renderContentAlways,
  ...rest
}) => {
  const [shouldRenderContent, setShouldRenderContent] =
    useState<boolean>(renderContentAlways);

  let timeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (renderContentAlways) {
      setShouldRenderContent(true);
    } else if (expanded) {
      setShouldRenderContent(true);
      if (timeout) clearTimeout(timeout);
    } else {
      timeout = setTimeout(() => {
        setShouldRenderContent(false);
      }, ANIMATION_DURATION);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [expanded, renderContentAlways]);

  const accordionBodyContainerStyles: string = mergeClasses(
    styles.accordionBodyContainer,
    { [styles.show]: expanded }
  );

  const accordionBodyStyles: string = mergeClasses(
    styles.accordionBody,
    {
      [styles.show]: expanded,
      [styles.borderTop]: bordered,
      [styles.medium]: size === AccordionSize.Medium,
      [styles.large]: size === AccordionSize.Large,
    },
    classNames
  );

  return (
    <div
      aria-labelledby={`${id}-header`}
      className={accordionBodyContainerStyles}
      id={`${id}-content`}
      role="region"
      {...rest}
    >
      <div className={accordionBodyStyles}>
        {shouldRenderContent && children}
      </div>
    </div>
  );
};

export const Accordion: FC<AccordionProps> = React.forwardRef(
  (props: AccordionProps, ref: Ref<HTMLDivElement>) => {
    const {
      badgeProps,
      bodyProps,
      bordered = true,
      children,
      classNames,
      collapseAriaLabelText: defaultCollapseAriaLabelText,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      disabled,
      expandAriaLabelText: defaultExpandAriaLabelText,
      expandButtonProps,
      expanded = false,
      expandIconProps = { path: IconName.mdiChevronDown },
      gradient = false,
      headerProps,
      iconProps,
      id = uniqueId('accordion-'),
      locale = enUS,
      onAccordionChange,
      renderContentAlways = true,
      shape = AccordionShape.Pill,
      size = AccordionSize.Large,
      summary,
      theme,
      themeContainerId,
      ...rest
    } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

    const contextualGradient: Gradient = useContext(GradientContext);
    const mergedGradient: boolean = configContextProps.noGradientContext
      ? gradient
      : contextualGradient || gradient;

    const contextualTheme: OcThemeName = useContext(ThemeContext);
    const mergedTheme: OcThemeName = configContextProps.noThemeContext
      ? theme
      : contextualTheme || theme;

    useEffect(() => {
      setIsExpanded(expanded);
    }, [expanded]);

    // ============================ Strings ===========================
    const [accordionLocale] = useLocaleReceiver('Accordion');
    let mergedLocale: AccordionLocale;

    if (props.locale) {
      mergedLocale = props.locale;
    } else {
      mergedLocale = accordionLocale || props.locale;
    }

    const [collapseAriaLabelText, setCollapseAriaLabelText] = useState<string>(
      defaultCollapseAriaLabelText
    );
    const [expandAriaLabelText, setExpandAriaLabelText] = useState<string>(
      defaultExpandAriaLabelText
    );

    // Locs: if the prop isn't provided use the loc defaults.
    // If the mergedLocale is changed, update.
    useEffect(() => {
      setCollapseAriaLabelText(
        props.collapseAriaLabelText
          ? props.collapseAriaLabelText
          : mergedLocale.lang!.collapseAriaLabelText
      );
      setExpandAriaLabelText(
        props.expandAriaLabelText
          ? props.expandAriaLabelText
          : mergedLocale.lang!.expandAriaLabelText
      );
    }, [mergedLocale]);

    const toggleAccordion = (expand: boolean): void => {
      setIsExpanded(expand);
      onAccordionChange?.(expand);
    };

    const accordionContainerStyle: string = mergeClasses(
      styles.accordionContainer,
      {
        [styles.accordionBorder]: bordered,
        [styles.pill]: shape === AccordionShape.Pill,
        [styles.rectangle]: shape === AccordionShape.Rectangle,
        [themedComponentStyles.theme]: mergedTheme,
        [styles.gradient]: mergedGradient,
        [styles.aiAgent]: mergedTheme === ThemeNames.AIAgent,
      },
      classNames
    );

    return (
      <LocaleReceiver componentName={'Accordion'} defaultLocale={enUS}>
        {(_contextLocale: AccordionLocale) => {
          return (
            <ThemeContextProvider
              componentClassName={themedComponentStyles.theme}
              containerId={themeContainerId}
              theme={mergedTheme}
            >
              <div className={accordionContainerStyle} ref={ref} {...rest}>
                <AccordionSummary
                  badgeProps={badgeProps}
                  collapseAriaLabelText={collapseAriaLabelText}
                  disabled={disabled}
                  expandAriaLabelText={expandAriaLabelText}
                  expanded={isExpanded}
                  expandIconProps={expandIconProps}
                  expandButtonProps={expandButtonProps}
                  gradient={gradient}
                  iconProps={iconProps}
                  id={id}
                  onClick={() => toggleAccordion(!isExpanded)}
                  size={size}
                  {...headerProps}
                >
                  {summary}
                </AccordionSummary>
                <AccordionBody
                  bordered={bordered}
                  expanded={isExpanded}
                  gradient={gradient}
                  id={id}
                  renderContentAlways={renderContentAlways}
                  size={size}
                  {...bodyProps}
                >
                  {children}
                </AccordionBody>
              </div>
            </ThemeContextProvider>
          );
        }}
      </LocaleReceiver>
    );
  }
);
