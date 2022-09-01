import React, { useLayoutEffect, useMemo } from 'react';
import { ItemHolderProps } from '../Form.types';
import type { ValidateStatus } from '../Form.types';
import { mergeClasses, omit } from '../../../shared/utilities';
import { Row } from '../../Grid';
import FormItemLabel from '../FormItemLabel';
import FormItemInput from '../FormItemInput';
import type { FormItemStatusContextProps } from '../Context';
import {
    FormContext,
    FormItemInputContext,
    NoStyleItemContext,
} from '../Context';
import { Icon, IconName, IconSize } from '../../Icon';
import { Loader, LoaderSize } from '../../Loader';
import useDebounce from '../Hooks/useDebounce';

import styles from '../form.module.scss';

const iconMap = {
    success: (
        <Icon
            color={'var(--success-color)'}
            path={IconName.mdiCheckCircle}
            size={IconSize.Small}
        />
    ),
    warning: (
        <Icon
            color={'var(--warning-color)'}
            path={IconName.mdiAlertCircle}
            size={IconSize.Small}
        />
    ),
    error: (
        <Icon
            color={'var(--error-color)'}
            path={IconName.mdiCloseCircle}
            size={IconSize.Small}
        />
    ),
    validating: (
        <Loader color={'var(--primary-color)'} size={LoaderSize.Small} />
    ),
};

export default function ItemHolder(props: ItemHolderProps) {
    const {
        classNames,
        style,
        help,
        errors,
        warnings,
        validateStatus,
        meta,
        hasFeedback,
        hidden,
        children,
        fieldId,
        isRequired,
        onSubItemMetaChange,
        ...rest
    } = props;
    const { requiredMark } = React.useContext(FormContext);
    const itemRef = React.useRef<HTMLDivElement>(null);
    const debounceErrors = useDebounce(errors);
    const debounceWarnings = useDebounce(warnings);
    const hasHelp = help !== undefined && help !== null;
    const hasError = hasHelp || errors.length || warnings.length;
    const [marginBottom, setMarginBottom] = React.useState<number | null>(null);

    useLayoutEffect(() => {
        if (hasError && itemRef.current) {
            const itemStyle = getComputedStyle(itemRef.current);
            setMarginBottom(parseInt(itemStyle.marginBottom, 10));
        }
    }, [hasError]);

    const onErrorVisibleChanged = (nextVisible: boolean) => {
        if (!nextVisible) {
            setMarginBottom(null);
        }
    };

    let mergedValidateStatus: ValidateStatus = '';
    if (validateStatus !== undefined) {
        mergedValidateStatus = validateStatus;
    } else if (meta.validating) {
        mergedValidateStatus = 'validating';
    } else if (debounceErrors.length) {
        mergedValidateStatus = 'error';
    } else if (debounceWarnings.length) {
        mergedValidateStatus = 'warning';
    } else if (meta.touched) {
        mergedValidateStatus = 'success';
    }

    const formItemStatusContext = useMemo<FormItemStatusContextProps>(() => {
        let feedbackIcon: React.ReactNode;
        const IconNode = (): JSX.Element =>
            mergedValidateStatus && iconMap[mergedValidateStatus];
        if (hasFeedback) {
            feedbackIcon = IconNode ? (
                <span
                    className={mergeClasses([
                        styles.formItemFeedbackIcon,
                        (styles as any)[
                            `form-item-feedback-icon-${mergedValidateStatus}`
                        ],
                    ])}
                >
                    <IconNode />
                </span>
            ) : null;
        }

        return {
            status: mergedValidateStatus,
            hasFeedback,
            feedbackIcon,
            isFormItemInput: true,
        };
    }, [mergedValidateStatus, hasFeedback]);

    const itemClassNames: string = mergeClasses([
        styles.formItem,
        {
            [styles.formItemWithHelp]:
                hasHelp || debounceErrors.length || debounceWarnings.length,
        },
        classNames,
        {
            [styles.formItemHasFeedback]: mergedValidateStatus && hasFeedback,
            [styles.formItemHasSuccess]: mergedValidateStatus === 'success',
            [styles.formItemHasWarning]: mergedValidateStatus === 'warning',
            [styles.formItemHasError]: mergedValidateStatus === 'error',
            [styles.formItemIsValidating]:
                mergedValidateStatus === 'validating',
            [styles.formItemHidden]: hidden,
        },
    ]);

    return (
        <div className={itemClassNames} style={style} ref={itemRef}>
            <Row
                classNames={styles.formItemRow}
                {...omit(rest, [
                    'colon' as any,
                    'dependencies',
                    'extra',
                    'fieldKey',
                    'getValueFromEvent',
                    'getValueProps',
                    'htmlFor',
                    'initialValue',
                    'isListField',
                    'label',
                    'labelAlign',
                    'labelCol',
                    'labelWrap',
                    'messageVariables',
                    'name',
                    'normalize',
                    'noStyle',
                    'preserve',
                    'required',
                    'requiredMark',
                    'rules',
                    'shouldUpdate',
                    'trigger',
                    'tooltip',
                    'validateFirst',
                    'validateTrigger',
                    'valuePropName',
                    'wrapperCol',
                ])}
            >
                <FormItemLabel
                    htmlFor={fieldId}
                    required={isRequired}
                    requiredMark={requiredMark}
                    {...props}
                />
                <FormItemInput
                    {...props}
                    {...meta}
                    errors={debounceErrors}
                    warnings={debounceWarnings}
                    status={mergedValidateStatus}
                    help={help}
                    marginBottom={marginBottom}
                    onErrorVisibleChanged={onErrorVisibleChanged}
                >
                    <NoStyleItemContext.Provider value={onSubItemMetaChange}>
                        <FormItemInputContext.Provider
                            value={formItemStatusContext}
                        >
                            {children}
                        </FormItemInputContext.Provider>
                    </NoStyleItemContext.Provider>
                </FormItemInput>
            </Row>
            {!!marginBottom && (
                <div
                    className={styles.formItemMarginOffset}
                    style={{
                        marginBottom: -marginBottom,
                    }}
                />
            )}
        </div>
    );
}
