import React from 'react';
import type { OcFormProps } from './OcForm.types';
import { OcFormInstance } from './OcForm.types';
import OcField from './OcField';
import { OcList } from './OcList';
import { OcForm } from './OcForm';
import { OcFormProvider } from './OcFormContext';
import OcFieldContext from './OcFieldContext';
import OcListContext from './OcListContext';
import useForm from './useForm';
import useWatch from './useWatch';

const InternalForm = React.forwardRef<OcFormInstance, OcFormProps>(OcForm) as <
    Values = any
>(
    props: OcFormProps<Values> & { ref?: React.Ref<OcFormInstance<Values>> }
) => React.ReactElement;

type InternalFormType = typeof InternalForm;
interface RefFormType extends InternalFormType {
    OcFormProvider: typeof OcFormProvider;
    OcField: typeof OcField;
    OcList: typeof OcList;
    useForm: typeof useForm;
    useWatch: typeof useWatch;
}

const RefForm: RefFormType = InternalForm as RefFormType;

RefForm.OcFormProvider = OcFormProvider;
RefForm.OcField = OcField;
RefForm.OcList = OcList;
RefForm.useForm = useForm;
RefForm.useWatch = useWatch;

export {
    OcFormInstance,
    OcField,
    OcList,
    useForm,
    OcFormProvider,
    OcFieldContext,
    OcListContext,
    useWatch,
};

export type { OcFormProps };

export default RefForm;
