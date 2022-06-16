import { OcBaseProps } from '../OcBase';

export enum SpinnerSize {
  Large = '64px',
  Default = '48px',
  Small = '30px',
}

export interface SpinnerProps extends OcBaseProps<HTMLElement> {
  /**
   * Size of the spinner
   * @default SpinnerSize.Default
   */
  size?: SpinnerSize | string;
}
