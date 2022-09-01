import { createContext } from 'react';
import { warning } from '../../../shared/utilities';
import type { InternalOcFormInstance } from './OcForm.types';

export const HOOK_MARK = 'OC_FORM_INTERNAL_HOOKS';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const warningFunc: any = () => {
    warning(
        false,
        'Can not find FormContext. Please make sure you wrap Field under Form.'
    );
};

const Context = createContext<InternalOcFormInstance>({
    getFieldValue: warningFunc,
    getFieldsValue: warningFunc,
    getFieldError: warningFunc,
    getFieldWarning: warningFunc,
    getFieldsError: warningFunc,
    isFieldsTouched: warningFunc,
    isTouched: warningFunc,
    isValidating: warningFunc,
    isFieldsValidating: warningFunc,
    resetFields: warningFunc,
    setFields: warningFunc,
    setFieldValue: warningFunc,
    setFieldsValue: warningFunc,
    validateFields: warningFunc,
    submit: warningFunc,

    getInternalHooks: () => {
        warningFunc();

        return {
            dispatch: warningFunc,
            initEntityValue: warningFunc,
            registerField: warningFunc,
            useSubscribe: warningFunc,
            setInitialValues: warningFunc,
            destroyForm: warningFunc,
            setCallbacks: warningFunc,
            registerWatch: warningFunc,
            getFields: warningFunc,
            setValidateMessages: warningFunc,
            setPreserve: warningFunc,
            getInitialValue: warningFunc,
        };
    },
});

export default Context;
