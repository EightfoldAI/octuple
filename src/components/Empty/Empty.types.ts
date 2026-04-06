import { OcBaseProps } from '../OcBase';

export enum EmptyMode {
  data = 'data',
  error = 'error',
  messages = 'messages',
  plan = 'plan',
  profile = 'profile',
  search = 'search',
  tasks = 'tasks',
}

export interface EmptyProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The empty component children.
   */
  children?: React.ReactNode;
  /**
   * The empty component description
   */
  description?: string;
  /**
   * The empty component description class names.
   */
  descriptionClassNames?: string;
  /**
   * The empty component mode
   */
  mode?: EmptyMode;
  /**
   * The empty component image.
   */
  image?: React.ReactNode;
  /**
   * The empty component image style.
   */
  imageStyle?: React.CSSProperties;
  /**
   * The empty component style.
   */
  style?: React.CSSProperties;
  /**
   * The empty component title
   */
  title?: string;
  /**
   * The empty component title class names.
   */
  titleClassNames?: string;
  /**
   * Optional heading level (1-6) for the title default is 2
   * @deprecated Unused prop
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}
