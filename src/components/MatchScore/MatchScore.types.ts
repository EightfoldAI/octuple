export interface MatchScoreProps {
    /**
     * The input class names.
     */
    className?: string;

    /**
     * The score value, like 2, 3.5, etc.
     */
    score: number;

    /**
     * The maximum score value. This limits the number of score indicators.
     */
    total?: number;

    /**
     * Flag for hiding the lavel display.
     */
    hideLabel?: boolean;
}

export type FillType = 'empty' | 'full' | 'half';
