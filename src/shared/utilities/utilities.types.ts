/**
 *  Value represented as a generic (used by classNames).
 */
export type Value = string | number | boolean | undefined | null;
/**
 *  Mapping that constructs a type with a set of properties K of type T (used by classNames).
 */
export type Mapping = Record<string, unknown>;

/**
 *  ArgumentArray (used by classNames).
 */
export interface ArgumentArray extends Array<Argument> {}

/**
 *  Argument represented as a Value, Mapping or ArgumentArray (used by classNames).
 */
export type Argument = Value | Mapping | ArgumentArray;

/**
 * Conditionally wrapped component props.
 */
export type ConditonalWrapperProps = {
  children: React.ReactElement;
  condition?: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
};
