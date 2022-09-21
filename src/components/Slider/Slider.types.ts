import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, Size } from '../ConfigProvider';

export enum SliderSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface SliderMarker {
    /**
     * The step value of the marker.
     */
    value: number;
}

export interface SliderProps extends SliderInputProps {
    /**
     * Indicates if the value should be displayed under the slider.
     * @default true
     */
    showLabels?: boolean;
    /**
     * Indicates if steps/markers should be displayed on the slider track.
     * NOTE: initial implementation will put a marker at each step. This could
     * be extended to provide explicit markers to change the behavior.
     * @default false
     */
    showMarkers?: boolean;
}

export interface SliderInputProps
    extends Omit<OcBaseProps<HTMLInputElement>, 'onChange' | 'value'> {
    /**
     * Allows focus on the slider when it's disabled.
     * @default false
     */
    allowDisabledFocus?: boolean;
    /**
     * The slider aria label text.
     */
    ariaLabel?: string;
    /**
     * The slider autoFocus attribute.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
    /**
     * The slider disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * The slider is a form item.
     * @default false
     */
    formItemInput?: boolean;
    /**
     * Hide the maximum value of the slider.
     * @default false
     */
    hideMax?: boolean;
    /**
     * Hide the minimum value of the slider.
     * @default false
     */
    hideMin?: boolean;
    /**
     * Hide the value of the slider.
     * @default false
     */
    hideValue?: boolean;
    /**
     * The input id.
     * NOTE: For range sliders, each input's id will have an index value added.
     */
    id?: string;
    /**
     * The maximum value of the slider.
     * @default 100
     */
    max?: number;
    /**
     * The custom maximum value label of the slider.
     */
    maxLabel?: string;
    /**
     * The minimum value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * The custom minimum value label of the slider.
     */
    minLabel?: string;
    /**
     * The input name.
     * NOTE: For range sliders, each input's name will have an index value added.
     */
    name?: string;
    /**
     * The input onChange event handler.
     */
    onChange?: (value: number | number[]) => void;
    /**
     * The slider size.
     * @default SliderSize.Medium
     */
    size?: SliderSize | Size;
    /**
     * Selected values must be a multiple of step.
     * @default 1
     */
    step?: number;
    /**
     * The current slider value. Provide an array for range slider.
     */
    value: number | number[];
    /**
     * The custom value label of the slider.
     */
    valueLabel?: string | string[];
}
