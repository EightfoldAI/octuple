export interface SliderProps extends SliderInputProps {
    /**
     * Indicates if the value should be displayed under the slider.
     * @default true
     */
    showValue?: boolean;
}

export interface SliderInputProps {
    /**
     * Allows focus on the input when it's disabled.
     * @default false
     */
    allowDisabledFocus?: boolean;
    /**
     * The input aria label text.
     */
    ariaLabel?: string;
    /**
     * The input autoFocus attribute.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The input class names.
     */
    className?: string;
    /**
     * The input disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The input id.
     */
    id?: string;
    /**
     * The input name.
     */
    name?: string;
    /**
     * The maximum value of the slider.
     * @default 100
     */
    max?: number;
    /**
     * The maximum value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * The current slider value.
     */
    value: number;
}
