import React from 'react';
import { mergeClasses } from '../../shared/utilities';
import type { ColProps } from '../Grid';
import { Col } from '../Grid';
import { useLocaleReceiver } from '../LocaleProvider/LocaleReceiver';
import defaultLocale from '../Locale/Default';
import type { TooltipProps } from '../tooltip';
import { Tooltip } from '../Tooltip';
import type { FormContextProps } from './Context';
import { FormContext } from './Context';
import type { RequiredMark } from './Form';
import type { FormLabelAlign } from './Form.types';
import { Icon, IconName, IconSize } from '../Icon';

import styles from './form.module.scss';

export type WrapperTooltipProps = TooltipProps & {
    icon?: React.ReactElement;
};

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode;

function toTooltipProps(tooltip: LabelTooltipType): WrapperTooltipProps | null {
    if (!tooltip) {
        return null;
    }

    if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
        return tooltip as WrapperTooltipProps;
    }

    return {
        content: tooltip,
        portal: true,
    };
}

export interface FormItemLabelProps {
    colon?: boolean;
    htmlFor?: string;
    label?: React.ReactNode;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    requiredMark?: RequiredMark;
    tooltip?: LabelTooltipType;
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean }> = ({
    label,
    htmlFor,
    labelCol,
    labelAlign,
    colon,
    required,
    requiredMark,
    tooltip,
}) => {
    const [formLocale] = useLocaleReceiver('Form');

    if (!label) return null;

    return (
        <FormContext.Consumer key="label">
            {({
                vertical,
                labelAlign: contextLabelAlign,
                labelCol: contextLabelCol,
                labelWrap,
                colon: contextColon,
            }: FormContextProps) => {
                const mergedLabelCol: ColProps =
                    labelCol || contextLabelCol || {};
                const mergedLabelAlign: FormLabelAlign | undefined =
                    labelAlign || contextLabelAlign;
                const labelColClassNames: string = mergeClasses(
                    styles.formItemLabel,
                    { [styles.formItemLabelLeft]: mergedLabelAlign === 'left' },
                    mergedLabelCol.classNames,
                    {
                        [styles.formItemLabelWrap]: !!labelWrap,
                    }
                );

                let labelChildren = label;
                // Keep label is original where there should have no colon
                const computedColon =
                    colon === true ||
                    (contextColon !== false && colon !== false);
                const haveColon = computedColon && !vertical;

                // Remove duplicated user input colon
                if (
                    haveColon &&
                    typeof label === 'string' &&
                    (label as string).trim() !== ''
                ) {
                    labelChildren = (label as string).replace(/[:|：]\s*$/, '');
                }

                // Tooltip
                const tooltipProps = toTooltipProps(tooltip);
                if (tooltipProps) {
                    const {
                        icon = (
                            <Icon
                                color={'var(--primary-color)'}
                                path={IconName.mdiHelpCircle}
                                size={IconSize.Small}
                            />
                        ),
                        ...restTooltipProps
                    } = tooltipProps;
                    const tooltipNode = (
                        <Tooltip {...restTooltipProps}>
                            {React.cloneElement(icon, {
                                className: `form-item-tooltip`,
                                title: '',
                            })}
                        </Tooltip>
                    );

                    labelChildren = (
                        <>
                            {labelChildren}
                            {tooltipNode}
                        </>
                    );
                }

                // Add required mark if optional
                if (requiredMark === 'optional' && !required) {
                    labelChildren = (
                        <>
                            {labelChildren}
                            <span className={styles.formItemOptional} title="">
                                {formLocale?.optional ||
                                    defaultLocale.Form?.optional}
                            </span>
                        </>
                    );
                }

                const labelClassNames: string = mergeClasses({
                    [styles.formItemRequired]:
                        required && requiredMark !== false,
                    [styles.formItemRequiredMarkOptional]:
                        requiredMark === 'optional',
                    [styles.formItemNoColon]: !computedColon,
                });

                return (
                    <Col {...mergedLabelCol} classNames={labelColClassNames}>
                        <label
                            htmlFor={htmlFor}
                            className={labelClassNames}
                            title={typeof label === 'string' ? label : ''}
                        >
                            {labelChildren}
                        </label>
                    </Col>
                );
            }}
        </FormContext.Consumer>
    );
};

export default FormItemLabel;
