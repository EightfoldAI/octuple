import React from 'react';
import type { FormContextProps } from './Context';
import { FormContext } from './Context';
import {
  FormItemLabelProps,
  LabelTooltipType,
  WrapperTooltipProps,
} from './Form.types';
import type { FormLabelAlign } from './Form.types';
import { Col } from '../Grid';
import type { ColProps } from '../Grid';
import { Icon, IconName, IconSize } from '../Icon';
import { useLocaleReceiver } from '../LocaleProvider/LocaleReceiver';
import defaultLocale from '../Locale/Default';
import { Tooltip } from '../Tooltip';
import { mergeClasses } from '../../shared/utilities';

import styles from './form.module.scss';

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

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean }> = ({
  colon,
  htmlFor,
  itemRef,
  label,
  labelAlign,
  labelCol,
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
        const mergedLabelCol: ColProps = labelCol || contextLabelCol || {};
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
          colon === true || (contextColon !== false && colon !== false);
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
            <Tooltip portal portalRoot={itemRef?.current} {...restTooltipProps}>
              {React.cloneElement(icon, {
                className: styles.formItemTooltip,
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
        const labelClassNames: string = mergeClasses({
          [styles.formItemNoColon]: !computedColon,
        });

        return (
          <Col {...mergedLabelCol} classNames={labelColClassNames}>
            <label
              htmlFor={htmlFor}
              className={labelClassNames}
              title={typeof label === 'string' ? label : ''}
            >
              {!requiredMark && !required && labelChildren}
              {(requiredMark === 'optional' || required) && (
                <span>
                  <span className={styles.inlineEnforce}>{labelChildren}</span>
                  <span
                    className={mergeClasses([
                      styles.formItemOptional,
                      {
                        [styles.formItemRequired]:
                          required && requiredMark !== false,
                      },
                      {
                        [styles.formHideRequiredMark]: requiredMark === false,
                      },
                      {
                        [styles.formItemRequiredMarkOptional]:
                          requiredMark === 'optional',
                      },
                    ])}
                    title=""
                  >
                    {requiredMark === 'optional' &&
                      !required &&
                      (formLocale?.optional || defaultLocale.Form?.optional)}
                  </span>
                </span>
              )}
            </label>
          </Col>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormItemLabel;
