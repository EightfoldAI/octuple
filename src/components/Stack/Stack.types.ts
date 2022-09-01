import { OcBaseProps } from '../OcBase';

export type StackDirection = 'vertical' | 'horizontal';

export type StackGap =
    | 'xxxs'
    | 'xxs'
    | 'xs'
    | 's'
    | 'm'
    | 'ml'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxl'
    | 'xxxl';

type StackIntrinsicProps = {
    /**
     * Direction type - horizontal or vertical
     */
    direction?: StackDirection;

    /**
     * Space between the child elements
     */
    gap?: StackGap;

    /**
     * Wrap behaviour for the stack
     */
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';

    /**
     * Enable stack as an inline element
     */
    inline?: boolean;

    /**
     * Assigns the stack 100% width
     */
    fullWidth?: boolean;

    /**
     * Align Items
     */
    align?:
        | 'stretch'
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'baseline'
        | 'initial'
        | 'inherit';

    /**
     * Justify Content
     */
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
};

export type StackBreakpoint = 'xsmall' | 'small' | 'medium' | 'large';
export interface StackProps
    extends StackIntrinsicProps,
        OcBaseProps<HTMLDivElement> {
    breakpoints?: Partial<Record<StackBreakpoint, StackIntrinsicProps>>;
}
