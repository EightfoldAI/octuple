import { IconName } from '../Icon';
import { ButtonProps } from '../Button';
import { PillProps, PillType } from '../Pills';
import { OcBaseProps } from '../OcBase';
import { ConfigContextProps, Size } from '../ConfigProvider';
import { AvatarProps } from '../Avatar';
import { BaseDialogProps } from '../Dialog/BaseDialog/BaseDialog.types';

export enum CardSize {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'medium',
}

export enum CardType {
    list = 'list',
    carousel = 'carousel',
}

export interface CardProps
    extends Omit<
        BaseDialogProps,
        'dialogWrapperClassName' | 'dialogClassName'
    > {
    /**
     * Props for the action button
     */
    actionButtonProps?: ButtonProps;
    /**
     * Name of the employee card
     */
    name: string;
    /**
     * Custom icon for the card
     * @default IconName.mdiInformation | IconName.mdiCheckCircle | IconName.mdiAlert
     */
    icon?: IconName;
    /**
     * Role of the employee
     */
    role?: string;
    /**
     * Avatar of the employee
     */
    avatar?: AvatarProps;
    /**
     * Type of the card
     * @default CardType.neutral
     */
    type?: CardType;
    /**
     * Tags for the employee
     */
    tag?: PillProps;
    /**
     * The checkbox size.
     * @default SelectorSize.Medium
     */
    size?: CardSize | Size;
    /**
     * The boolean value if a list card is selected
     */
    isSelected?: boolean;
    /**
     * Configure how contextual props are consumed
     */
    configContextProps?: ConfigContextProps;
    /**
     * The Footer of the dialog
     */
    footer?: React.ReactNode;
    /**
     * Props for the Footer button
     */
    footerButtonProps?: ButtonProps;
    /**
     * Custom classes for the Footer
     */
    footerClassNames?: string;
    /**
     * Footer icon name
     */
    footerIcon?: IconName;
    /**
     * List of items for boday
     */
    bodyListOneProps?: Array<string | HTMLElement | object>;
    /**
     * List of items for body
     */
    bodyListTwoProps?: Array<string | HTMLElement | object>;
    /**
     * The first subheader below the header
     */
    subHeaderOne?: string;
    /**
     * The first subheader below the header
     */
    subHeaderTwo?: string;
}
