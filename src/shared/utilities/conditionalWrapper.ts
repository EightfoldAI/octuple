import { ConditonalWrapperProps } from './utilities.types';

/**
 * Simple React component for conditionally wrapping children
 * @param ConditonalWrapperProps
 * @returns A conditionally wrapped element
 */
export const ConditionalWrapper: React.FC<ConditonalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
