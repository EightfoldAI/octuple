import React, { useContext, useMemo } from 'react';
import { FormProps } from './Form.types';
import OcFieldForm, { OcList, useWatch } from './Internal';
import type { OcValidateErrorEntity } from './Internal/OcForm.types';
import { FormContext } from './Context';
import type { FormContextProps } from './Context';
import useForm, { FormInstance } from './Hooks/useForm';
import DisabledContext, {
    DisabledContextProvider,
} from '../ConfigProvider/DisabledContext';
import SizeContext, {
    SizeContextProvider,
} from '../ConfigProvider/SizeContext';
import ShapeContext, {
    ShapeContextProvider,
} from '../ConfigProvider/ShapeContext';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';
import type { Options } from 'scroll-into-view-if-needed';

import styles from './form.module.scss';

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (
    props,
    ref
) => {
    const htmlDir: string = useCanvasDirection();
    const contextuallyDisabled = useContext(DisabledContext);
    const contextuallySized = useContext(SizeContext);
    const contextuallyShaped = useContext(ShapeContext);

    const {
        classNames,
        shape = contextuallyShaped,
        size = contextuallySized,
        disabled = contextuallyDisabled,
        form,
        colon,
        labelAlign,
        labelWrap,
        labelCol,
        wrapperCol,
        layout = 'horizontal',
        scrollToFirstError,
        requiredMark,
        onFinishFailed,
        name,
        ...rest
    } = props;

    const formClassNames: string = mergeClasses([
        styles.form,
        {
            [styles.formHorizontal]: layout === 'horizontal',
            [styles.formVertical]: layout === 'vertical',
            [styles.formInline]: layout === 'inline',
            [styles.formHideRequiredMark]: requiredMark === false,
            [styles.formRtl]: htmlDir === 'rtl',
            [(styles as any)[`form-${size}`]]: size,
        },
        classNames,
    ]);

    const [wrapForm] = useForm(form);
    const { __INTERNAL__ } = wrapForm;
    __INTERNAL__.name = name;

    const formContextValue = useMemo<FormContextProps>(
        () => ({
            name,
            labelAlign,
            labelCol,
            labelWrap,
            wrapperCol,
            vertical: layout === 'vertical',
            colon: colon,
            requiredMark: requiredMark,
            itemRef: __INTERNAL__.itemRef,
            form: wrapForm,
        }),
        [
            name,
            labelAlign,
            labelCol,
            wrapperCol,
            layout,
            colon,
            requiredMark,
            wrapForm,
        ]
    );

    React.useImperativeHandle(ref, () => wrapForm);

    const onInternalFinishFailed = (errorInfo: OcValidateErrorEntity) => {
        onFinishFailed?.(errorInfo);

        let defaultScrollToFirstError: Options = { block: 'nearest' };

        if (scrollToFirstError && errorInfo.errorFields.length) {
            if (typeof scrollToFirstError === 'object') {
                defaultScrollToFirstError = scrollToFirstError;
            }
            console.log(errorInfo.errorFields[0].name);
            wrapForm.scrollToField(
                errorInfo.errorFields[0].name,
                defaultScrollToFirstError
            );
        }
    };

    return (
        <DisabledContextProvider disabled={disabled}>
            <ShapeContextProvider shape={shape}>
                <SizeContextProvider size={size}>
                    <FormContext.Provider value={formContextValue}>
                        <OcFieldForm
                            id={name}
                            {...rest}
                            name={name}
                            onFinishFailed={onInternalFinishFailed}
                            form={wrapForm}
                            className={formClassNames}
                        />
                    </FormContext.Provider>
                </SizeContextProvider>
            </ShapeContextProvider>
        </DisabledContextProvider>
    );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <
    Values = any
>(
    props: React.PropsWithChildren<FormProps<Values>> & {
        ref?: React.Ref<FormInstance<Values>>;
    }
) => React.ReactElement;

export { useForm, OcList, FormInstance, useWatch };

export default Form;
