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

export const AccordionSummary: FC<AccordionSummaryProps> = ({
  children,
  expandButtonProps,
  expandIconProps,
  expanded,
  onClick,
  classNames,
  gradient,
  id,
  iconProps,
  badgeProps,
  size,
  disabled,
  ...rest
}) => {
  const headerClassnames = mergeClasses([
    styles.accordionSummary,
    classNames,
    {
      [styles.medium]: size === AccordionSize.Medium,
      [styles.large]: size === AccordionSize.Large,
      [styles.accordionSummaryExpanded]: expanded,
      [styles.disabled]: disabled,
    },
  ]);

  const iconStyles: string = mergeClasses([
    styles.accordionIcon,
    // Conditional classes can also be handled as follows
    { [styles.expandedIcon]: expanded },
  ]);

  // to handle enter press on accordion header
  const handleKeyDown = useCallback(
    (event) => {
      event.key === eventKeys.ENTER && onClick?.(event);
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
        disabled={disabled}
        gradient={gradient}
        iconProps={{ classNames: iconStyles, ...expandIconProps }}
        shape={ButtonShape.Round}
        variant={gradient ? ButtonVariant.Secondary : ButtonVariant.Neutral}
      />
    </div>
  );
};

export const AccordionBody: FC<AccordionBodyProps> = ({
  children,
  expanded,
  classNames,
  gradient,
  id,
  size,
  bordered = true,
  ...rest
}) => {
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
      <div className={accordionBodyStyles}>{children}</div>
    </div>
  );
};

export const Accordion: FC<AccordionProps> = React.forwardRef(
  (
    {
      configContextProps = {
        noGradientContext: false,
        noThemeContext: false,
      },
      expanded = false,
      onAccordionChange,
      classNames,
      summary,
      expandIconProps = { path: IconName.mdiChevronDown },
      expandButtonProps,
      children,
      gradient = false,
      id = uniqueId('accordion-'),
      headerProps,
      bodyProps,
      shape = AccordionShape.Pill,
      bordered = true,
      iconProps,
      badgeProps,
      size = AccordionSize.Large,
      theme,
      themeContainerId,
      disabled,
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
            onClick={() => toggleAccordion(!isExpanded)}
            size={size}
            {...headerProps}
          >
            {summary}
          </AccordionSummary>
          <AccordionBody
            id={id}
            expanded={isExpanded}
            size={size}
            bordered={bordered}
            gradient={gradient}
            {...bodyProps}
          >
            {children}
          </AccordionBody>
        </div>
      </ThemeContextProvider>
    );
  }
);
