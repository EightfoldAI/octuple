import { IconName } from '../Icon';
import { ButtonProps, InternalButtonProps } from '../Button';
import { OcBaseProps } from '../OcBase';

export type CloseButtonProps = Omit<ButtonProps, 'onClick' | 'icon'>;

export enum PersistentBarType {
    bottomBarWithText = 'bottomBarWithText',
    bottomBarSecondaryButtons = 'bottomBarSecondaryButtons',
    bottomBarButtonsOnLeft = 'bottomBarButtonsOnLeft',
    topBarButtons = 'topBarButtons',
    topBarWithText = 'topBarWithText',
    topBarPagination = 'topBarPagination',
}

export interface PersistentBarsProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Props for the first action button
     */
    actionButtonOneProps?: ButtonProps;
    /**
     * Props for the second action button
     */
    actionButtonTwoProps?: ButtonProps;
    /**
     * Props for the third action button
     */
    actionButtonThreeProps?: ButtonProps;
    /**
     * Buttons to display on top bar
     */
    buttonMenuProps?: Array<InternalButtonProps>;
    /**
     * If the persistent is closable or not
     */
    closable?: boolean;
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
     * Content of the persistent bar
     */
    content: string;
    /**
     * Custom icon for the persistent bar
     * @default PersistentBarType.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
     */
    icon?: IconName;
    /**
     * Callback fired on close of the persistent bar
     */
    onClose?: () => void;
    /**
     * Arguments for pagination
     */
    paginationArgs?: Object;
    /**
     * Total pages for pagination
     */
    paginationTotal?: number;
    /**
     * Role of the persistent bar
     */
    role?: string;
    /**
     * Title for the persistent bar
     */
    title?: string;
    /**
     * Type of the persistent bar
     * @default PersistentBarType.bottom
     */
    type?: PersistentBarType;
}
