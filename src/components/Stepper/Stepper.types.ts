import React from 'react';
import { ConfigContextProps, OcThemeName } from '../ConfigProvider';
import { OcBaseProps } from '../OcBase';
import { IconName } from '../Icon';
import { InputStatus } from '../../shared/utilities';

export type SelectStepEvent<E = HTMLElement> =
  | React.MouseEvent<E>
  | React.KeyboardEvent<E>;

export type StepIndex = number;

export type OnChangeHandler = (
  index: StepIndex,
  event: SelectStepEvent
) => void;

export type ItemLayout = 'horizontal' | 'vertical';

export enum StepSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum StepperSize {
  Medium = 'medium',
  Small = 'small',
}

export enum StepperVariant {
  Default = 'default',
  Timeline = 'timeline',
}

export enum StepperLineStyle {
  Dash = 'dash',
  Dot = 'dot',
  Solid = 'solid',
}

export type StepperThemeName = OcThemeName;
export type StepperValidationStatus = InputStatus;

type Locale = {
  /**
   * The Stepper locale.
   */
  locale: string;
  /**
   * The Stepper `complete` button aria label string.
   */
  completeAriaLabelText?: string;
  /**
   * The Stepper `Node` button aria label string.
   */
  nodeAriaLabelText?: string;
  /**
   * The Stepper `Scroll down` button aria label string.
   */
  scrollDownAriaLabelText?: string;
  /**
   * The Stepper `Scroll left` button aria label string.
   */
  scrollLeftAriaLabelText?: string;
  /**
   * The Stepper `Scroll right` button aria label string.
   */
  scrollRightAriaLabelText?: string;
  /**
   * The Stepper `Scroll up` button aria label string.
   */
  scrollUpAriaLabelText?: string;
};

export type StepperLocale = {
  lang: Locale;
};

export interface Step extends OcBaseProps<HTMLDivElement> {
  /**
   * Whether the Step is complete.
   * Use when the Stepper isn't readonly.
   */
  complete?: boolean;
  /**
   * The Stepper custom `complete` button aria label string.
   */
  completeAriaLabelText?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The Step content.
   */
  content?: React.ReactNode;
  /**
   * The Step gradient state.
   * @default false
   */
  gradient?: boolean;
  /*
   * The Step index.
   */
  index?: StepIndex;
  /**
   * The Stepper custom `Node` button aria label string.
   * Used when `variant` is StepperVariant.Timeline.
   * @default 'Node'
   */
  nodeAriaLabelText?: string;
  /**
   * The Stepper custom `Node` button icon.
   * Used when `variant` is StepperVariant.Timeline.
   */
  nodeIcon?: IconName;
  /**
   * The individual Step size.
   * The default depends on the chosen variant:
   * StepSize.Large for Default
   * StepSize.Small for Timeline
   */
  size?: StepSize;
  /**
   * The validation status.
   */
  status?: StepperValidationStatus;
  /**
   * Custom Step style.
   */
  style?: React.CSSProperties;
  /**
   * Theme of the step.
   */
  theme?: StepperThemeName;
  /**
   * Theme container of the step button.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
}

export interface StepperProps
  extends Omit<OcBaseProps<HTMLDivElement>, 'onChange'> {
  /**
   * The currently active Step index.
   * Use when readonly is false.
   * Maintains clickability of active step.
   */
  activeStepIndex?: StepIndex;
  /**
   * The Stepper `complete` button aria label string.
   * Used when `variant` is StepperVariant.Default.
   * @default 'complete'
   */
  completeAriaLabelText?: string;
  /**
   * Configure how contextual props are consumed
   */
  configContextProps?: ConfigContextProps;
  /**
   * The Stepper gradient state.
   * @default false
   */
  gradient?: boolean;
  /**
   * The Stepper height.
   * Use when layout is `vertical`.
   */
  height?: number;
  /**
   * The Step index.
   */
  index?: StepIndex;
  /**
   * The Stepper layout direction.
   * @default horizontal
   */
  layout?: ItemLayout;
  /**
   * The optional Stepper line style.
   * Options: `dash`, `dot`, `solid`
   */
  lineStyle?: StepperLineStyle;
  /**
   * The Stepper locale.
   * @default 'enUS'
   */
  locale?: StepperLocale;
  /**
   * The onChange event handler.
   */
  onChange?: OnChangeHandler;
  /**
   * The Stepper is read only.
   * @default true
   */
  readonly?: boolean;
  /**
   * Each step is required, but previous are enabled.
   * Use when readonly is false.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the Stepper is scrollable.
   */
  scrollable?: boolean;
  /**
   * The Stepper `Scroll down` button aria label string.
   * @default 'Scroll down'
   */
  scrollDownAriaLabelText?: string;
  /**
   * The Stepper `Scroll left` button aria label string.
   * @default 'Scroll left'
   */
  scrollLeftAriaLabelText?: string;
  /**
   * The Stepper `Scroll right` button aria label string.
   * @default 'Scroll right'
   */
  scrollRightAriaLabelText?: string;
  /**
   * The Stepper `Scroll up` button aria label string.
   * @default 'Scroll up'
   */
  scrollUpAriaLabelText?: string;
  /**
   * Show active step index.
   * Use when step is an icon, but an index is desired for the active step.
   */
  showActiveStepIndex?: boolean;
  /**
   * The Stepper size.
   * @default StepperSize.Medium
   */
  size?: StepperSize;
  /**
   * The validation status.
   */
  status?: StepperValidationStatus;
  /**
   * The Stepper Steps.
   */
  steps?: Step[];
  /**
   * Theme of the Stepper.
   */
  theme?: StepperThemeName;
  /**
   * Theme container of the Stepper buttons.
   * Use with `theme` to generate a unique container or a common one.
   */
  themeContainerId?: string;
  /**
   * The Stepper variant.
   * options: Default, Timeline
   * @default StepperVariant.Default
   */
  variant?: StepperVariant;
  /**
   * The Stepper width.
   * Use when layout is `horizontal`.
   */
  width?: number;
  /**
   * Scroll to active step on load.
   * @default false
   */
  scrollToActiveStep?: boolean;
}
