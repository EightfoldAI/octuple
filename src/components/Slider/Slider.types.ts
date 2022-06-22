import { OcBaseProps } from '../OcBase';

export interface SliderMarker {
    /**
     * The step value of the marker.
     */
    value: number;
    /**
     * The left offset position for the marker. ex: "96px"
     */
    offset: string;
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
     * be extended to provide explicit markers to change the behavior..
     * @default false
     */
    showMarkers?: boolean;
}

export interface SliderInputProps
    extends Omit<OcBaseProps<HTMLInputElement>, 'onChange' | 'value'> {
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
     * The input disabled state.
     * @default false
     */
    disabled?: boolean;
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
     * The maximum value of the slider.
     * @default 0
     */
    min?: number;
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
     * Selected values must be a multiple of step.
     * @default 1
     */
    step?: number;
    /**
     * The current slider value. Provide an array for range slider.
     */
    value: number | number[];
}
