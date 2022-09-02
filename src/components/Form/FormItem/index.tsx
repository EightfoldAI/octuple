import React, { useContext, useMemo } from 'react';
import { OcField, OcFieldContext, OcListContext } from '../Internal';
import { OcMeta, OcNamePath } from '../Internal/OcForm.types';
import useFormItemStatus from '../Hooks/useFormItemStatus';
import { FormContext, NoStyleItemContext } from '../Context';
import useFrameState from '../Hooks/useFrameState';
import useItemRef from '../Hooks/useItemRef';
import { useSafeState } from '../../../hooks/useState';
import { getFieldId, toArray } from '../util';
import {
    FieldError,
    FormItemProps,
    MemoInputProps,
    RenderChildren,
} from '../Form.types';
import ItemHolder from './ItemHolder';
import {
    cloneElement,
    isValidElement,
    warning,
} from '../../../shared/utilities';

// Separates the mergedNameKey of the form list item
// e.g. name: ['user', 1] + key: [4] = ['user', 4] becomes `user__SPLIT__4`
const NAME_SPLIT = '__SPLIT__';

const MemoInput = React.memo(
    ({ children }: MemoInputProps) => children as JSX.Element,
    (prev, next) => prev.value === next.value && prev.update === next.update
);

function hasValidName(name?: OcNamePath): Boolean {
    if (name === null) {
        warning(false, 'Form.Item: `name` property is `null`');
    }
    return !(name === undefined || name === null);
}

function genEmptyMeta(): OcMeta {
    return {
        errors: [],
        warnings: [],
        touched: false,
        validating: false,
        name: [],
    };
}

function InternalFormItem<Values = any>(
    props: FormItemProps<Values>
): React.ReactElement {
    const {
        name,
        noStyle,
        dependencies,
        shouldUpdate,
        rules,
        children,
        required,
        label,
        messageVariables,
        trigger = 'onChange',
        validateTrigger,
        hidden,
    } = props;
    const { name: formName } = useContext(FormContext);
    const isRenderProps = typeof children === 'function';
    const notifyParentMetaChange = useContext(NoStyleItemContext);

    const { validateTrigger: contextValidateTrigger } =
        useContext(OcFieldContext);
    const mergedValidateTrigger =
        validateTrigger !== undefined
            ? validateTrigger
            : contextValidateTrigger;

    const hasName = hasValidName(name);

    // Get `noStyle` required info
    const listContext = React.useContext(OcListContext);
    const fieldKeyPathRef = React.useRef<React.Key[]>();
    const [subFieldErrors, setSubFieldErrors] = useFrameState<
        Record<string, FieldError>
    >({});
    const [meta, setMeta] = useSafeState<OcMeta>(() => genEmptyMeta());

    const onMetaChange = (nextMeta: OcMeta & { destroy?: boolean }) => {
        const keyInfo = listContext?.getKey(nextMeta.name);

        setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);

        // Bump to parent since noStyle
        if (noStyle && notifyParentMetaChange) {
            let namePath = nextMeta.name;

            if (!nextMeta.destroy) {
                if (keyInfo !== undefined) {
                    const [fieldKey, restPath] = keyInfo;
                    namePath = [fieldKey, ...restPath];
                    fieldKeyPathRef.current = namePath;
                }
            } else {
                // Use origin cache data
                namePath = fieldKeyPathRef.current || namePath;
            }
            notifyParentMetaChange(nextMeta, namePath);
        }
    };

    // Collect noStyle Field error to the top FormItem
    const onSubItemMetaChange = (
        subMeta: OcMeta & { destroy: boolean },
        uniqueKeys: React.Key[]
    ) => {
        // Only `noStyle` sub item will trigger
        setSubFieldErrors((prevSubFieldErrors) => {
            const clone = {
                ...prevSubFieldErrors,
            };

            // name: ['user', 1] + key: [4] = ['user', 4]
            const mergedNamePath = [
                ...subMeta.name.slice(0, -1),
                ...uniqueKeys,
            ];
            const mergedNameKey = mergedNamePath.join(NAME_SPLIT);

            if (subMeta.destroy) {
                // Remove
                delete clone[mergedNameKey];
            } else {
                // Update
                clone[mergedNameKey] = subMeta;
            }

            return clone;
        });
    };

    const [mergedErrors, mergedWarnings] = useMemo(() => {
        const errorList: string[] = [...meta.errors];
        const warningList: string[] = [...meta.warnings];

        Object.values(subFieldErrors).forEach((subFieldError) => {
            errorList.push(...(subFieldError.errors || []));
            warningList.push(...(subFieldError.warnings || []));
        });

        return [errorList, warningList];
    }, [subFieldErrors, meta.errors, meta.warnings]);

    const getItemRef = useItemRef();

    function renderLayout(
        baseChildren: React.ReactNode,
        fieldId?: string,
        isRequired?: boolean
    ): React.ReactNode {
        if (noStyle && !hidden) {
            return baseChildren;
        }

        return (
            <ItemHolder
                key="row"
                {...props}
                fieldId={fieldId}
                isRequired={isRequired}
                errors={mergedErrors}
                warnings={mergedWarnings}
                meta={meta}
                onSubItemMetaChange={onSubItemMetaChange}
            >
                {baseChildren}
            </ItemHolder>
        );
    }

    if (!hasName && !isRenderProps && !dependencies) {
        return renderLayout(children) as JSX.Element;
    }

    let variables: Record<string, string> = {};
    if (typeof label === 'string') {
        variables.label = label;
    } else if (name) {
        variables.label = String(name);
    }
    if (messageVariables) {
        variables = { ...variables, ...messageVariables };
    }

    return (
        <OcField
            {...props}
            messageVariables={variables}
            trigger={trigger}
            validateTrigger={mergedValidateTrigger}
            onMetaChange={onMetaChange}
        >
            {(control, renderMeta, context) => {
                const mergedName =
                    toArray(name).length && renderMeta ? renderMeta.name : [];
                const fieldId = getFieldId(mergedName, formName);

                const isRequired =
                    required !== undefined
                        ? required
                        : !!(
                              rules &&
                              rules.some((rule) => {
                                  if (
                                      rule &&
                                      typeof rule === 'object' &&
                                      rule.required &&
                                      !rule.warningOnly
                                  ) {
                                      return true;
                                  }
                                  if (typeof rule === 'function') {
                                      const ruleEntity = rule(context);
                                      return (
                                          ruleEntity &&
                                          ruleEntity.required &&
                                          !ruleEntity.warningOnly
                                      );
                                  }
                                  return false;
                              })
                          );

                const mergedControl: typeof control = {
                    ...control,
                };

                let childNode: React.ReactNode = null;

                warning(
                    !(shouldUpdate && dependencies),
                    "Form.Item `shouldUpdate` and `dependencies` shouldn't be used together."
                );
                if (Array.isArray(children) && hasName) {
                    warning(
                        false,
                        'Form.Item `children` is array of render props cannot have `name`.'
                    );
                    childNode = children;
                } else if (
                    isRenderProps &&
                    (!(shouldUpdate || dependencies) || hasName)
                ) {
                    warning(
                        !!(shouldUpdate || dependencies),
                        'Form.Item `children` of render props only work with `shouldUpdate` or `dependencies`.'
                    );
                    warning(
                        !hasName,
                        "Form.Item Do not use `name` with `children` of render props since it's not a field."
                    );
                } else if (dependencies && !isRenderProps && !hasName) {
                    warning(
                        false,
                        'Form.Item Must set `name` or use render props when `dependencies` is set.'
                    );
                } else if (isValidElement(children)) {
                    warning(
                        children.props.defaultValue === undefined,
                        'Form.Item `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.'
                    );

                    const childProps = { ...children.props, ...mergedControl };
                    if (!childProps.id) {
                        childProps.id = fieldId;
                    }

                    childProps.ref = getItemRef(mergedName, children);

                    const triggers = new Set<string>([
                        ...toArray(trigger),
                        ...toArray(mergedValidateTrigger),
                    ]);

                    triggers.forEach((eventName) => {
                        childProps[eventName] = (...args: any[]) => {
                            mergedControl[eventName]?.(...args);
                            children.props[eventName]?.(...args);
                        };
                    });

                    childNode = (
                        <MemoInput
                            value={
                                mergedControl[props.valuePropName || 'value']
                            }
                            update={children}
                        >
                            {cloneElement(children, childProps)}
                        </MemoInput>
                    );
                } else if (
                    isRenderProps &&
                    (shouldUpdate || dependencies) &&
                    !hasName
                ) {
                    childNode = (children as RenderChildren)(context);
                } else {
                    warning(
                        !mergedName.length,
                        'Form.Item `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
                    );
                    childNode = children as React.ReactNode;
                }

                return renderLayout(childNode, fieldId, isRequired);
            }}
        </OcField>
    );
}

type InternalFormItemType = typeof InternalFormItem;

interface FormItemInterface extends InternalFormItemType {
    useStatus: typeof useFormItemStatus;
}

const FormItem = InternalFormItem as FormItemInterface;
FormItem.useStatus = useFormItemStatus;

export default FormItem;
