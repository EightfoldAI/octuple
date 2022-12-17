import React from 'react';
import { OcBaseProps } from '../OcBase';

export type SelectStepEvent<E = HTMLElement> =
    | React.MouseEvent<E>
    | React.KeyboardEvent<E>;

export type StepIndex = number;

export type OnChangeHandler = (
    index: StepIndex,
    event: SelectStepEvent
) => void;

export type ItemLayout = 'horizontal' | 'vertical';

export enum StepperSize {
    Medium = 'medium',
    Small = 'small',
}

export enum StepperVariant {
    Default = 'default',
    Timeline = 'timeline',
}

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
     * The Step index.
     */
    index?: StepIndex;
    /**
     * Whether the step is complete.
     * Use when the stepper isn't readonly.
     */
    complete?: boolean;
    /**
     * The Stepper custom `complete` button aria label string.
     */
    completeAriaLabelText?: string;
    /**
     * Step content.
     */
    content?: React.ReactNode;
    /**
     * The Stepper custom `Node` button aria label string.
     */
    nodeAriaLabelText?: string;
    /**
     * Custom Step style.
     */
    style?: React.CSSProperties;
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
     * The Stepper locale.
     * @default 'enUS'
     */
    locale?: StepperLocale;
    /**
     * The Stepper `Node` button aria label string.
     * Used when `variant` is StepperVariant.Timeline.
     * @default 'Node'
     */
    nodeAriaLabelText?: string;
    /**
     * The onChange event handler.
     */
    onChange?: OnChangeHandler;
    /**
     * The stepper is read only.
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
     * The Stepper size.
     */
    size?: StepperSize;
    /**
     * The Stepper Steps.
     */
    steps?: Step[];
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
}
