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
  | 'xxxl';

type StackIntrinsicProps = {
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
   * Direction type - horizontal or vertical
   */
  direction?: StackDirection;
  /**
   * Assigns the stack 100% width
   */
  fullWidth?: boolean;
  /**
   * @deprecated Use flex gap instead
   * Space between the child elements
   */
  gap?: StackGap;
  /**
   * Flex gap between child elements
   */
  flexGap?: StackGap;
  /**
   * Enable stack as an inline element
   */
  inline?: boolean;
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
  /**
   * Wrap behaviour for the stack
   */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
};

export type StackBreakpoint = 'xsmall' | 'small' | 'medium' | 'large';

export interface StackProps
  extends StackIntrinsicProps,
    OcBaseProps<HTMLDivElement> {
  breakpoints?: Partial<Record<StackBreakpoint, StackIntrinsicProps>>;
}
