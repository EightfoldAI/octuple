import React, { FC, useContext, useMemo } from 'react';
import { FormContext, FormItemStatusContext } from './Context';
import { FormItemInputMiscProps, FormItemInputProps } from './Form.types';
import ErrorList from './ErrorList';
import { Col } from '../Grid';
import type { ColProps } from '../Grid';
import { mergeClasses } from '../../shared/utilities';

import styles from './form.module.scss';

const FormItemInput: FC<FormItemInputProps & FormItemInputMiscProps> = (
    props
) => {
    const {
        status,
        wrapperCol,
        children,
        errors,
        warnings,
        extra,
        help,
        marginBottom,
        onErrorVisibleChanged,
    } = props;
    const formContext = useContext(FormContext);

    const mergedWrapperCol: ColProps =
        wrapperCol || formContext.wrapperCol || {};

    const classNames: string = mergeClasses([
        styles.formItemControl,
        mergedWrapperCol.classNames,
    ]);

    // Pass to sub FormItem should not with col info
    const subFormContext = useMemo(() => ({ ...formContext }), [formContext]);
    delete subFormContext.labelCol;
    delete subFormContext.wrapperCol;

    const inputDom = (
        <div className={styles.formItemControlInput}>
            <div className={styles.formItemControlInputContent}>{children}</div>
        </div>
    );
    const formItemContext = useMemo(() => ({ status }), [status]);
    const errorListDom =
        marginBottom !== null || errors.length || warnings.length ? (
            <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <FormItemStatusContext.Provider value={formItemContext}>
                    <ErrorList
                        errors={errors}
                        warnings={warnings}
                        help={help}
                        helpStatus={status}
                        classNames={styles.formItemExplainConnected}
                        onVisibleChanged={onErrorVisibleChanged}
                    />
                </FormItemStatusContext.Provider>
                {!!marginBottom && (
                    <div style={{ width: 0, height: marginBottom }} />
                )}
            </div>
        ) : null;

    const extraDom: JSX.Element = extra ? (
        <div className={styles.formItemExtra}>{extra}</div>
    ) : null;

    return (
        <FormContext.Provider value={subFormContext}>
            <Col {...mergedWrapperCol} classNames={classNames}>
                {inputDom}
                {errorListDom}
                {extraDom}
            </Col>
        </FormContext.Provider>
    );
};

export default FormItemInput;
