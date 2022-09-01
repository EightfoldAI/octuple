import type {
    OcFieldProps,
    OcFormInstance,
    OcFormProps,
    OcMeta,
    OcStoreValue,
    OcValidatorRule,
} from './Internal/OcForm.types';
import type { ReportMetaChange } from './Context';
import { FormInstance } from './Hooks/useForm';
import { Size } from '../ConfigProvider/SizeContext';
import { Shape } from '../ConfigProvider/ShapeContext';
import type { ColProps } from '../Grid/Grid.types';
import type { TooltipProps } from '../Tooltip';
import { tuple } from '../../shared/utilities';
import type { Options } from 'scroll-into-view-if-needed';

export {
    InternalOcNamePath,
    OcNamePath,
    OcStore,
    OcStoreValue,
} from './Internal/OcForm.types';

export { Options as ScrollOptions } from 'scroll-into-view-if-needed';

export type FormLabelAlign = 'left' | 'right';

export type RequiredMark = boolean | 'optional';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface FormProps<Values = any>
    extends Omit<OcFormProps<Values>, 'form'> {
    /**
     * Custom classnames of the Form
     */
    classNames?: string;
    /**
     * Configure the default value of colon for Form.Item
     * Colon after the label is displayed if true (prop layout must be horizontal)
     * @default true
     */
    colon?: boolean;
    /**
     * The Form name
     */
    name?: string;
    /**
     * The Form layout [horizontal | vertical | inline]
     * @default 'horizontal'
     */
    layout?: FormLayout;
    /**
     * The text align of label of all items
     * @default 'left'
     */
    labelAlign?: FormLabelAlign;
    /**
     * Determines if Form labels can wrap
     * @default false
     */
    labelWrap?: boolean;
    /**
     * The Column layout for field labels
     */
    labelCol?: ColProps;
    /**
     * The Column layout for field input controls
     */
    wrapperCol?: ColProps;
    /**
     * Form control instance created by Form.useForm()
     * Automatically created when not provided
     */
    form?: FormInstance<Values>;
    /**
     * Set field Octuple components shape
     */
    shape?: Shape;
    /**
     * Set field Octuple components size
     */
    size?: Size;
    /**
     * 	Disables Form Octuple components
     * @default false
     */
    disabled?: boolean;
    /**
     * Auto scroll to the first failed field when Form submit action is attempted
     * @default false
     */
    scrollToFirstError?: Options | boolean;
    /**
     * Required mark enabled and/or style
     * @default true
     */
    requiredMark?: RequiredMark;
}

export interface FormItemInputMiscProps {
    children: React.ReactNode;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
    marginBottom?: number | null;
    onErrorVisibleChanged?: (visible: boolean) => void;
}

export interface FormItemInputProps {
    wrapperCol?: ColProps;
    extra?: React.ReactNode;
    status?: ValidateStatus;
    help?: React.ReactNode;
}

export type WrapperTooltipProps = TooltipProps & {
    icon?: React.ReactElement;
};

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode;

export interface FormItemLabelProps {
    colon?: boolean;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    requiredMark?: RequiredMark;
    tooltip?: LabelTooltipType;
}

export interface FormListFieldData {
    name: number;
    key: number;
}

export interface FormListOperation {
    add: (defaultValue?: OcStoreValue, insertIndex?: number) => void;
    remove: (index: number | number[]) => void;
    move: (from: number, to: number) => void;
}

export interface FormListProps {
    name: string | number | (string | number)[];
    rules?: OcValidatorRule[];
    initialValue?: any[];
    children: (
        fields: FormListFieldData[],
        operation: FormListOperation,
        meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] }
    ) => React.ReactNode;
}

export interface FieldError {
    errors: string[];
    warnings: string[];
}

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type ValidateStatus = typeof ValidateStatuses[number];

export type RenderChildren<Values = any> = (
    form: OcFormInstance<Values>
) => React.ReactNode;
type RcFieldProps<Values = any> = Omit<OcFieldProps<Values>, 'children'>;
type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

export interface MemoInputProps {
    value: any;
    update: any;
    children: React.ReactNode;
}

export interface FormItemProps<Values = any>
    extends FormItemLabelProps,
        FormItemInputProps,
        RcFieldProps<Values> {
    /**
     * Form.Item field should ignore Form validation styles
     * @default false
     */
    noStyle?: boolean;
    /**
     * The Form.Item style
     */
    style?: React.CSSProperties;
    /**
     * Custom classnames of the Form.Item
     */
    classNames?: string;
    /**
     * The Form.Item chilren
     */
    children?: ChildrenType<Values>;
    /**
     * The Form.Item id
     */
    id?: string;
    /**
     * Used with validateStatus
     * this option specifies the validation status icon
     * Recommended to be used only with TextInput
     */
    hasFeedback?: boolean;
    /**
     * The validation status
     * If not provided, will be generated by the validation rule
     * options: success, warning, error, and validating
     */
    validateStatus?: ValidateStatus;
    /**
     * Display required style
     * Will be generated by the validation rule
     * @default false
     */
    required?: boolean;
    /**
     * hide Form.Item
     * @default false
     */
    hidden?: boolean;
    /**
     * Form.Item default value.
     * Form initialValues prop gets a higher priority
     */
    initialValue?: any;
    /**
     * The default validate field info
     */
    messageVariables?: Record<string, string>;
    /**
     * Configure Tooltip content
     */
    tooltip?: LabelTooltipType;
}

export interface ItemHolderProps extends FormItemProps {
    classNames?: string;
    style?: React.CSSProperties;
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
    meta: OcMeta;
    children?: React.ReactNode;
    fieldId?: string;
    isRequired?: boolean;
    onSubItemMetaChange: ReportMetaChange;
}
