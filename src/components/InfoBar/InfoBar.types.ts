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
     * Props for the action button
     */
    actionButtonProps?: ButtonProps;
    /**
     * If the infoBar is closable or not
     */
    closable?: boolean;
    /**
     * Custom props for the close button
     */
    closeButtonProps?: CloseButtonProps;
    /**
     * Icon for the close button
     * @default IconName.mdiClose
     */
    closeIcon?: IconName;
    /**
     * Content of the info bar
     */
    content: string;
    /**
     * Custom icon for the infoBar
     * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
     */
    icon?: IconName;
    /**
     * Callback fired on close of the infoBar
     */
    onClose?: () => void;
    /**
     * Role of the info bar
     */
    role?: string;
    /**
     * Type of the infoBar
     * @default InfoBarType.neutral
     */
    type?: InfoBarType;
}
