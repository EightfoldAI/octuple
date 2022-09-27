import { OcBaseProps } from '../OcBase';

export interface MatchScoreProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Aria label for the component
     */
    ariaLabel?: string;
    /**
     * Flag for hiding the label.
     * @default false
     */
    hideLabel?: boolean;
    /**
     * Flag for hiding the value labels.
     * @default false
     */
    hideValues?: boolean;
    /**
     * Custom label text.
     */
    label?: string;
    /**
     * The score value, like 2, 3.5, etc.
     * @default 0
     */
    score: number;
    /**
     * The maximum score value. This limits the number of score indicators.
     * @default 5
     */
    total?: number;
}

export type FillType = 'empty' | 'full' | 'half';
