import type { ReactElement } from 'react';
import type { ReducerAction } from './useForm';

type Validator = (
    rule: OcRuleObject,
    value: OcStoreValue,
    callback: (error?: string) => void
) => Promise<void | any> | void;

interface OcBaseRule {
    warningOnly?: boolean;
    enum?: OcStoreValue[];
    len?: number;
    max?: number;
    message?: string | ReactElement;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    transform?: (value: OcStoreValue) => OcStoreValue;
    type?: OcRuleType;
    whitespace?: boolean;

    /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
    validateTrigger?: string | string[];
}

type OcAggregationRule = OcBaseRule & Partial<OcValidatorRule>;

interface OcArrayRule extends Omit<OcAggregationRule, 'type'> {
    type: 'array';
    defaultField?: OcRuleObject;
}

// >>>>>> Info
interface OcValueUpdateInfo {
    type: 'valueUpdate';
    source: 'internal' | 'external';
}

interface OcValidateFinishInfo {
    type: 'validateFinish';
}

interface OcResetInfo {
    type: 'reset';
}

interface OcRemoveInfo {
    type: 'remove';
}

interface SetOcFieldInfo {
    type: 'setField';
    data: OcFieldData;
}

interface OcDependenciesUpdateInfo {
    type: 'dependenciesUpdate';
    /**
     * Contains all the related `InternalNamePath[]`.
     * a <- b <- c : change `a`
     * relatedFields=[a, b, c]
     */
    relatedFields: InternalOcNamePath[];
}

/** Only return partial when type is not any */
type RecursiveOcPartial<T> = T extends object
    ? {
          [P in keyof T]?: T[P] extends (infer U)[]
              ? RecursiveOcPartial<U>[]
              : T[P] extends object
              ? RecursiveOcPartial<T[P]>
              : T[P];
      }
    : any;

type OcValidateMessage = string | (() => string);

export type OcForms = Record<string, OcFormInstance>;

export interface OcFormChangeInfo {
    changedFields: OcFieldData[];
    forms: OcForms;
}

export interface OcFormFinishInfo {
    values: OcStore;
    forms: OcForms;
}

export interface OcFormProviderProps {
    validateMessages?: ValidateMessages;
    onFormChange?: (name: string, info: OcFormChangeInfo) => void;
    onFormFinish?: (name: string, info: OcFormFinishInfo) => void;
    children?: React.ReactNode;
}

export interface OcFormContextProps extends OcFormProviderProps {
    triggerFormChange: (name: string, changedFields: OcFieldData[]) => void;
    triggerFormFinish: (name: string, values: OcStore) => void;
    registerForm: (name: string, form: OcFormInstance) => void;
    unregisterForm: (name: string) => void;
}

export type InternalOcNamePath = (string | number)[];
export type OcNamePath = string | number | InternalOcNamePath;

export type OcStoreValue = any;
export type OcStore = Record<string, OcStoreValue>;

export interface OcMeta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    warnings: string[];
    name: InternalOcNamePath;
}

export interface InternalOcFieldData extends OcMeta {
    value: OcStoreValue;
}

/**
 * Used by `setFields` config
 */
export interface OcFieldData
    extends Partial<Omit<InternalOcFieldData, 'name'>> {
    name: OcNamePath;
}

export type OcRuleType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email';

export type OcRuleRender = (form: OcFormInstance) => OcRuleObject;

export interface OcValidatorRule {
    warningOnly?: boolean;
    message?: string | ReactElement;
    validator: Validator;
}

export type OcRuleObject = OcAggregationRule | OcArrayRule;

export type OcRule = OcRuleObject | OcRuleRender;

export interface OcValidateErrorEntity<Values = any> {
    values: Values;
    errorFields: { name: InternalOcNamePath; errors: string[] }[];
    outOfDate: boolean;
}

export interface OcFieldEntity {
    onStoreChange: (
        store: OcStore,
        namePathList: InternalOcNamePath[] | null,
        info: OcValuedNotifyInfo
    ) => void;
    isTouched: () => boolean;
    isDirty: () => boolean;
    isValidating: () => boolean;
    isListField: () => boolean;
    isList: () => boolean;
    isPreserve: () => boolean;
    validateRules: (options?: OcValidateOptions) => Promise<OcRuleError[]>;
    getMeta: () => OcMeta;
    getNamePath: () => InternalOcNamePath;
    getErrors: () => string[];
    getWarnings: () => string[];
    props: {
        name?: OcNamePath;
        rules?: OcRule[];
        dependencies?: OcNamePath[];
        initialValue?: any;
    };
}

export interface OcFieldError {
    name: InternalOcNamePath;
    errors: string[];
    warnings: string[];
}

export interface OcRuleError {
    errors: string[];
    rule: OcRuleObject;
}

export interface OcValidateOptions {
    triggerName?: string;
    validateMessages?: ValidateMessages;
    /**
     * Recursive validate. It will validate all the name path that contains the provided one.
     * e.g. ['a'] will validate ['a'] , ['a', 'b'] and ['a', 1].
     */
    recursive?: boolean;
}

export type InternalOcValidateFields<Values = any> = (
    nameList?: OcNamePath[],
    options?: OcValidateOptions
) => Promise<Values>;

export type ValidateFields<Values = any> = (
    nameList?: OcNamePath[]
) => Promise<Values>;

export type OcNotifyInfo =
    | OcValueUpdateInfo
    | OcValidateFinishInfo
    | OcResetInfo
    | OcRemoveInfo
    | SetOcFieldInfo
    | OcDependenciesUpdateInfo;

export type OcValuedNotifyInfo = OcNotifyInfo & {
    store: OcStore;
};

export interface OcCallbacks<Values = any> {
    onValuesChange?: (changedValues: any, values: Values) => void;
    onFieldsChange?: (
        changedFields: OcFieldData[],
        allFields: OcFieldData[]
    ) => void;
    onFinish?: (values: Values) => void;
    onFinishFailed?: (errorInfo: OcValidateErrorEntity<Values>) => void;
}

export type WatchOcCallBack = (
    values: OcStore,
    namePathList: InternalOcNamePath[]
) => void;

export interface InternalOcHooks {
    dispatch: (action: ReducerAction) => void;
    initEntityValue: (entity: OcFieldEntity) => void;
    registerField: (entity: OcFieldEntity) => () => void;
    useSubscribe: (subscribable: boolean) => void;
    setInitialValues: (values: OcStore, init: boolean) => void;
    destroyForm: () => void;
    setCallbacks: (callbacks: OcCallbacks) => void;
    registerWatch: (callback: WatchOcCallBack) => () => void;
    getFields: (namePathList?: InternalOcNamePath[]) => OcFieldData[];
    setValidateMessages: (validateMessages: ValidateMessages) => void;
    setPreserve: (preserve?: boolean) => void;
    getInitialValue: (namePath: InternalOcNamePath) => OcStoreValue;
}

export interface OcFormInstance<Values = any> {
    // Origin Form API
    getFieldValue: (name: OcNamePath) => OcStoreValue;
    getFieldsValue: (() => Values) &
        ((
            nameList: OcNamePath[] | true,
            filterFunc?: (meta: OcMeta) => boolean
        ) => any);
    getFieldError: (name: OcNamePath) => string[];
    getFieldsError: (nameList?: OcNamePath[]) => OcFieldError[];
    getFieldWarning: (name: OcNamePath) => string[];
    isFieldsTouched: ((
        nameList?: OcNamePath[],
        allFieldsTouched?: boolean
    ) => boolean) &
        ((allFieldsTouched?: boolean) => boolean);
    isTouched: (name: OcNamePath) => boolean;
    isValidating: (name: OcNamePath) => boolean;
    isFieldsValidating: (nameList: OcNamePath[]) => boolean;
    resetFields: (fields?: OcNamePath[]) => void;
    setFields: (fields: OcFieldData[]) => void;
    setFieldValue: (name: OcNamePath, value: any) => void;
    setFieldsValue: (values: RecursiveOcPartial<Values>) => void;
    validateFields: ValidateFields<Values>;

    // New API
    submit: () => void;
}

export type InternalOcFormInstance = Omit<OcFormInstance, 'validateFields'> & {
    validateFields: InternalOcValidateFields;

    /**
     * Passed by field context props
     */
    prefixName?: InternalOcNamePath;

    validateTrigger?: string | string[] | false;

    /**
     * Form component should register some content into store.
     * We pass the `HOOK_MARK` as key to avoid user call the function.
     */
    getInternalHooks: (secret: string) => InternalOcHooks | null;

    /** @private Internal usage. Do not use it in your production */
    _init?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OcEventArgs = any[];

export interface ValidateMessages {
    default?: OcValidateMessage;
    required?: OcValidateMessage;
    enum?: OcValidateMessage;
    whitespace?: OcValidateMessage;
    date?: {
        format?: OcValidateMessage;
        parse?: OcValidateMessage;
        invalid?: OcValidateMessage;
    };
    types?: {
        string?: OcValidateMessage;
        method?: OcValidateMessage;
        array?: OcValidateMessage;
        object?: OcValidateMessage;
        number?: OcValidateMessage;
        date?: OcValidateMessage;
        boolean?: OcValidateMessage;
        integer?: OcValidateMessage;
        float?: OcValidateMessage;
        regexp?: OcValidateMessage;
        email?: OcValidateMessage;
        url?: OcValidateMessage;
        hex?: OcValidateMessage;
    };
    string?: {
        len?: OcValidateMessage;
        min?: OcValidateMessage;
        max?: OcValidateMessage;
        range?: OcValidateMessage;
    };
    number?: {
        len?: OcValidateMessage;
        min?: OcValidateMessage;
        max?: OcValidateMessage;
        range?: OcValidateMessage;
    };
    array?: {
        len?: OcValidateMessage;
        min?: OcValidateMessage;
        max?: OcValidateMessage;
        range?: OcValidateMessage;
    };
    pattern?: {
        mismatch?: OcValidateMessage;
    };
}

export type BaseOcFormProps = Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'children'
>;

export type OcRenderProps = (
    values: OcStore,
    form: OcFormInstance
) => JSX.Element | React.ReactNode;

export interface OcFormProps<Values = any> extends BaseOcFormProps {
    initialValues?: OcStore;
    form?: OcFormInstance<Values>;
    children?: OcRenderProps | React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: false | string | React.FC<any> | React.ComponentClass<any>;
    fields?: OcFieldData[];
    name?: string;
    validateMessages?: ValidateMessages;
    onValuesChange?: OcCallbacks<Values>['onValuesChange'];
    onFieldsChange?: OcCallbacks<Values>['onFieldsChange'];
    onFinish?: OcCallbacks<Values>['onFinish'];
    onFinishFailed?: OcCallbacks<Values>['onFinishFailed'];
    validateTrigger?: string | string[] | false;
    preserve?: boolean;
}

export type ShouldUpdate<Values = any> =
    | boolean
    | ((
          prevValues: Values,
          nextValues: Values,
          info: { source?: string }
      ) => boolean);

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface OcChildProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

export interface OcListField {
    name: number;
    key: number;
    isListField: boolean;
}

export interface OcListOperations {
    add: (defaultValue?: OcStoreValue, index?: number) => void;
    remove: (index: number | number[]) => void;
    move: (from: number, to: number) => void;
}

export interface OcListProps {
    name: OcNamePath;
    rules?: OcValidatorRule[];
    validateTrigger?: string | string[] | false;
    initialValue?: any[];
    children?: (
        fields: OcListField[],
        operations: OcListOperations,
        meta: OcMeta
    ) => JSX.Element | React.ReactNode;
}

export interface InternalOcFieldProps<Values = any> {
    children?:
        | React.ReactElement
        | ((
              control: OcChildProps,
              meta: OcMeta,
              form: OcFormInstance<Values>
          ) => React.ReactNode);
    /**
     * Set up `dependencies` field.
     * When dependencies field update and current field is touched,
     * will trigger validate rules and render.
     */
    dependencies?: OcNamePath[];
    getValueFromEvent?: (...args: OcEventArgs) => OcStoreValue;
    name?: InternalOcNamePath;
    normalize?: (
        value: OcStoreValue,
        prevValue: OcStoreValue,
        allValues: OcStore
    ) => OcStoreValue;
    rules?: OcRule[];
    shouldUpdate?: ShouldUpdate<Values>;
    trigger?: string;
    validateTrigger?: string | string[] | false;
    validateFirst?: boolean | 'parallel';
    valuePropName?: string;
    getValueProps?: (value: OcStoreValue) => Record<string, unknown>;
    messageVariables?: Record<string, string>;
    initialValue?: any;
    onReset?: () => void;
    onMetaChange?: (meta: OcMeta & { destroy?: boolean }) => void;
    preserve?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isListField?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isList?: boolean;

    /** @private Pass context as prop instead of context api
     *  since class component can not get context in constructor */
    fieldContext?: InternalOcFormInstance;
}

export interface OcFieldProps<Values = any>
    extends Omit<InternalOcFieldProps<Values>, 'name' | 'fieldContext'> {
    name?: OcNamePath;
}

export interface OcFieldState {
    resetCount: number;
}
