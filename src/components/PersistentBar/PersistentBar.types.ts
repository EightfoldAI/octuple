import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
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
     * Buttons to display on top bar
     */
    buttonMenuProps?: Array<Object>;
    /**
     * Content of the persistent bar
     */
    content: string;
    /**
     * Type of the persistent
     * @default PersistentBarType.bottom
     */
    type?: PersistentBarType;
    /**
     * Custom icon for the persistent
     * @default PersistentBarType.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
     */
    icon?: IconName;
    /**
     * If the persistent is closable or not
     */
    closable?: boolean;
    /**
     * Callback fired on close of the persistent
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
}
