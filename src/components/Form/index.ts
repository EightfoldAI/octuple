import {
    OcRule as Rule,
    OcRuleObject as RuleObject,
    OcRuleRender as RuleRender,
} from './Internal/OcForm.types';
import { FormProvider } from './Context';
import ErrorList, { ErrorListProps } from './ErrorList';
import InternalForm, {
    FormInstance,
    FormProps,
    useForm,
    useWatch,
} from './Form';
import Item, { FormItemProps } from './FormItem';
import List, {
    FormListFieldData,
    FormListOperation,
    FormListProps,
} from './FormList';
import useFormInstance from './Hooks/useFormInstance';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
    useForm: typeof useForm;
    useFormInstance: typeof useFormInstance;
    useWatch: typeof useWatch;
    Item: typeof Item;
    List: typeof List;
    ErrorList: typeof ErrorList;
    Provider: typeof FormProvider;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;
Form.List = List;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Provider = FormProvider;

export {
    FormInstance,
    FormInterface,
    FormProps,
    FormItemProps,
    ErrorListProps,
    Rule,
    RuleObject,
    RuleRender,
    FormListProps,
    FormListFieldData,
    FormListOperation,
};

export default Form;
