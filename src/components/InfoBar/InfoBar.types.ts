import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
import { OcBaseProps } from '../OcBase';

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export enum InfoBarType {
  neutral = 'neutral',
  positive = 'positive',
  warning = 'warning',
  disruptive = 'disruptive',
}

export interface InfoBarsProps extends OcBaseProps<HTMLDivElement> {
  /**
   * Content of the info bar
   */
  content: string;
  /**
   * Type of the infoBar
   * @default InfoBarType.neutral
   */
  type?: InfoBarType;
  /**
   * Custom icon for the infoBar
   * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
   */
  icon?: IconName;
  /**
   * If the infoBar is closable or not
   */
  closable?: boolean;
  /**
   * Callback fired on close of the infoBar
   */
  onClose?: () => void;
  /**
   * Icon for the close button
   * @default IconName.mdiClose
   */
  closeIcon?: IconName;
  /**
   * Custom props for the close button
   */
  closeButtonProps?: CloseButtonProps;
  /**
   * Props for the action button
   */
  actionButtonProps?: ButtonProps;
  /**
   * Role of the info bar
   */
  role?: string;
}
