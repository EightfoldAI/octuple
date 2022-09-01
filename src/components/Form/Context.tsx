import React, { useContext, useMemo } from 'react';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { OcFormProvider } from './Internal';
import type { OcFormProviderProps, OcMeta } from './Internal/OcForm.types';
import type { ColProps } from '../Grid';
import type { FormInstance } from './Form';
import type {
    FormLabelAlign,
    RequiredMark,
    ValidateStatus,
} from './Form.types';

export interface FormContextProps {
    vertical: boolean;
    name?: string;
    colon?: boolean;
    labelAlign?: FormLabelAlign;
    labelWrap?: boolean;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    requiredMark?: RequiredMark;
    itemRef: (name: (string | number)[]) => (node: React.ReactElement) => void;
    form?: FormInstance;
}

export const FormContext = React.createContext<FormContextProps>({
    itemRef: (() => {}) as any,
    labelAlign: 'left',
    vertical: false,
});

/** Used for error collection */
export type ReportMetaChange = (meta: OcMeta, uniqueKeys: React.Key[]) => void;
export const NoStyleItemContext = React.createContext<ReportMetaChange | null>(
    null
);

export interface FormProviderProps
    extends Omit<OcFormProviderProps, 'validateMessages'> {}

export const FormProvider: React.FC<FormProviderProps> = (props) => {
    return <OcFormProvider {...props} />;
};

/** Used for ErrorList only */
export interface FormItemStatusContextProps {
    status?: ValidateStatus;
}

export const FormItemStatusContext =
    React.createContext<FormItemStatusContextProps>({});

export interface FormItemStatusContextProps {
    isFormItemInput?: boolean;
    status?: ValidateStatus;
    hasFeedback?: boolean;
    feedbackIcon?: ReactNode;
}

export const FormItemInputContext =
    React.createContext<FormItemStatusContextProps>({});

export type NoFormStyleProps = PropsWithChildren<{
    status?: boolean;
    override?: boolean;
}>;

export const NoFormStyle: FC<NoFormStyleProps> = ({
    children,
    status,
    override,
}) => {
    const formItemInputContext = useContext(FormItemInputContext);

    const newFormItemInputContext = useMemo(() => {
        const newContext = { ...formItemInputContext };
        if (override) {
            delete newContext.isFormItemInput;
        }
        if (status) {
            delete newContext.status;
            delete newContext.hasFeedback;
            delete newContext.feedbackIcon;
        }
        return newContext;
    }, [status, override, formItemInputContext]);

    return (
        <FormItemInputContext.Provider value={newFormItemInputContext}>
            {children}
        </FormItemInputContext.Provider>
    );
};
