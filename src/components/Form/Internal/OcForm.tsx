import React, { useEffect, useImperativeHandle } from 'react';
import type {
    InternalOcFormInstance,
    OcFieldData,
    OcFormContextProps,
    OcFormInstance,
    OcRenderProps,
    OcStore,
} from './OcForm.types';
import { OcFormProps } from './OcForm.types';
import useForm from './useForm';
import FieldContext, { HOOK_MARK } from './OcFieldContext';
import OcFormContext from './OcFormContext';
import { isSimilar } from './Utils/valueUtil';

export const OcForm: React.ForwardRefRenderFunction<
    OcFormInstance,
    OcFormProps
> = (
    {
        name,
        initialValues,
        fields,
        form,
        preserve,
        children,
        component: Component = 'form',
        validateMessages,
        validateTrigger = 'onChange',
        onValuesChange,
        onFieldsChange,
        onFinish,
        onFinishFailed,
        ...rest
    }: OcFormProps,
    ref
) => {
    const formContext: OcFormContextProps = React.useContext(OcFormContext);

    // We customize handle event since Context will makes all the consumer re-render:
    // https://reactjs.org/docs/context.html#contextprovider
    const [formInstance] = useForm(form);
    const {
        useSubscribe,
        setInitialValues,
        setCallbacks,
        setValidateMessages,
        setPreserve,
        destroyForm,
    } = (formInstance as InternalOcFormInstance).getInternalHooks(HOOK_MARK);

    // Pass ref with form instance
    useImperativeHandle(ref, () => formInstance);

    // Register form into Context
    useEffect(() => {
        formContext.registerForm(name, formInstance);
        return () => {
            formContext.unregisterForm(name);
        };
    }, [formContext, formInstance, name]);

    // Pass props to store
    setValidateMessages({
        ...formContext.validateMessages,
        ...validateMessages,
    });

    setCallbacks({
        onValuesChange,
        onFieldsChange: (changedFields: OcFieldData[], ...rest) => {
            formContext.triggerFormChange(name, changedFields);

            if (onFieldsChange) {
                onFieldsChange(changedFields, ...rest);
            }
        },
        onFinish: (values: OcStore) => {
            formContext.triggerFormFinish(name, values);

            if (onFinish) {
                onFinish(values);
            }
        },
        onFinishFailed,
    });

    setPreserve(preserve);

    // Set initial value, init store value when first mount
    const mountRef = React.useRef(null);

    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) {
        mountRef.current = true;
    }

    useEffect(
        () => destroyForm,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // Prepare children by `children` type
    let childrenNode: React.ReactNode;
    const childrenRenderProps = typeof children === 'function';
    if (childrenRenderProps) {
        const values = formInstance.getFieldListValues(true);
        childrenNode = (children as OcRenderProps)(values, formInstance);
    } else {
        childrenNode = children;
    }

    // Not use subscribe when using render props
    useSubscribe(!childrenRenderProps);

    // Listen if fields provided. We use ref to save prev data here to avoid additional render
    const prevFieldsRef = React.useRef<OcFieldData[] | undefined>();
    useEffect(() => {
        if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
            formInstance.setFields(fields || []);
        }
        prevFieldsRef.current = fields;
    }, [fields, formInstance]);

    const formContextValue = React.useMemo(
        () => ({
            ...(formInstance as InternalOcFormInstance),
            validateTrigger,
        }),
        [formInstance, validateTrigger]
    );

    const wrapperNode = (
        <FieldContext.Provider value={formContextValue}>
            {childrenNode}
        </FieldContext.Provider>
    );

    if (Component === false) {
        return wrapperNode;
    }

    return (
        <Component
            {...rest}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                event.stopPropagation();

                formInstance.submit();
            }}
            onReset={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                formInstance.resetFields();
                rest.onReset?.(event);
            }}
        >
            {wrapperNode}
        </Component>
    );
};
