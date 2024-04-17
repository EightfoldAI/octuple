'use client';

import React, {
  FC,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import GradientContext, { Gradient } from '../ConfigProvider/GradientContext';
import { OcThemeName } from '../ConfigProvider';
import ThemeContext, {
  ThemeContextProvider,
} from '../ConfigProvider/ThemeContext';
import {
  AccordionBodyProps,
  AccordionProps,
  AccordionShape,
  AccordionSize,
  AccordionSummaryProps,
} from './';
import { Badge } from '../Badge';
import { Button, ButtonShape, ButtonVariant } from '../Button';
import { Icon, IconName } from '../Icon';
import { eventKeys, mergeClasses, uniqueId } from '../../shared/utilities';

import styles from './accordion.module.scss';
import themedComponentStyles from './accordion.theme.module.scss';

const ANIMATION_DURATION: number = 400;

export const AccordionSummary: FC<AccordionSummaryProps> = ({
  badgeProps,
  children,
  classNames,
  disabled,
  expandButtonProps,
  expanded,
  expandIconProps,
  fullWidth = false,
  gradient,
  iconProps,
  id,
  onIconButtonClick,
  onClick,
  size,
  ...rest
}) => {
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

  return (
    <div
      aria-expanded={expanded}
      aria-controls={`${id}-content`}
      className={headerClassnames}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      id={`${id}-header`}
      role="button"
      tabIndex={0}
      {...rest}
    >
      <div className={styles.accordionHeaderContainer}>
        {iconProps && <Icon {...iconProps} />}
        <span className={styles.accordionHeader}>{children}</span>
        {badgeProps && <Badge classNames={styles.badge} {...badgeProps} />}
      </div>
      <Button
        {...expandButtonProps}
        disabled={disabled}
        gradient={gradient}
        iconProps={{ classNames: iconButtonClassNames, ...expandIconProps }}
        onClick={onIconButtonClick}
        onKeyDown={handleKeyDown}
        shape={ButtonShape.Round}
        variant={gradient ? ButtonVariant.Secondary : ButtonVariant.Neutral}
        {...expandButtonProps}
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
  (
    {
      badgeProps,
      bodyProps,
      bordered = true,
      children,
      classNames,
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      disabled,
      expandButtonProps,
      expanded = false,
      expandIconProps = { path: IconName.mdiChevronDown },
      gradient = false,
      headerProps,
      iconProps,
      id = uniqueId('accordion-'),
      onAccordionChange,
      renderContentAlways = true,
      shape = AccordionShape.Pill,
      size = AccordionSize.Large,
      summary,
      theme,
      themeContainerId,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
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
      },
      classNames
    );

    return (
      <ThemeContextProvider
        componentClassName={themedComponentStyles.theme}
        containerId={themeContainerId}
        theme={mergedTheme}
      >
        <div className={accordionContainerStyle} ref={ref} {...rest}>
          <AccordionSummary
            badgeProps={badgeProps}
            disabled={disabled}
            expanded={isExpanded}
            expandIconProps={expandIconProps}
            expandButtonProps={expandButtonProps}
            gradient={gradient}
            iconProps={iconProps}
            id={id}
            onIconButtonClick={() => toggleAccordion(!isExpanded)}
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
  }
);
